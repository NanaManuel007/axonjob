<script lang="ts">
    import type { JobData } from '../add_details_types/job.types';
    import TextAreaField from '../../general_components/TextAreaField.svelte';

    export let jobData: JobData;
    export let errors: { [key: string]: string };
</script>

<div class="space-y-4">
    <h3 class="text-lg font-semibold text-gray-700">Job Duties</h3>
    {#each jobData.duties as _, i}
        <div class="space-y-1">
            <TextAreaField
                label={`Duty ${i + 1}`}
                icon="assignment"
                bind:value={jobData.duties[i]}

                placeholder={`Enter duty ${i + 1}`}
                rows={2}
            />
            {#if i === 0 && errors['duties.0']}
                <p class="text-red-500 text-sm">{errors['duties.0']}</p>
            {/if}
        </div>
    {/each}
</div>

<!-- required={i === 0} -->