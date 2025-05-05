<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    import { GetCandidatesStore, AssignJobsStore, DeleteAssignmentStore } from "$houdini";
    
    const { showDialog, jobTitle, jobId, currentCandidates = [] } = $props<{ 
        showDialog: boolean,
        clientId: number,
        jobTitle: string, 
        jobId: string,
        currentCandidates?: Array<{
            id: number;
            name: string;
            email: string;
            status: string;
            role?: string;
        }>
    }>();

    const dispatch = createEventDispatcher();
    
    // Initialize the candidates store
    const candidatesStore = new GetCandidatesStore();
    const assignJobStore = new AssignJobsStore();
    const deleteAssignmentStore = new DeleteAssignmentStore();
    let isLoadingCandidates = $state(false);
    let candidatesError = $state<string | null>(null);
    let isAssigning = $state(false);
    let isRemoving = $state(false);
    let removingCandidateId = $state<number | null>(null);
    let assigningCandidateId = $state<number | null>(null);
    
    // Fetch candidates when dialog opens
    $effect(() => {
        if (showDialog) {
            fetchCandidates();
        }
    });
    
    // Function to fetch candidates
    async function fetchCandidates() {
        try {
            isLoadingCandidates = true;
            candidatesError = null;
            await candidatesStore.fetch();
        } catch (err) {
            candidatesError = err instanceof Error ? err.message : "Failed to fetch candidates";
            console.error("Error fetching candidates:", err);
        } finally {
            isLoadingCandidates = false;
        }
    }
    
    // Get candidates data from the store
    const candidatesData = $derived(candidatesStore);
    const availableCandidates = $derived($candidatesData.data?.candidates?.items?.map(candidate => ({
        id: candidate.id,
        name: candidate.name,
        email: candidate.email,
        status: 'Available',
        role: candidate.skills?.join(', ') || 'Not specified',
        experience: candidate.experience,
        verified: candidate.verified,
        phone: candidate.phone
    })) || []);

    let searchQuery = $state('');
    let assignedSearchQuery = $state('');
    let localCurrentCandidates = $state<typeof currentCandidates>([]);

    // Convert reactive statements to $derived
    const filteredAssignedCandidates = $derived(localCurrentCandidates.filter((c:any) => 
        c.name.toLowerCase().includes(assignedSearchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(assignedSearchQuery.toLowerCase()) ||
        c.role?.toLowerCase().includes(assignedSearchQuery.toLowerCase())
    ));

    // Use $effect for side effects instead of $:
    $effect(() => {
        if (showDialog || currentCandidates.length > 0) {
            localCurrentCandidates = [...currentCandidates];
        }
    });

    const filteredCandidates = $derived(availableCandidates
        .filter(c => !localCurrentCandidates.some((cc:any) => cc.id === c.id))
        .filter(c => 
            c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.role?.toLowerCase().includes(searchQuery.toLowerCase())
        ));


    async function handleAddCandidate(candidate: typeof availableCandidates[0]) {
        try {
            isAssigning = true;
            assigningCandidateId = candidate.id;
            const result = await assignJobStore.mutate({
                input: {
                    input: {
                        candidateId: candidate.id,
                        jobId: parseInt(jobId),
                        status: "ACTIVE"
                    }
                }
            });
            
            if (result.data?.assignJob?.success) {
                localCurrentCandidates = [...localCurrentCandidates, { ...candidate }];
                dispatch('addCandidate', { jobId, candidate });
            } else {
                const errorMessage = result.data?.assignJob?.message || "Failed to assign candidate";
                console.error("Error assigning candidate:", errorMessage);
            }
        } catch (error) {
            console.error("Error assigning candidate:", error);
        } finally {
            isAssigning = false;
            assigningCandidateId = null;
        }
    }
 
    async function handleRemoveCandidate(candidateId: number) {
        try {
            isRemoving = true;
            removingCandidateId = candidateId;
            const result = await deleteAssignmentStore.mutate({
                input: {
                    candidateId: candidateId,
                    jobId: parseInt(jobId)
                }
            });
            
            if (result.data?.deleteAssignment?.success) {
                localCurrentCandidates = localCurrentCandidates.filter((c:any) => c.id !== candidateId);
                dispatch('removeCandidate', { jobId, candidateId });
            } else {
                const errorMessage = result.data?.deleteAssignment?.message || "Failed to remove candidate";
                console.error("Error removing candidate:", errorMessage);
            }
        } catch (error) {
            console.error("Error removing candidate:", error);
        } finally {
            isRemoving = false;
            removingCandidateId = null;
        }
    }
    function handleClose() {
       dispatch('close');
    }
</script>

{#if showDialog}
<div 
    class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50"
    role="dialog"
    aria-modal="true"
    on:click={handleClose}
    on:keydown={e => e.key === 'Escape' && handleClose()}
    tabindex="-1"
    transition:fade
>
    <div 
        class="bg-white rounded-2xl w-[95%] md:w-[900px] max-h-[90vh] shadow-xl flex flex-col"
        role="dialog"
        on:keydown={e => e.key === 'Escape' && handleClose()}
        tabindex="0"
        transition:fly={{ y: 20, duration: 300 }}
        on:click|stopPropagation
    >
        <!-- Header -->
        <div class="p-6 border-b flex justify-between items-center">
            <div>
                <h2 class="text-2xl font-bold text-gray-800">Manage Candidates</h2>
                <p class="text-gray-600 mt-1">Job: {jobTitle}</p>
            </div>
            <button 
                class="p-2 hover:bg-gray-100 rounded-full transition-colors"
                on:click={handleClose}
            >
                <span class="material-icons-sharp text-gray-600">close</span>
            </button>
        </div>

        <div class="flex-1 overflow-hidden flex flex-col md:flex-row">
            <!-- Left side: Current Candidates -->
            <div class="w-full md:w-1/2 p-4 md:p-6 border-b md:border-b-0 md:border-r overflow-y-auto">
                <h3 class="text-lg font-semibold text-gray-700 mb-4">Assigned Candidates</h3>
                {#if localCurrentCandidates.length === 0}
                <div class="text-center py-4 md:py-8 text-gray-500">
                    <span class="material-icons-sharp text-3xl md:text-4xl mb-2">group_off</span>
                    <p>No candidates assigned yet</p>
                </div>
            {:else}
                <div class="space-y-3">
                    <div class="relative mb-4 md:mb-6">
                        <span class="material-icons-sharp absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                        <input 
                            type="text"
                            bind:value={assignedSearchQuery}
                            placeholder="Search assigned candidates..."
                            class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all"
                        />
                    </div>
                    {#if filteredAssignedCandidates.length === 0}
                        <div class="text-center py-4 text-gray-500">
                            <span class="material-icons-sharp text-2xl mb-2">search_off</span>
                            <p>No matching candidates found</p>
                        </div>
                    {:else}
                        {#each filteredAssignedCandidates as candidate}
                            <div class="p-3 md:p-4 border rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                                <div class="flex justify-between items-start gap-4">
                                    <div class="min-w-0 flex-1">
                                        <h4 class="font-medium text-gray-800 truncate">{candidate.name}</h4>
                                        <p class="text-sm text-gray-600 truncate">{candidate.email}</p>
                                        {#if candidate.role}
                                            <span class="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                {candidate.role}
                                            </span>
                                        {/if}
                                    </div>
                                    <button 
                                        class="text-red-500 hover:text-red-600 p-1.5 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                                        on:click={() => handleRemoveCandidate(candidate.id)}
                                        disabled={removingCandidateId === candidate.id}
                                    >
                                        {#if removingCandidateId === candidate.id}
                                            <div class="animate-spin h-5 w-5 border-2 border-red-500 rounded-full border-t-transparent"></div>
                                        {:else}
                                            <span class="material-icons-sharp">person_remove</span>
                                        {/if}
                                    </button>
                                </div>
                            </div>
                        {/each}
                    {/if}
                </div>
            {/if}
            </div>

            <!-- Right side: Available Candidates -->
            <div class="w-full md:w-1/2 p-4 md:p-6 overflow-y-auto">
                <h3 class="text-lg font-semibold text-gray-700 mb-4">Available Candidates</h3>
                
                <!-- Search -->
                <div class="relative mb-4 md:mb-6">
                    <span class="material-icons-sharp absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                    <input 
                        type="text"
                        bind:value={searchQuery}
                        placeholder="Search candidates..."
                        class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all"
                    />
                </div>

                {#if isLoadingCandidates}
                    <div class="flex justify-center py-8">
                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                {:else if candidatesError}
                    <div class="text-center py-4 text-red-500">
                        <span class="material-icons-sharp text-2xl mb-2">error</span>
                        <p>Error loading candidates: {candidatesError}</p>
                    </div>
                {:else if filteredCandidates.length === 0}
                    <div class="text-center py-4 text-gray-500">
                        <span class="material-icons-sharp text-2xl mb-2">search_off</span>
                        <p>No matching candidates found</p>
                    </div>
                {:else}
                    <div class="space-y-3">
                        {#each filteredCandidates as candidate}
                            <div class="p-3 md:p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                                <div class="flex justify-between items-start gap-4">
                                    <div class="min-w-0 flex-1">
                                        <h4 class="font-medium text-gray-800 truncate">
                                            {candidate.name}
                                            {#if candidate.verified}
                                                <span class="material-icons-sharp text-green-500 text-sm align-middle ml-1">verified</span>
                                            {/if}
                                        </h4>
                                        <p class="text-sm text-gray-600 truncate">{candidate.email}</p>
                                        <div class="mt-1 flex flex-wrap gap-1">
                                            {#if candidate.role}
                                                <span class="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                    {candidate.role}
                                                </span>
                                            {/if}
                                            {#if candidate.experience}
                                                <span class="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full">
                                                    {candidate.experience} years exp.
                                                </span>
                                            {/if}
                                        </div>
                                    </div>
                                    <button 
                                        class="text-green-500 hover:text-green-600 p-1.5 hover:bg-green-50 rounded-lg transition-colors flex-shrink-0"
                                        on:click={() => handleAddCandidate(candidate)}
                                        disabled={assigningCandidateId === candidate.id}
                                    >
                                        {#if assigningCandidateId === candidate.id}
                                            <div class="animate-spin h-5 w-5 border-2 border-green-500 rounded-full border-t-transparent"></div>
                                        {:else}
                                            <span class="material-icons-sharp">person_add</span>
                                        {/if}
                                    </button>
                                </div>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>
{/if}