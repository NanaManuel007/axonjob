<script lang="ts">
	import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { AllJobsStore } from '$houdini';
    import { authStore } from "$lib/stores/authStore/authStore";
    import defaultLogo from '$lib/assets/images/icon.png';
    
    // Initialize the GraphQL store
    const jobsStore = new AllJobsStore();
    let clients: any[] = [];
    let loading = true;
    
    function handleViewMore() {
        goto('/private/all_clients');
    }
    
    function handleViewClient(clientId: string) {
        goto(`/private/all_clients/clients_details/${clientId}`);
    }
    
    // Format time difference
    function getTimeAgo(dateString: string) {
        if (!dateString) return "Recently";
        
        const now = new Date();
        const date = new Date(dateString);
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        
        if (diffMins < 60) {
            return `${diffMins} Min Ago`;
        } else {
            const diffHours = Math.floor(diffMins / 60);
            if (diffHours < 24) {
                return `${diffHours} Hours Ago`;
            } else {
                const diffDays = Math.floor(diffHours / 24);
                return `${diffDays} Days Ago`;
            }
        }
    }
    
    async function loadClients() {
        try {
            const result = await jobsStore.fetch();
            
            if (result.data?.jobs?.items) {
                // Extract unique clients from jobs
                const uniqueClients = new Map();
                
                result.data.jobs.items.forEach(job => {
                    if (job.client && job.client.id && !uniqueClients.has(job.client.id)) {
                        uniqueClients.set(job.client.id, {
                            id: job.client.id,
                            name: job.client.companyName || 'Unknown Company',
                            image: job.client.companyLogo || defaultLogo,
                            joinedAt: job.client.dateJoined || job.client.createdAt,
                            jobTitle: job.client.jobTitle || 'Company',
                            location: job.client.companyLocation || 'Unknown Location',
                            verificationStatus: job.client.verificationStatus
                        });
                    }
                });
                
                // Convert map to array and sort by joined date (newest first)
                clients = Array.from(uniqueClients.values())
                    .sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime());
            }
        } catch (error) {
            console.error('Error fetching clients:', error);
        } finally {
            loading = false;
        }
    }
    
    onMount(() => {
        loadClients();
    });
</script>

<div class="">
    <div class="flex justify-end gap-8">

        <div class="flex gap-8 text-right">
            <div class="info">
                <p>Hey, <b>{$authStore.user?.role || 'Guest'}</b></p>
                <small class="text-muted">{$authStore.user?.email || 'Not logged in'}</small>
            </div>
            <div class="w-11 h-11 rounded-full overflow-hidden">
                <img src={defaultLogo} alt="User">
            </div>
        </div>
    </div>

    <div class="mt-8">
        <div class="flex items-center justify-between mb-2">
            <h2>Recent Clients</h2>
            <span class="material-icons-sharp p-2 shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] bg-white rounded-full">
                business
            </span>
        </div>
        
        {#if loading}
            <div class="flex justify-center py-8">
                <span class="material-icons animate-spin">refresh</span>
            </div>
        {:else if clients.length === 0}
            <div class="text-center py-8 text-gray-500">
                No clients found
            </div>
        {:else}
            {#each clients.slice(0, 8) as client}
                <div class="bg-white flex items-center gap-4 mb-2 p-4 rounded-2xl shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] transition-all duration-300 ease-in-out hover:shadow-none">
                    <div class="w-14 h-12 rounded-full bg-gray-100 overflow-hidden">
                        {#if client.image}
                            <img src={client.image} alt={client.name} class="w-full h-full object-cover">
                        {:else}
                            <span class="material-icons-sharp text-gray-400 w-full h-full flex items-center justify-center">business</span>
                        {/if}
                    </div>
                    <div class="flex justify-between items-center w-full">
                        <div class="info flex flex-row gap-3">
                            <div class="">
                                <h3 class="font-medium text-gray-900">{client.name}</h3>
                                <small class="text-gray-500">
                                    {getTimeAgo(client.joinedAt)}
                                </small>
                            </div>
                            <div class="mt-1">
                                <p class="text-sm text-gray-700">{client.jobTitle}</p>
                                <p class="text-xs text-gray-500">{client.location}</p>
                            </div>
                        </div>

                        <button 
                            on:click={() => handleViewClient(client.id)}
                            class="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md text-sm transition-colors"
                        >
                            View
                        </button>
                    </div>
                </div>
            {/each}
        {/if}
        
        <button 
            type="button"
            on:click={handleViewMore}
            on:keydown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleViewMore();
                }
            }}
            class="flex items-center justify-center p-[1rem] mt-[1rem] border-2 border-dashed border-gray-500 text-gray-500 bg-white cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-500 hover:text-white rounded-2xl w-full"
        >
            <div class="flex flex-row gap-5">
                <span class="material-icons">
                    visibility
                </span>
                <h3>View All Clients</h3>
            </div>
        </button>
    </div>
</div>