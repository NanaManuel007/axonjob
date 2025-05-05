<script lang="ts">
    import { onMount } from "svelte";
    import Chart from "chart.js/auto";
    import { AllJobsStore } from '$houdini';

    export let type: 'assigned' | 'unassigned' | 'verified';
    export let color: string;
    
    let chartRef: HTMLCanvasElement;
    let percentage: number = 0;
    let quantity: number = 0;
    let total: number = 0;
    
    // Initialize the GraphQL store
    const jobsStore = new AllJobsStore();
    
    // Load job data and calculate statistics
    async function loadJobStats() {
        const result = await jobsStore.fetch();
        
        if (result.data?.jobs?.items) {
            const jobs = result.data.jobs.items;
            
            if (type === 'assigned') {
                total = jobs.length;
                // Count jobs with at least one assignment
                const assignedJobs = jobs.filter(job => job.assignments && job.assignments.length > 0);
                quantity = assignedJobs.length;
            } else if (type === 'unassigned') {
                total = jobs.length;
                // Count jobs with no assignments
                const unassignedJobs = jobs.filter(job => !job.assignments || job.assignments.length === 0);
                quantity = unassignedJobs.length;
            } else if (type === 'verified') {
                // Get unique client IDs
                const clientIds = new Set();
                const verifiedClientIds = new Set();
                
                jobs.forEach(job => {
                    if (job.client && job.client.id) {
                        clientIds.add(job.client.id);
                        
                        // Check if client is verified (exact match for 'VERIFIED' status)
                        if (job.client.verificationStatus === 'verified') {
                            verifiedClientIds.add(job.client.id);
                        }
                    }
                });
                
                quantity = verifiedClientIds.size;
                total = clientIds.size;
            }
            
            // Calculate percentage
            percentage = total > 0 ? Math.round((quantity / total) * 100) : 0;
        }
        
        // Initialize chart after data is loaded
        initChart();
    }
    
    function initChart() {
        if (!chartRef) return;
        
        // Destroy previous chart if it exists
        Chart.getChart(chartRef)?.destroy();
        
        new Chart(chartRef, {
            type: "doughnut",
            data: {
                datasets: [
                    {
                        data: [Math.abs(percentage), 100 - Math.abs(percentage)],
                        backgroundColor: [color, "#E5E7EB"]
                    }
                ]
            },
            options: {
                cutout: "80%",
                responsive: true,
                plugins: {
                    tooltip: { enabled: false },
                    legend: { display: false }
                }
            }
        });
    }

    onMount(() => {
        loadJobStats();
    });
</script>

<div class="flex flex-col items-center">
    <div class="relative w-16 h-16 mb-2">
        <canvas bind:this={chartRef} class="absolute inset-0"></canvas>
        <span class="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-600">
            {percentage}%
        </span>
    </div>
    <div class="text-center">
        <p class="text-sm font-medium text-gray-700">
            {#if type === 'assigned'}
                Assigned Jobs
            {:else if type === 'unassigned'}
                Unassigned Jobs
            {:else if type === 'verified'}
                Verified Clients
            {/if}
        </p>
        <p class="text-xs text-gray-500">{quantity} of {total}</p>
    </div>
</div>