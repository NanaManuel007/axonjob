<script lang="ts">
    import { page } from '$app/stores';
    import { customers } from '$lib/stores/allClientsStore/customers';
    import AssignedCandidates from './assigned_candidate/AssignedCandidates.svelte';
    import CompanyDetailsTab from './CompanyDetailsTab.svelte';
    import JobsAddedTab from './add_job_jobs_added/JobsAddedTab.svelte';
    import PendingApprovals from './pernding_approvals/PendingApprovals.svelte';
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';

    let mounted = false;
    let activeTab = 'company';
    let isLoading = false;

    onMount(() => {
        mounted = true;
    });

    const handleTabChange = async (tabId: string) => {
        isLoading = true;
        activeTab = tabId;
        await new Promise(resolve => setTimeout(resolve, 500));
        isLoading = false;
    };

    const tabs = [
        { id: 'company', label: 'Company Details', icon: 'business' },
        { id: 'jobs', label: 'Jobs Added', icon: 'work' },
    ];

    $: clientId = parseInt($page.params.id);
    $: client = $customers.find(c => c.id === clientId);
</script>

{#if mounted}
<div class="flex h-screen bg-white p-10">
    <!-- Side Navigation -->
    <div class="w-72 h-40 bg-white shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] rounded-[15px]"
        in:fly={{ duration: 1000, delay: 300, x: -200 }}>
        <nav class="p-4">
            {#each tabs as tab}
                <button
                    class="w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-colors
                           {activeTab === tab.id ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}"
                    on:click={() => handleTabChange(tab.id)}
                >
                    <span class="material-icons-sharp">{tab.icon}</span>
                    {tab.label}
                </button>
            {/each}
        </nav>
    </div>

    <div class="flex-1 p-8"
        in:fly={{ duration: 1000, delay: 300, x: 200 }}>
        {#if isLoading}
            <div class="flex justify-center items-center h-full">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        {:else}
            {#key activeTab}
                <div 
                    in:fly={{ duration: 800, x: 100, opacity: 0 }}
                    out:fly={{ duration: 400, x: -100, opacity: 0 }}
                >
                    {#if activeTab === 'company'}
                        <CompanyDetailsTab {clientId} />
                    {:else if activeTab === 'jobs'}
                        {#if client}
                            <JobsAddedTab {clientId} />
                        {/if}

                    {/if}
                </div>
            {/key}
        {/if}
    </div>
</div>
{/if}