<script lang="ts">
    import type { JobData } from '../add_details_types/job.types';
    import TextAreaField from '../../general_components/TextAreaField.svelte';

    export let jobData: JobData;
</script>

<div class="space-y-4">
    <h3 class="text-lg font-semibold text-gray-700">Job Requirements</h3>
    {#each jobData.requirements as _, i}
        <TextAreaField
            label={`Requirement ${i + 1}`}
            icon="list_alt"
            bind:value={jobData.requirements[i]}
            placeholder={`Enter requirement ${i + 1}`}
            rows={2}
        />
    {/each}
</div>