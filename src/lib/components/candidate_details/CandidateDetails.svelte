<script lang="ts">
    import { page } from '$app/stores';
    import { candidates } from '$lib/stores/allUsersStore/canditates';
    import UserDetailsTab from '$lib/components/candidate_details/user_details/UserDetailsTab.svelte';
    import UserAvailabilityTab from '$lib/components/candidate_details/user_availability/UserAvailabilityTab.svelte';
    import SubmittedTMSTab from '$lib/components/candidate_details/user_availability/submitted_tms/SubmittedTMSTab.svelte';
    import QueriesTab from './queries_and_complains/QueriesTab.svelte';
    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';

    let mounted = false;
    let activeTab = 'details';

    onMount(() => {
        mounted = true;
    });

    const tabs = [
        { id: 'details', label: 'Candidate Details', icon: 'person' },
        { id: 'availability', label: 'Availability', icon: 'event_available' },
        // { id: 'tms', label: 'Submitted TMS', icon: 'assignment_turned_in' },
        { id: 'queries', label: 'Feedbacks and Queries', icon: 'help_outline' },
    ];

    $: candidateId = parseInt($page.params.id);
    $: candidate = $candidates.find((c: { id: number }) => c.id === candidateId);
</script>

{#if mounted}
<div class="flex h-screen bg-white p-10">
    <!-- Side Navigation -->
    <div class="w-72 h-50 pt-2 bg-white shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] rounded-[15px]"
        in:fly={{ duration: 1000, delay: 300, x: -200 }}>
        <nav class="p-4">
            {#each tabs as tab}
                <button
                    class="w-full flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-colors
                           {activeTab === tab.id ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}"
                    on:click={() => activeTab = tab.id}
                >
                    <span class="material-icons-sharp">{tab.icon}</span>
                    {tab.label}
                </button>
            {/each}
        </nav>
    </div>

    <div class="flex-1 p-8"
        in:fly={{ duration: 1000, delay: 300, x: 200 }}>
        {#key activeTab}
            <div 
                in:fly={{ duration: 800, x: 100, opacity: 0 }}
                out:fly={{ duration: 400, x: -100, opacity: 0 }}
            >
                {#if activeTab === 'details'}
                    {#if candidate}
                        <UserDetailsTab {candidate} />
                    {/if}
                <!-- {:else if activeTab === 'availability'}
                    {#if candidate}
                        <UserAvailabilityTab {candidate} />
                    {/if} -->
                <!-- {:else if activeTab === 'tms'}
                    {#if candidate}
                        <SubmittedTMSTab {candidate} />
                    {/if} -->
                <!-- {:else if activeTab === 'queries'}
                    {#if candidate}
                        <QueriesTab/>
                    {/if} -->
                <!-- {:else if activeTab === 'complaints'}
                    {#if candidate}
                        <ComplaintsTab {candidate} />
                    {/if} -->
                {/if}
            </div>
        {/key}
    </div>
</div>
{/if}