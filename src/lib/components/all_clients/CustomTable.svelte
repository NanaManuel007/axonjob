<script lang="ts">
    import { customers } from '$lib/stores/allClientsStore/customers';
    import type { Customer, CustomerStatus } from '$lib/stores/allClientsStore/allClients.type';
    import AddCompanyModal from './AddNewClient.svelte';
    import { createEventDispatcher } from 'svelte';
    import { goto } from '$app/navigation';
    import { GetClientsStore,DeleteClientStore } from '$houdini';
    import { onMount, } from 'svelte';
    import { authStore } from '$lib/stores/authStore/authStore';
    const { searchTerm = '' } = $props<{ searchTerm?: string }>();

    const dispatch = createEventDispatcher();
    const store = new GetClientsStore();
    let isLoading = $state(true);
    let showDeleteDialog = $state(false);
    let customerToDelete = $state<number | null>(null);
    let customerNameToDelete = $state<string>('');
        const deleteClientStore = new DeleteClientStore();
    onMount(async () => {
        try {
            await Promise.all([
                store.fetch(),
                customers.fetch()
            ]);
            if ($store.data) {
                isLoading = false;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            isLoading = false;
        }
    });

    let currentPage = $state(1);
    const itemsPerPage = 10;
    let showExportMenu = $state(false);
    let showAddModal = $state(false);

    const filteredCustomers = $derived(
        searchTerm.trim() === ''
            ? $customers
            : $customers.filter(customer =>
                customer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (customer.companyLocation && customer.companyLocation.toLowerCase().includes(searchTerm.toLowerCase())) ||
                customer.id.toString().includes(searchTerm)
            )
    );

    let sortColumn: keyof Customer | null = null;
    let sortAscending = true;
    
    const totalPages = $derived(Math.ceil(filteredCustomers.length / itemsPerPage));
    const paginatedCustomers = $derived(
        filteredCustomers.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        )
    );

    $effect(() => {
        searchTerm;
        currentPage = 1;
    });

    function changePage(page: number) {
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
        }
    }
    
    function handleSort(column: keyof Customer) {
        if (sortColumn === column) {
            sortAscending = !sortAscending;
        } else {
            sortColumn = column;
            sortAscending = true;
        }
    }

    function handleAddNewClient() {
        showAddModal = !showAddModal;
    }

    async function handleClientCreated(event: { detail: any }) {
        try {
            isLoading = true;
            await Promise.all([
                store.fetch({ policy: 'NetworkOnly' }),
                customers.fetch()
            ]);
            showAddModal = false;
        } catch (error) {
            console.error('Error refreshing data:', error);
        } finally {
            isLoading = false;
        }
    }

    function toggleExportMenu() {
        showExportMenu = !showExportMenu;
    }

    const getStatusColor = (status: CustomerStatus) => {
        const colors = {
            verified: 'bg-[#86e49d] text-[#006b21]',
            unverified: 'bg-[#d893a3] text-[#b30021]'
        };
        return colors[status];
    };

    function handleDelete(customer: Customer) {
        customerToDelete = customer.id;
        customerNameToDelete = customer.companyName;
        showDeleteDialog = true;
    }
    async function confirmDelete() {
    if (!customerToDelete) return;
    
    try {
        showDeleteDialog = false;
        isLoading = true;
        const result = await deleteClientStore.mutate({
            input: { id: customerToDelete }
        });
        
        if (result.data?.deleteClient?.success) {
            await Promise.all([
                store.fetch({ policy: 'NetworkOnly' }),
                customers.fetch()
            ]);
           
            customerToDelete = null;
            customerNameToDelete = '';
        }
    } catch (error) {
        console.error('Error deleting client:', error);
    } finally {
        isLoading = false;
    }
}

    function handleEmail(id: number) {
        console.log('Email client:', id);
    }

    function handleEdit(customerId: number) {
        goto(`/private/all_clients/clients_details/${customerId}`);
    }

    let hasPermission = $state(false);
  $effect(() => {
    hasPermission = $authStore.user?.permissions?.includes('ReadPermissions') || false;
  });
</script>

<section class="w-[95%] max-h-[calc(89%-1.6rem)] bg-white/70 mx-auto my-3 rounded-lg overflow-auto">
    {#if isLoading}
        <div class="flex justify-center items-center h-[400px]">
            <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-600"></div>
        </div>
    {:else}
        <div class="p-4 flex justify-end gap-4">
            <button 
                on:click={handleAddNewClient}
                class="h-11 bg-gray-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-600 transition-all duration-300 hover:scale-105 shadow-md"
            >
                <span class="material-icons-sharp">add_circle</span>
                <span>New Client</span>
            </button>
        </div>

        <table class="w-full">
            <thead>
                <tr>
                    {#each ['id', 'Company Name', 'Location', 'Date Join', 'V. Status', 'Total Jobs', 'Actions'] as column}
                        <th 
                            class="sticky top-0 left-0 bg-[#d5d1defe] p-4 text-center cursor-pointer capitalize group"
                        >
                            {column}
                        </th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#if paginatedCustomers.length === 0}
                    <tr>
                        <td colspan="7" class="p-8 text-center text-gray-500">
                            {searchTerm ? 'No clients match your search criteria' : 'No clients available'}
                        </td>
                    </tr>
                {:else}
                    {#each paginatedCustomers as customer}
            
                        <tr class="even:bg-black/[0.03] hover:bg-white/40 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                            <td class="p-4 text-center">{customer.id}</td>
                            <!-- <td class="p-4 text-center">
                                <div class="flex items-center justify-left">
                                    <img src={customer.companyImage} alt={customer.companyName} class="w-9 h-9 rounded-full mr-2">
                                    {customer.companyName}
                                </div>
                            </td> -->
                            
                            <td class="p-4 text-center">
                                <div class="flex items-center justify-left">
                                    <img
                                    src={customer.logoBase64 
                                        ? `data:${customer.logoMimeType};base64,${customer.logoBase64}`
                                        : customer.companyImage}
                                    alt={customer.companyName}
                                    class="w-9 h-9 rounded-full mr-2"
                                />
                                    {customer.companyName}
                                </div>
                            </td>
                            <td class="p-4 text-center hidden md:table-cell">{customer.companyLocation}</td>
                            <td class="p-4 text-center hidden md:table-cell">{customer.dateJoined}</td>
                            <td class="p-4 text-center hidden md:table-cell">
                                <p class="py-1.5 px-4 rounded-full text-center inline-block {getStatusColor(customer.verificationStatus)}">
                                    {customer.verificationStatus.charAt(0).toUpperCase() + customer.verificationStatus.slice(1)}
                                </p>
                            </td>
                            <td class="p-4 text-center hidden md:table-cell"><strong>{customer.activeJobs}</strong></td>
                            <td class="p-4 text-center">
                                <div class="flex items-center justify-center gap-2">
                                    <button 
                                        on:click={() => handleEdit(customer.id)}
                                        class="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 hover:scale-110"
                                    >
                                        <span class="material-icons-sharp text-gray-500">edit</span>
                                    </button>
                                    <button 
                                        on:click={() => handleDelete(customer)}
                                        class="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 hover:scale-110"
                                    >
                                        <span class="material-icons-sharp text-gray-500">delete</span>
                                    </button>
                    
                                </div>
                            </td>
                        </tr>
                    {/each}
                {/if}
            </tbody>
        </table>

        <div class="flex flex-col sm:flex-row justify-between items-center p-4 bg-white/30">
            <p class="text-sm text-gray-700 mb-4 sm:mb-0">
                Showing {filteredCustomers.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} 
                to {Math.min(currentPage * itemsPerPage, filteredCustomers.length)} 
                of {filteredCustomers.length} entries
                {searchTerm && filteredCustomers.length !== $customers.length ? ` (filtered from ${$customers.length} total entries)` : ''}
            </p>
            <div class="flex items-center gap-2">
                <button 
                    class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
                           {currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-600 hover:text-white'}"
                    disabled={currentPage === 1}
                    on:click={() => changePage(currentPage - 1)}
                >
                    <span class="material-icons-sharp">chevron_left</span>
                </button>

                {#each Array(totalPages) as _, i}
                    {#if i + 1 === 1 || i + 1 === totalPages || (i + 1 >= currentPage - 1 && i + 1 <= currentPage + 1)}
                        <button 
                            class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
                                   {currentPage === i + 1 ? 'bg-gray-600 text-white' : 'hover:bg-gray-600 hover:text-white'}"
                            on:click={() => changePage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    {/if}
                {/each}

                <button 
                    class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200
                           {currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-600 hover:text-white'}"
                    disabled={currentPage === totalPages}
                    on:click={() => changePage(currentPage + 1)}
                >
                    <span class="material-icons-sharp">chevron_right</span>
                </button>
            </div>
        </div>
    {/if}

    {#if showAddModal}
        <AddCompanyModal 
            showModal={showAddModal}
            on:close={() => showAddModal = false}
            on:clientCreated={handleClientCreated}
        />
    {/if}

    {#if showDeleteDialog}
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h2 class="text-xl font-semibold mb-4">Delete Confirmation</h2>
                <p class="text-gray-600 mb-6">
                    Are you sure you want to delete <span class="font-semibold">{customerNameToDelete}</span>? This action cannot be undone.
                </p>
                <div class="flex justify-end gap-4">
                    <button
                        class="px-4 py-2 rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors"
                        on:click={() => {
                            showDeleteDialog = false;
                            customerToDelete = null;
                            customerNameToDelete = '';
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        class="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                        on:click={confirmDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    {/if}
</section>