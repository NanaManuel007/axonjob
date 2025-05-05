<script lang="ts">
    import type { Candidate } from '$lib/stores/allUsersStore/canditates';
    import SearchBar from '$lib/components/all_clients/SearchBar.svelte';
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { AllCandidatesStore } from '$houdini';
    import { authStore } from '$lib/stores/authStore/authStore';
    
    // Initialize the Houdini store
    const store = new AllCandidatesStore();
    
    // Convert reactive variables to use $state
    let mounted = $state(false);
    let searchTerm = $state('');
    let currentPage = $state(1);
    const itemsPerPage = 10;
    let totalPages = $state(1);
    let paginatedCandidates = $state<Candidate[]>([]);

    // Fetch candidates on mount
    onMount(async () => {
        await store.fetch();
        mounted = true;
    });

    // Replace reactive statement with $effect
    $effect(() => {
        if (!$store.data?.candidates?.items) return;
        
        // Map GraphQL data to our expected format
        const candidatesData = $store.data.candidates.items.map(item => ({
            id: item.id,
            name: item.name || 'Unknown',
            email: item.email || 'No email',
            location: item.assignments?.[0]?.job?.location || 'N/A',
            joinedDate: item.createdAt || '', // 
            phoneNumber: item.phone || 'N/A',
            userVerified: item.verified || false,
            adminVerified: item.verified || false, 
            image: '' 
        }));
        
        // Filter candidates based on search term
        const filtered = candidatesData.filter(candidate =>
            Object.values(candidate).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

        totalPages = Math.ceil(filtered.length / itemsPerPage);
        currentPage = Math.min(currentPage, totalPages) || 1;
        
        paginatedCandidates = filtered.map(candidate => ({
            ...candidate,
            joinedDate: candidate.joinedDate.toString()
        })).slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );
    });

    function goToPage(page: number) {
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
        }
    }

    let hasPermission = $state(false);
    $effect(() => {
    hasPermission = $authStore.user?.permissions?.includes('ReadPermissions') || false;
});
</script>

{#if mounted}
<div class="pt-10 pr-10 pl-10">
    <main class="bg-white rounded-2xl shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] transition-all duration-300" in:fade={{ duration: 1000 }}>
        <section class="w-full overflow-hidden">
            <div class="w-full bg-white/25 p-6 flex items-center">
                <h1 class="text-5xl font-semibold">Candidates</h1>
                <div class="flex-grow"></div>
                <div class="flex items-center gap-4">
                    <SearchBar bind:searchTerm />
                </div>
            </div>

            {#if $store.fetching}
                <div class="p-6 text-center">Loading candidates...</div>
            {:else if $store.errors}
                <div class="p-6 text-center text-red-500">Error loading candidates: {$store.errors[0]?.message || 'Unknown error'}</div>
            {:else}
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th class="text-left p-4 font-medium text-gray-600">Candidate</th>
                                <th class="text-left p-4 font-medium text-gray-600">Email</th>
                                <th class="text-left p-4 font-medium text-gray-600">Location</th>
                                <th class="text-left p-4 font-medium text-gray-600">Joined Date</th>
                                <th class="text-left p-4 font-medium text-gray-600">Phone Number</th>
                                <th class="text-center p-4 font-medium text-gray-600">User Verified</th>
                                <th class="text-center p-4 font-medium text-gray-600">Admin Verified</th>
                         
                            </tr>
                        </thead>
                        <tbody>
                            {#each paginatedCandidates as candidate}
                                <tr class="border-b border-gray-100 hover:bg-gray-50/50">
                                    <td class="p-4">
                                        <div class="flex items-center gap-3">
                                            <div class="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                                                {#if candidate.image}
                                                    <img src={candidate.image} alt={candidate.name} class="w-full h-full object-cover">
                                                {:else}
                                                    <span class="material-icons-sharp text-gray-400 w-full h-full flex items-center justify-center">person</span>
                                                {/if}
                                            </div>
                                            <span class="font-medium">{candidate.name}</span>
                                        </div>
                                    </td>
                                    <td class="p-4">{candidate.email}</td>
                                    <td class="p-4">{candidate.location}</td>
                                    <td class="p-4">{new Date(candidate.joinedDate).toLocaleDateString()}</td>
                                    <td class="p-4">{candidate.phoneNumber}</td>
                                    <td class="p-4 text-center">
                                        <span class="inline-block px-2 py-1 rounded-full text-xs font-medium {candidate.userVerified ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}">
                                            {candidate.userVerified ? 'Verified' : 'Pending'}
                                        </span>
                                    </td>
                                    <td class="p-4 text-center">
                                        <span class="inline-block px-2 py-1 rounded-full text-xs font-medium {candidate.adminVerified ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}">
                                            {candidate.adminVerified ? 'Verified' : 'Pending'}
                                        </span>
                                    </td>
                
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>

                <!-- {#if totalPages > 1} -->
                    <div class="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                        <div class="text-sm text-gray-600">
                            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, paginatedCandidates.length)} of {$store.data?.candidates?.totalCount || 0} entries
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
                                                ? 'bg-gray-500 text-white'
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
                <!-- {/if} -->
            {/if}
        </section>
    </main>
</div>
{/if}