<script lang="ts">
    import { fade } from 'svelte/transition';
    import { goto } from '$app/navigation';
    import SearchBar from '$lib/components/all_clients/SearchBar.svelte';
    import Dialog from '../general_components/Dialog.svelte';
    import Toast from '../general_components/Toast.svelte';

    let mounted = $state(false);
    let searchTerm = $state('');
    let selectedCompany = $state('All Companies');
    let selectedStatus = $state('All');
    let showAcceptDialog = $state(false);
    let showDeclineDialog = $state(false);
    let selectedBooking = $state<any>(null);

    // Pagination variables
    let currentPage = $state(1);
    const itemsPerPage = 10;
    let totalPages = $state(1);
    let paginatedBookings = $state<any[]>([]);

    const statusOptions = ['All', 'Pending', 'Accepted', 'Declined'];

    let bookings = $state([
        {
            id: 2,
            jobId: 'JOB-2024-002',
            jobTitle: 'Math Teacher',
            jobType: 'Temporary',
            company: 'St. Mary High School',
            availableRoles: 3,
            appliedDate: '2024-01-20',
            status: 'Pending',
            user: {
                id: 2,
                name: 'Jane Smith',
                image: null
            }
        },
        {
            id: 3,
            jobId: 'JOB-2024-003',
            jobTitle: 'Science Teacher',
            jobType: 'Temporary',
            company: 'Cambridge Academy',
            availableRoles: 2,
            appliedDate: '2024-01-22',
            status: 'Pending',
            user: {
                id: 3,
                name: 'Mike Johnson',
                image: null
            }
        }
    ]);

    $effect(() => {
        mounted = true;
    });
    let companies = $derived(['All Companies', ...new Set(bookings.map(booking => booking.company))]);

    $effect(() => {
        const filtered = bookings
            .filter(booking => booking.jobType === 'Temporary')
            .filter(booking => {
                const matchesSearch = Object.values(booking).some(value =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                );
                const matchesCompany = selectedCompany === 'All Companies' || booking.company === selectedCompany;
                const matchesStatus = selectedStatus === 'All' || booking.status === selectedStatus;
                return matchesSearch && matchesCompany && matchesStatus;
            });

        totalPages = Math.ceil(filtered.length / itemsPerPage);
        currentPage = Math.min(currentPage, totalPages) || 1;
        
        paginatedBookings = filtered.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );
    });

    function goToPage(page: number) {
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
        }
    }

    function handleViewUser(userId: number) {
        goto(`/private/all_candidates/candidate_details/${userId}`);
    }

    function handleAccept(booking: any) {
        selectedBooking = booking;
        showAcceptDialog = true;
    }

    let showToast = $state(false);
    let toastMessage = $state('');
    let toastType = $state<'success' | 'error'>('success');

    function showSuccessToast(message: string) {
        toastMessage = message;
        toastType = 'success';
        showToast = true;
        setTimeout(() => showToast = false, 3000);
    }

    function confirmAccept() {
        if (selectedBooking) {
            selectedBooking.status = 'Accepted';
            console.log('Accept booking:', selectedBooking);
            showSuccessToast(`Successfully accepted ${selectedBooking.user.name}'s booking`);
        }
        showAcceptDialog = false;
        selectedBooking = null;
    }

    function handleDecline(booking: any) {
        selectedBooking = booking;
        showDeclineDialog = true;
    }

    function confirmDecline() {
        if (selectedBooking) {
            selectedBooking.status = 'Declined';
            console.log('Decline booking:', selectedBooking);
        }
        showDeclineDialog = false;
        selectedBooking = null;
    }
</script>

{#if showAcceptDialog && selectedBooking}
    <Dialog
        show={showAcceptDialog && selectedBooking}
        title="Confirm Acceptance"
        onClose={() => showAcceptDialog = false}
    >
        <p class="text-gray-600">
            Are you sure you want to accept {selectedBooking?.user.name} for the {selectedBooking?.jobTitle} role at {selectedBooking?.company}?
        </p>
        
        <svelte:fragment slot="actions">
            <button
                class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                onclick={() => showAcceptDialog = false}
            >
                No
            </button>
            <button
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                onclick={confirmAccept}
            >
                Yes
            </button>
        </svelte:fragment>
    </Dialog>
{/if}

<Toast 
    show={showToast}
    message={toastMessage}
    type={toastType}
/>

{#if showDeclineDialog && selectedBooking}
    <Dialog
        show={showDeclineDialog && selectedBooking}
        title="Confirm Decline"
        onClose={() => showDeclineDialog = false}
    >
        <p class="text-gray-600">
            Are you sure you want to decline {selectedBooking?.user.name} for the {selectedBooking?.jobTitle} role at {selectedBooking?.company}?
        </p>
        
        <svelte:fragment slot="actions">
            <button
                class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                onclick={() => showDeclineDialog = false}
            >
                No
            </button>
            <button
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                onclick={confirmDecline}
            >
                Yes
            </button>
        </svelte:fragment>
    </Dialog>
{/if}

{#if mounted}
    <div class="pt-10 pr-10 pl-10">
        <main class="bg-white rounded-2xl shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] transition-all duration-300" in:fade={{ duration: 1000 }}>
            <section class="w-full overflow-hidden">
                <div class="w-full bg-white/25 p-6 flex items-center">
                    <h1 class="text-3xl font-semibold">Temporary Bookings</h1>
                    <div class="flex-grow"></div>
                    <div class="flex items-center gap-4">
                        <div class="flex items-center gap-2">
                            <label for="company-filter" class="text-sm font-medium text-gray-600">
                                School:
                            </label>
                            <select
                                id="company-filter"
                                bind:value={selectedCompany}
                                class="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                {#each companies as company}
                                    <option value={company}>{company}</option>
                                {/each}
                            </select>
                        </div>
                        <div class="flex items-center gap-2">
                            <label for="status-filter" class="text-sm font-medium text-gray-600">
                                Status:
                            </label>
                            <select
                                id="status-filter"
                                bind:value={selectedStatus}
                                class="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                {#each statusOptions as status}
                                    <option value={status}>{status}</option>
                                {/each}
                            </select>
                        </div>
                        <SearchBar bind:searchTerm />
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th class="text-left p-4 font-medium text-gray-600">User</th>
                                <th class="text-left p-4 font-medium text-gray-600">Company</th>
                                <th class="text-left p-4 font-medium text-gray-600">Job ID</th>
                                <th class="text-left p-4 font-medium text-gray-600">Job Title</th>
                                <th class="text-left p-4 font-medium text-gray-600">Job Type</th>
                                <th class="text-center p-4 font-medium text-gray-600">Available Roles</th>
                                <th class="text-left p-4 font-medium text-gray-600">Status</th>
                                <th class="text-left p-4 font-medium text-gray-600">Applied Date</th>
                                <th class="text-center p-4 font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {#each paginatedBookings as booking}
                                <tr class="border-b border-gray-100 hover:bg-gray-50/50">
                                    <td class="p-4">
                                        <div class="space-y-2">
                                            <div class="flex items-center gap-3">
                                                <div class="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                                                    {#if booking.user.image}
                                                        <img src={booking.user.image} alt={booking.user.name} class="w-full h-full object-cover">
                                                    {:else}
                                                        <span class="material-icons-sharp text-gray-400 w-full h-full flex items-center justify-center">person</span>
                                                    {/if}
                                                </div>
                                                <span class="font-medium">{booking.user.name}</span>
                                            </div>
                                            <div class="pl-13">
                                                <button
                                                    class="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                                                    onclick={() => handleViewUser(booking.user.id)}
                                                >
                                                    View Profile
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="p-4">
                                        <span class="font-medium text-gray-700">{booking.company}</span>
                                    </td>
                                    <td class="p-4">
                                        <span class="font-mono text-sm">{booking.jobId}</span>
                                    </td>
                                    <td class="p-4">{booking.jobTitle}</td>
                                    <td class="p-4">
                                        <span class="px-2 py-1 bg-gray-100 rounded-full text-sm">
                                            {booking.jobType}
                                        </span>
                                    </td>
                                    <td class="p-4 text-center">
                                        <span class="font-medium">{booking.availableRoles}</span>
                                    </td>
                                    <td class="p-4">
                                        <span class={`px-2 py-1 rounded-full text-sm ${
                                            booking.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                                            booking.status === 'Declined' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td class="p-4">
                                        {new Date(booking.appliedDate).toLocaleDateString()}
                                    </td>
                                    <td class="p-4">
                                        <div class="flex items-center justify-center gap-3">
                                            {#if booking.status === 'Pending'}
                                                <button
                                                    class="w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
                                                    onclick={() => handleAccept(booking)}
                                                    title="Accept"
                                                >
                                                    <span class="material-icons-sharp text-sm">check</span>
                                                </button>
                                                <button
                                                    class="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                                                    onclick={() => handleDecline(booking)}
                                                    title="Decline"
                                                >
                                                    <span class="material-icons-sharp text-sm">close</span>
                                                </button>
                                            {:else}
                                                <span class="text-sm text-gray-500">
                                                    {booking.status}
                                                </span>
                                            {/if}
                                        </div>
                                    </td>
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>

                <!-- Pagination Controls -->
                {#if totalPages > 1}
                    <div class="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                        <div class="text-sm text-gray-600">
                            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, paginatedBookings.length)} of {paginatedBookings.length} entries
                        </div>
                        <div class="flex items-center gap-2">
                            <button
                                class="px-3 py-1 rounded-lg border {currentPage === 1 ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'}"
                                onclick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            
                            {#each Array(totalPages) as _, i}
                                {#if i + 1 === 1 || i + 1 === totalPages || (i + 1 >= currentPage - 1 && i + 1 <= currentPage + 1)}
                                    <button
                                        class="w-8 h-8 rounded-lg flex items-center justify-center {
                                            currentPage === i + 1
                                                ? 'bg-blue-500 text-white'
                                                : 'hover:bg-gray-50'
                                        }"
                                        onclick={() => goToPage(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                {:else if i + 1 === currentPage - 2 || i + 1 === currentPage + 2}
                                    <span class="px-1">...</span>
                                {/if}
                            {/each}
                            
                            <button
                                class="px-3 py-1 rounded-lg border {currentPage === totalPages ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'}"
                                onclick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                {/if}
            </section>
        </main>
    </div>
{/if}