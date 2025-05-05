<script lang="ts">
    import { fly } from 'svelte/transition';
    import type { Candidate } from '$lib/stores/allUsersStore/canditates';
    import AvailabilityScheduleTab from '$lib/components/candidate_details/user_availability/AvailabilityScheduleTab.svelte';
    import CurrentBookingsTab from '$lib/components/candidate_details/user_availability/CurrentBookingsTab.svelte';
    import CompletedBookingsTab from '$lib/components/candidate_details/user_availability/CompletedBookingsTab.svelte';

    export let candidate: Candidate;
    let activeTab = 'current';

    const tabs = [
        { id: 'current', label: 'Current Bookings', icon: 'event' },
        { id: 'completed', label: 'Completed Bookings', icon: 'event_available' },
        { id: 'availability', label: 'Availability Schedule', icon: 'schedule' },
    ];
</script>

<div class="space-y-6">
    <!-- Tab Navigation -->
    <div class="bg-gray-100/50 p-2 rounded-xl inline-flex gap-2">
        {#each tabs as tab}
            <button
                class="px-6 py-3 font-medium rounded-lg transition-all duration-200
                    {activeTab === tab.id 
                        ? 'bg-white text-gray-600 shadow-sm' 
                        : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'}"
                on:click={() => activeTab = tab.id}
            >
                <div class="flex items-center gap-2">
                    <span class="material-icons-sharp text-sm">{tab.icon}</span>
                    {tab.label}
                </div>
            </button>
        {/each}
    </div>

    <!-- Tab Content -->
    {#key activeTab}
        <div 
            in:fly={{ x: 100, duration: 300, opacity: 0 }}
            out:fly={{ x: -100, duration: 300, opacity: 0 }}
        >
            {#if activeTab === 'current'}
            <CurrentBookingsTab/>
            {:else if activeTab === 'completed'}
            <CompletedBookingsTab />
            {:else if activeTab === 'availability'}
            <AvailabilityScheduleTab />
            {/if}
        </div>
    {/key}
</div>