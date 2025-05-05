<script lang="ts">
    import type { JobData } from '../add_details_types/job.types';
    import { temporaryTypes } from '../add_details_types/job.constants';
    import InputField from '../../general_components/InputField.svelte';
    import { JobType, PaymentType } from '$houdini';


    const { jobData = $bindable(), errors = {} } = $props<{ 
        jobData: JobData, 
        errors: { [key: string]: string } 
    }>();
    
    // Create a string representation for the input field
    let paymentAmountStr = $state(jobData.paymentAmount.toString());
    
    // Update string when jobData changes (for initial load and edits)
    $effect(() => {
        paymentAmountStr = jobData.paymentAmount.toString();
    });
    
    // Update the numeric value when string changes (for user input)
    $effect(() => {
        const parsed = parseFloat(paymentAmountStr);
        if (!isNaN(parsed)) {
            jobData.paymentAmount = parsed;
        }
    });
    
    let paymentLabel = $derived(jobData.jobType === JobType.PERMANENT ? 'Salary per annum' : 'Payment Amount');
    let paymentPlaceholder = $derived(jobData.jobType === JobType.PERMANENT ? 'Enter annual salary' : 'Enter amount');
</script>

<div class="grid grid-cols-2 gap-6">
    <div class="space-y-1">
        <InputField
            label="Job Title"
            type="text"
            icon="work"
            bind:value={jobData.title}
            placeholder="Enter job title"
        />
        {#if errors.title}
            <p class="text-red-500 text-sm">{errors.title}</p>
        {/if}
    </div>

    <div class="space-y-2">
        <label for="jobType" class="block text-sm font-medium text-gray-700">Job Type <span class="text-red-500">*</span></label>
        <div class="relative">
            <span class="material-icons-sharp absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">business</span>
            <select 
                class="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200"
                bind:value={jobData.jobType}
            >
                <option value={JobType.PERMANENT}>Permanent</option>
                <option value={JobType.TEMPORARY}>Temporary</option>
                <option value={JobType.CONTRACT}>Contract</option>
                <option value={JobType.PART_TIME}>Part Time</option>
                <option value={JobType.INTERNSHIP}>Internship</option>
            </select>
        </div>
        {#if errors.jobType}
            <p class="text-red-500 text-sm">{errors.jobType}</p>
        {/if}
    </div>

    {#if jobData.jobType === JobType.TEMPORARY}
        <div class="space-y-2">
            <label for="temporaryType" class="block text-sm font-medium text-gray-700">Temporary Type <span class="text-red-500">*</span></label>
            <div class="relative">
                <span class="material-icons-sharp absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">schedule</span>
                <select 
                    class="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200"
                    bind:value={jobData.temporaryType}
                >
                    {#each temporaryTypes as type}
                        <option value={type}>{type}</option>
                    {/each}
                </select>
            </div>
            {#if errors.temporaryType}
                <p class="text-red-500 text-sm">{errors.temporaryType}</p>
            {/if}
        </div>
    {/if}

    <div class="space-y-2">
        <label for="paymentType" class="block text-sm font-medium text-gray-700">Payment Type <span class="text-red-500">*</span></label>
        <div class="relative">
            <span class="material-icons-sharp absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">payments</span>
            <select 
                class="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-200"
                bind:value={jobData.paymentType}
            >
                <option value={PaymentType.PER_HOUR}>Per Hour</option>
                <option value={PaymentType.DAILY}>Per Day</option>
                <option value={PaymentType.PER_ANNUM}>Per annum</option>
            </select>
        </div>
        {#if errors.paymentType}
            <p class="text-red-500 text-sm">{errors.paymentType}</p>
        {/if}
    </div>

    <div class="space-y-1">
        <InputField
            label={paymentLabel}
            type="text"
            icon="attach_money"
            bind:value={paymentAmountStr}
            placeholder={paymentPlaceholder}
        />
        {#if errors.paymentAmount}
            <p class="text-red-500 text-sm">{errors.paymentAmount}</p>
        {/if}
    </div>
</div>