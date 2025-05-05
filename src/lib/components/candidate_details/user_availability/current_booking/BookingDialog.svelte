<script lang="ts">
    export let showDialog = false;
    export let onClose = () => {};
    export let onAssign = (job: any) => {};

    let availableJobs = [
        { 
            id: 1, 
            title: 'Primary School Teacher', 
            type: 'Full Time', 
            duration: '6 months', 
            hours: 160,
            pricePerHour: 25,
            pricePerDay: 180,
            company: 'Greenwood Primary School',
            location: 'Manchester, UK'
        },
        { 
            id: 2, 
            title: 'Secondary Math Teacher', 
            type: 'Part Time', 
            duration: '3 months', 
            hours: 80,
            pricePerHour: 30,
            pricePerDay: 200,
            company: 'St. Mary High School',
            location: 'Liverpool, UK'
        },
        { 
            id: 3, 
            title: 'Science Teacher', 
            type: 'Full Time', 
            duration: '12 months', 
            hours: 180,
            pricePerHour: 28,
            pricePerDay: 190,
            company: 'Cambridge Academy',
            location: 'Cambridge, UK'
        },
        { 
            id: 4, 
            title: 'PE Teacher', 
            type: 'Temporary', 
            duration: '2 months', 
            hours: 40,
            pricePerHour: 22,
            pricePerDay: 160,
            company: 'Sports Academy School',
            location: 'Leeds, UK'
        }
    ];
</script>

{#if showDialog}
    <div tabindex="-1"
        class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[60]"
        role="dialog"
        on:click={onClose}
        on:keydown={e => e.key === 'Escape' && onClose()}
    >
        <div
            tabindex="0"
            on:keydown={e => e.key === 'Enter' && onClose()}
            class="bg-white rounded-3xl w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto"
            role="dialog"
            on:click|stopPropagation
        >
            <!-- Header -->
            <div class="p-6 border-b border-gray-100">
                <div class="flex justify-between items-center">
                    <div>
                        <h2 class="text-xl font-bold text-gray-800">Available Jobs</h2>
                        <p class="text-sm text-gray-600 mt-1">Select a job to assign</p>
                    </div>
                    <button 
                        class="p-2 hover:bg-gray-100 rounded-full transition-all duration-300"
                        on:click={onClose}
                    >
                        <span class="material-icons-sharp text-gray-600">close</span>
                    </button>
                </div>
            </div>

            <!-- Job List -->
            <div class="p-6">
                <div class="space-y-4">
                    {#each availableJobs as job}
                        <div class="border rounded-xl p-4 hover:bg-gray-50 transition-colors">
                            <div class="flex justify-between items-start">
                                <div class="space-y-2">
                                    <div>
                                        <h3 class="font-medium text-gray-900">{job.title}</h3>
                                        <p class="text-sm text-gray-600">{job.company}</p>
                                    </div>
                                    <div class="flex items-center gap-2 text-sm text-gray-600">
                                        <span class="material-icons-sharp text-sm">location_on</span>
                                        {job.location}
                                    </div>
                                    <div class="flex flex-wrap gap-3">
                                        <span class="text-sm text-gray-600">• {job.type}</span>
                                        <span class="text-sm text-gray-600">• {job.duration}</span>
                                        <span class="text-sm text-gray-600">• {job.hours}h</span>
                                    </div>
                                    <div class="flex gap-4">
                                        <div class="text-sm">
                                            <span class="text-gray-500">Per hour:</span>
                                            <span class="font-medium text-gray-900">£{job.pricePerHour}</span>
                                        </div>
                                        <div class="text-sm">
                                            <span class="text-gray-500">Per day:</span>
                                            <span class="font-medium text-gray-900">£{job.pricePerDay}</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    class="px-3 py-1.5 bg-gray-400 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                                    on:click={() => onAssign(job)}
                                >
                                    Assign
                                </button>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
{/if}