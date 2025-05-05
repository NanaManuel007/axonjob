<script lang="ts">
    import AnalyticsChartComponent from './AnalyticsChartComponent.svelte';
</script>

<div class="bg-white p-6 rounded-2xl shadow-[0_2rem_3rem_rgba(132,139,200,0.18)]">
    <h2 class="text-lg font-semibold mb-4">Job Analytics</h2>
    
    <div class="grid grid-cols-3 gap-4">
        <AnalyticsChartComponent type="assigned" color="#4F46E5" />
        <AnalyticsChartComponent type="unassigned" color="#EF4444" />
        <AnalyticsChartComponent type="verified" color="#10B981" />
    </div>
</div>