<script lang="ts">
    import type { JobData } from '../add_details_types/job.types';
    import InputField from '../../general_components/InputField.svelte';
    import DatePickerField from '../../general_components/DatePickerField.svelte';

    export let jobData: JobData;
    export let errors: { [key: string]: string };

    function handleDateChange(event: CustomEvent) {
        event.stopPropagation();
        if (event.target && event.target instanceof HTMLElement) {
            const form = event.target.closest('form');
            if (form) {
                event.preventDefault();
            }
        }
    }
</script>

<div class="grid grid-cols-2 gap-6">
    <div class="space-y-1">
        <InputField
            label="Job Hours"
            type="text"
            icon="schedule"
            bind:value={jobData.jobHours}
        
            placeholder="e.g., 9:00 AM - 5:00 PM"
        />
        {#if errors.jobHours}
            <p class="text-red-500 text-sm">{errors.jobHours}</p>
        {/if}
    </div>

    <div class="space-y-1">
        <InputField
            label="Location"
            type="text"
            icon="location_on"
            bind:value={jobData.location}
        
            placeholder="Enter job location"
        />
        {#if errors.location}
            <p class="text-red-500 text-sm">{errors.location}</p>
        {/if}
    </div>

    <div class="space-y-1">
        <DatePickerField
            label="Start Date"
            bind:value={jobData.startDate}
            on:change={handleDateChange}
        />
        {#if errors.startDate}
            <p class="text-red-500 text-sm">{errors.startDate}</p>
        {/if}
    </div>

    <div class="space-y-1">
        <InputField
            label="Number of Roles"
            type="number"
            icon="groups"
            bind:value={jobData.numberOfRoles}

            min="1"
        />
        {#if errors.numberOfRoles}
            <p class="text-red-500 text-sm">{errors.numberOfRoles}</p>
        {/if}
    </div>

    <div class="space-y-2">
        <label class="flex items-center gap-2 cursor-pointer">
            <input 
                type="checkbox"
                bind:checked={jobData.published}
                class="w-4 h-4 text-gray-600"
            >
            <span class="text-sm font-medium text-gray-700">Publish Job</span>
        </label>
    </div>
</div>