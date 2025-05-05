<script lang="ts">
    import type { WorkingHours, DayId, DaySchedule } from '../add_details_types/job.types';
    import { weekDays } from '../add_details_types/job.constants';

    export let workingHours: WorkingHours;
    let localWorkingHours = workingHours;

    $: {
        if (localWorkingHours) {
            workingHours = localWorkingHours;
        }
    }


    function handleDayChange(day: DayId, enabled: boolean) {
        localWorkingHours = {
            ...localWorkingHours,
            [day]: {
                ...localWorkingHours[day],
                enabled,
                start: enabled ? localWorkingHours[day].start || '09:00' : '',
                end: enabled ? localWorkingHours[day].end || '17:00' : ''
            }
        };
    }
</script>
<div class="w-[400px] border-l pl-8">
    <h3 class="text-xl font-semibold text-gray-800 mb-6">Working Hours</h3>
    <div class="space-y-3">
        {#each weekDays as day}
            <div class="p-5 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                <label class="flex items-center gap-3 cursor-pointer">
                    <div class="relative">
                        <input 
                            type="checkbox"
                            checked={localWorkingHours[day.id].enabled}
                            on:change={(e) => handleDayChange(day.id, e.currentTarget.checked)}
                            class="w-5 h-5 border-2 border-gray-300 rounded-md text-gray-600 focus:ring-2 focus:ring-gray-200 cursor-pointer"
                        >
                    </div>
                    <span class="text-base font-medium text-gray-700">{day.label}</span>
                </label>
                
                {#if localWorkingHours[day.id].enabled}
                    <div class="grid grid-cols-2 gap-4 mt-4">
                        <div class="space-y-2">
                            <label for={`${day.id}-start`} class="block text-sm font-medium text-gray-600">Start Time</label>
                            <div class="relative group">
                                <span class="material-icons-sharp absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-gray-600 transition-colors">schedule</span>
                                <input 
                                    type="time"
                                    id={`${day.id}-start`}
                                    bind:value={localWorkingHours[day.id].start}
                                    class="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all"
                                />
                            </div>
                        </div>
                        <div class="space-y-2">
                            <label for={`${day.id}-end`} class="block text-sm font-medium text-gray-600">End Time</label>
                            <div class="relative group">
                                <span class="material-icons-sharp absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-gray-600 transition-colors">schedule</span>
                                <input 
                                    type="time"
                                    id={`${day.id}-end`}
                                    bind:value={localWorkingHours[day.id].end}
                                    class="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all"
                                />
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</div>