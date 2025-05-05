<script lang="ts">
    import { fly } from 'svelte/transition';
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';
    import CircularProgress from './CircularProgress.svelte';
    import { customers } from '$lib/stores/allClientsStore/customers';
    import { onMount } from 'svelte';
    import AddNewClient from '../all_clients/AddNewClient.svelte';
    import { VerifyClientStore } from '$houdini';
    
    const verifyClientStore = new VerifyClientStore();
    let isUpdatingStatus = $state(false);
    let showEditModal = $state(false);
    const { clientId } = $props<{ clientId: number }>();
    const client = $derived($customers.find(c => c.id === clientId));
    import { authStore } from '$lib/stores/authStore/authStore';
    onMount(() => {
        customers.fetch();
    });

    const getStatusColor = (status: string) => {
        return status === 'verified' 
            ? 'bg-[#86e49d] text-[#006b21]' 
            : 'bg-[#d893a3] text-[#b30021]';
    };

    async function toggleVerificationStatus() {
        if (!client || isUpdatingStatus) return;
        
        try {
            isUpdatingStatus = true;
            const newStatus = client.verificationStatus.toLowerCase() === 'verified' ? 'PENDING' : 'VERIFIED';
            
            const result = await verifyClientStore.mutate({
                input: {
                    id: client.id,
                    status: newStatus
                }
            });

            if (result.data?.clientVStatus?.success) {
                // Refresh the clients list
                customers.fetch();
            } else {
                console.error('Failed to update status:', result.data?.clientVStatus?.message);
            }
        } catch (error) {
            console.error('Error updating status:', error);
        } finally {
            isUpdatingStatus = false;
        }
    }
    // Create tweened stores for each statistic value with longer duration
    const totalJobsPercentage = tweened(0, { duration: 2500, easing: cubicOut });
    const activeJobsPercentage = tweened(0, { duration: 2500, easing: cubicOut });
    const totalHiresPercentage = tweened(0, { duration: 2500, easing: cubicOut });
    
    // Initialize statistics with default values
    let statistics = $state([
        { label: 'Total Jobs', value: 0, percentage: 0, color: '#6366f1' },
        { label: 'Active Jobs', value: 0, percentage: 0, color: '#22c55e' },
        { label: 'Total Hires', value: 0, percentage: 0, color: '#3b82f6' }
    ]);
    
    // Update tweened values when client changes
    $effect(() => {
        if (client) {
            // Reset tweened values first
            totalJobsPercentage.set(0, { duration: 0 });
            activeJobsPercentage.set(0, { duration: 0 });
            totalHiresPercentage.set(0, { duration: 0 });
            
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                // Update the tweened values with animation
                totalJobsPercentage.set(Math.min(client.totalJobs * 3 || 0, 100));
                
                const activeJobsPercent = client.totalJobs ? 
                    Math.min((client.activeJobs / client.totalJobs) * 100 || 0, 100) : 0;
                activeJobsPercentage.set(activeJobsPercent);
                
                totalHiresPercentage.set(Math.min(client.totalHires * 2 || 0, 100));
            }, 100);
        }
    });
    
    // Update statistics when tweened values change
    $effect(() => {
        statistics = [
            { 
                label: 'Total Jobs', 
                value: client?.totalJobs || 0, 
                percentage: $totalJobsPercentage, 
                color: '#6366f1' 
            },
            { 
                label: 'Active Jobs', 
                value: client?.activeJobs || 0, 
                percentage: $activeJobsPercentage, 
                color: '#22c55e' 
            },
            { 
                label: 'Total Hires', 
                value: client?.totalHires || 0, 
                percentage: $totalHiresPercentage, 
                color: '#3b82f6' 
            }
        ];
    });
    let hasPermission = $state(false);

$effect(() => {
    hasPermission = $authStore.user?.permissions?.includes('ReadPermissions') || false;
});
</script>

{#if client}
    <div 
        class="bg-white shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] rounded-[15px] p-8"
        in:fly={{ x: 100, duration: 800, delay: 300 }}
    >
        <div class="flex items-center gap-6 mb-8">
            <div class="w-24 h-24 rounded-full overflow-hidden shadow-lg">
                <img 
                    src={client.companyImage} 
                    alt={client.companyName}
                    class="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                />
            </div>
            <div>
                <div class="flex items-center gap-2">
                    <h3 class="text-3xl font-bold text-gray-800 mb-2">{client.companyName}</h3>
                    <button
                        class="text-gray-500 hover:text-gray-700"
                        onclick={() => showEditModal = true}
                    >
                        <span class="material-icons-sharp text-xl">edit</span>
                    </button>
                </div>
                <p class="text-gray-600 flex items-center gap-2">
                    <span class="material-icons-sharp text-sm">location_on</span>
                    {client.companyLocation}
                </p>
            </div>
            <div class="ml-auto flex items-center gap-2">
                <span class="px-4 py-2 rounded-full {getStatusColor(client.verificationStatus)} font-medium">
                    {client.verificationStatus}
                </span>
                {#if hasPermission}
                <button
                    class="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
                    onclick={toggleVerificationStatus}
                    disabled={isUpdatingStatus}
                    title={client.verificationStatus.toLowerCase() === 'verified' ? 'Mark as Pending' : 'Verify Client'}
                >
                    <span class="material-icons-sharp text-gray-600">
                        {isUpdatingStatus ? 'sync' : client.verificationStatus.toLowerCase() === 'verified' ? 'cancel' : 'verified'}
                    </span>
                </button>
                {/if}
            </div>
        
        </div>

        <div class="grid grid-cols-2 gap-8">
            <!-- Company Information -->
            <div 
                class="space-y-6 p-6 bg-gray-50 rounded-xl"
                in:fly={{ x: 100, duration: 800, delay: 400 }}
            >
                <h4 class="text-xl font-semibold text-gray-800 mb-4">Company Information</h4>
                <div class="space-y-4">
                    <div class="flex items-center gap-3">
                        <span class="material-icons-sharp text-gray-600">business</span>
                        <div>
                            <p class="text-sm text-gray-500">Company Name</p>
                            <p class="text-gray-800 font-medium">{client.companyName}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="material-icons-sharp text-gray-600">calendar_today</span>
                        <div>
                            <p class="text-sm text-gray-500">Date Joined</p>
                            <p class="text-gray-800 font-medium">{client.dateJoined}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="material-icons-sharp text-gray-600">groups</span>
                        <div>
                            <p class="text-sm text-gray-500">Active Candidates</p>
                            <p class="text-gray-800 font-medium">{client.activeJobs}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Contact Information -->
            <div 
                class="space-y-6 p-6 bg-gray-50 rounded-xl"
                in:fly={{ x: 100, duration: 800, delay: 500 }}
            >
                <h4 class="text-xl font-semibold text-gray-800 mb-4">Contact Information</h4>
                <div class="space-y-4">
                    <div class="flex items-center gap-3">
                        <span class="material-icons-sharp text-gray-600">location_on</span>
                        <div>
                            <p class="text-sm text-gray-500">Location</p>
                            <p class="text-gray-800 font-medium">{client.companyLocation}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="material-icons-sharp text-gray-600">verified</span>
                        <div>
                            <p class="text-sm text-gray-500">Verification Status</p>
                            <p class="text-gray-800 font-medium capitalize">{client.verificationStatus}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Statistics -->
            <div 
                class="col-span-2 space-y-6 p-6 bg-gray-50 rounded-xl"
                in:fly={{ x: 100, duration: 800, delay: 600 }}
            >
                <h4 class="text-xl font-semibold text-gray-800 mb-4">Company Statistics</h4>
                <div class="grid grid-cols-3 gap-6">
                    {#each statistics as stat, i (i)}
                        <CircularProgress 
                            percentage={stat.percentage}
                            color={stat.color}
                            label={stat.label}
                            value={stat.value}
                        />
                    {/each}
                </div>
            </div>
        </div>
        {#if showEditModal}
            <AddNewClient
                showModal={showEditModal}
                existingClient={{
                    id: client.id,
                    companyName: client.companyName,
                    ceoFirstName: client.ceoFirstName,
                    ceoLastName: client.ceoLastName,
                    jobTitle: client.jobTitle,
                    companyEmail: client.companyEmail,
                    companyPhone: client.companyPhone,
                    companyAddress: client.companyAddress,
                    postalCode: client.postalCode,
                    registrationNumber: client.registrationNumber,
                    website: client.website,
                    companyLocation: client.companyLocation,
                    linkedIn: client.linkedIn
                }}
                on:close={() => showEditModal = false}
                on:clientUpdated={() => {
                    showEditModal = false;
                    customers.fetch();
                }}
            />
        {/if}
    </div>
{:else}
    <div class="flex justify-center items-center h-[400px]">
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-600"></div>
    </div>
{/if}