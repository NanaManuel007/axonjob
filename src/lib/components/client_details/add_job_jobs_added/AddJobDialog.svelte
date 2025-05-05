<script lang="ts">
    import { fade } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    import { jobSchema } from '../add_details_types/job.schema';
    import type { JobData } from '../add_details_types/job.types';
    import { initialJobData } from '../add_details_types/job.constants';
    import JobBasicInfo from './JobBasicInfo.svelte';
    import WorkingHours from './WorkingHours.svelte';
    import JobDuties from '$lib/components/client_details/add_job_jobs_added/JobDuties.svelte';
    import JobRequirements from '$lib/components/client_details/add_job_jobs_added/JobRequirements.svelte';
    import JobDetails from '$lib/components/client_details/add_job_jobs_added/JobDetails.svelte';
    import { CreateJobStore, JobType, PaymentType, UpdateJobStore } from '$houdini';
    import { z } from 'zod';  
    import Toast from '$lib/components/general_components/Toast.svelte';
     const dispatch = createEventDispatcher();

    const { clientId, showDialog = $bindable(false), isEditMode = $bindable(false), jobToEdit = $bindable(null) } = $props<{ 
        clientId: number, 
        showDialog?: boolean, 
        isEditMode?: boolean, 
        jobToEdit?: any 
    }>();
    let toastShow = $state(false);
    let toastMessage = $state('');
    let toastType = $state<'success' | 'error'>('success');
    let isLoading = $state(false);
    let errors = $state<{ [key: string]: string }>({});

    let jobData = $state<JobData>({
        ...initialJobData,
        workingHours: {
            sunday: { start: '', end: '', enabled: false },
            monday: { start: '', end: '', enabled: false },
            tuesday: { start: '', end: '', enabled: false },
            wednesday: { start: '', end: '', enabled: false },
            thursday: { start: '', end: '', enabled: false },
            friday: { start: '', end: '', enabled: false },
            saturday: { start: '', end: '', enabled: false }
        }
    });

    let showWorkingHours = $state(false);
    let isInitialRender = $state(true);

    function resetForm() {
        jobData = { 
            ...initialJobData,
            workingHours: {
                sunday: { start: '', end: '', enabled: false },
                monday: { start: '', end: '', enabled: false },
                tuesday: { start: '', end: '', enabled: false },
                wednesday: { start: '', end: '', enabled: false },
                thursday: { start: '', end: '', enabled: false },
                friday: { start: '', end: '', enabled: false },
                saturday: { start: '', end: '', enabled: false }
            }
        };
        errors = {};
        showWorkingHours = false;
    }

    function updateJobData() {
        // Only update if necessary to avoid infinite loops
        if (jobData.jobType === JobType.TEMPORARY) {
            // Don't reassign the entire jobData object
            jobData.temporaryType = jobData.temporaryType || '';
            // Only reset working hours if they're not already set
            if (!jobData.workingHours || Object.values(jobData.workingHours).every(day => !day.enabled)) {
                jobData.workingHours = {
                    sunday: { start: '', end: '', enabled: false },
                    monday: { start: '', end: '', enabled: false },
                    tuesday: { start: '', end: '', enabled: false },
                    wednesday: { start: '', end: '', enabled: false },
                    thursday: { start: '', end: '', enabled: false },
                    friday: { start: '', end: '', enabled: false },
                    saturday: { start: '', end: '', enabled: false }
                };
            }
        } else {
            jobData.temporaryType = '';
            // Only reset working hours if they're enabled
            if (jobData.workingHours && Object.values(jobData.workingHours).some(day => day.enabled)) {
                jobData.workingHours = {
                    sunday: { start: '', end: '', enabled: false },
                    monday: { start: '', end: '', enabled: false },
                    tuesday: { start: '', end: '', enabled: false },
                    wednesday: { start: '', end: '', enabled: false },
                    thursday: { start: '', end: '', enabled: false },
                    friday: { start: '', end: '', enabled: false },
                    saturday: { start: '', end: '', enabled: false }
                };
            }
        }
        // Update visibility flag
        showWorkingHours = jobData.jobType === JobType.TEMPORARY;
    }
    
    function validateForm() {
        try {
            jobSchema.parse(jobData);
            errors = {};
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                errors = error.errors.reduce((acc, curr) => {
                    const path = curr.path.join('.');
                    acc[path] = curr.message;
                    return acc;
                }, {} as { [key: string]: string });
            }
            return false;
        }
    }

    const createJobStore = new CreateJobStore();
    const updateJobStore = new UpdateJobStore();
    
    // Track job type changes and update form accordingly
    $effect(() => {
        // Skip the first render to avoid conflicts with the edit mode effect
        if (!isInitialRender) {
            const currentJobType = jobData.jobType;
            if (currentJobType) {
                updateJobData();
            }
        }
    });

    $effect(() => {
        // Only run this effect if we haven't processed this edit yet
        // and we have valid edit data
        if (isEditMode && jobToEdit && !editProcessed) {
            console.log("Editing job:", jobToEdit);
            
            // Set the flag to prevent re-processing
            editProcessed = true;
            
            // Create a complete object with all properties at once
            const updatedJobData = {
                ...initialJobData,
                title: jobToEdit.title || '',
                jobType: jobToEdit.jobType || JobType.PERMANENT,
                paymentType: jobToEdit.paymentType || PaymentType.PER_ANNUM,
                paymentAmount: jobToEdit.salaryPerAnnum,
                jobHours: jobToEdit.jobHours || '',
                location: jobToEdit.location || '',
                startDate: jobToEdit.startDate ? new Date(jobToEdit.startDate).toISOString().split('T')[0] : '',
                numberOfRoles: jobToEdit.numberOfRoles?.toString() || '1',
                duties: Array.isArray(jobToEdit.duties) && jobToEdit.duties.length > 0 
                    ? [...jobToEdit.duties] 
                    : [''],
                requirements: Array.isArray(jobToEdit.requirements) && jobToEdit.requirements.length > 0 
                    ? [...jobToEdit.requirements] 
                    : [''],
                published: jobToEdit.published || false,
                temporaryType: jobToEdit.temporaryType || '',
                workingHours: jobToEdit.workingHours || {
                    sunday: { start: '', end: '', enabled: false },
                    monday: { start: '', end: '', enabled: false },
                    tuesday: { start: '', end: '', enabled: false },
                    wednesday: { start: '', end: '', enabled: false },
                    thursday: { start: '', end: '', enabled: false },
                    friday: { start: '', end: '', enabled: false },
                    saturday: { start: '', end: '', enabled: false }
                }
            };
            
            // Set the job data all at once
            jobData = updatedJobData;
            
            // Add the id property separately
            (jobData as any).id = jobToEdit.id;
            
            // Set visibility flag directly
            showWorkingHours = jobData.jobType === JobType.TEMPORARY;
            
            // Mark initial render as complete
            isInitialRender = false;
        }
    });
    let editProcessed = $state(false);
    // Also modify the dialog close effect to reset the edit processed flag
    $effect(() => {
        if (!showDialog) {
            resetForm();
            isInitialRender = true;
            editProcessed = false; // Reset the edit processed flag
        }
    });
    async function handleSubmit(event: Event) {
        event.preventDefault();
        try {
            const validatedData = jobSchema.parse(jobData);
            errors = {};
            isLoading = true;

            // Common data for both create and update
            const commonData = {
                title: validatedData.title,
                jobType: validatedData.jobType,
                paymentType: validatedData.paymentType,
                salaryPerAnnum: validatedData.paymentAmount,
                jobHours: validatedData.jobHours,
                location: validatedData.location,
                startDate: new Date(validatedData.startDate),
                numberOfRoles: parseInt(validatedData.numberOfRoles),
                duties: validatedData.duties.filter(duty => duty.trim() !== ''),
                requirements: validatedData.requirements.filter(req => req.trim() !== ''),
                published: validatedData.published,
                temporaryType: validatedData.temporaryType || ''
            };

            let result;
            
            if (isEditMode && (jobData as any).id) {
                result = await updateJobStore.mutate({ 
                    input: {
                        id: (jobData as any).id,  
                        input: {  
                            ...commonData
                        }
                    }
                });
                
                if (result.data?.updateJob?.success) {
                    toastShow = true;
                    toastMessage = 'Job updated successfully';
                    toastType = 'success';
                    
                    dispatch('jobUpdated', true);
                    dispatch('closeDialog', false);
                } else {
                    const errorMessage = result.data?.updateJob?.message || 'Failed to update job';
                    errors = { form: errorMessage };
                }
            } else {
                // Create new job
                const input = {
                    input: {
                        clientId,
                        ...commonData
                    }
                };
                
                result = await createJobStore.mutate({ input });

                if (result.data?.createJob?.success) {
                    toastShow = true;
                    toastMessage = 'Job added successfully';
                    toastType = 'success';
                    
                    dispatch('jobAdded', true);
                    dispatch('closeDialog', false);
                } else {
                    const errorMessage = result.data?.createJob?.message || 'Failed to create job';
                    errors = { form: errorMessage };
                }
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                errors = error.errors.reduce((acc: { [key: string]: string }, curr) => {
                    const path = curr.path.join('.');
                    acc[path] = curr.message;
                    return acc;
                }, {});
            } else {
                errors = { form: isEditMode ? 'An error occurred while updating the job' : 'An error occurred while creating the job' };
            }
        } finally {
            isLoading = false;
        }
    }
</script>

<Toast 
    bind:show={toastShow}
    message={toastMessage}
    type={toastType}
/>

{#if showDialog}
<div class="fixed inset-0 bg-gray-900/5 backdrop-blur-[2px] flex items-center justify-center z-50" transition:fade>
    <div class="bg-white rounded-[15px] p-8 w-[1200px] max-h-[90vh] overflow-y-auto shadow-[0_2rem_3rem_rgba(132,139,200,0.18)]">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800">{isEditMode ? 'Edit Job' : 'Add New Job'}</h2>
            <button 
                class="text-gray-500 hover:text-gray-700"
                on:click={() => dispatch('closeDialog')}
                disabled={isLoading}
            >
                <span class="material-icons-sharp">close</span>
            </button>
        </div>

        <div class="flex gap-8">
            <form on:submit|preventDefault={handleSubmit} class="flex-1">
                <div class="space-y-6">
                  <JobBasicInfo bind:jobData {errors} />
                  <JobDuties bind:jobData {errors} />
                  <JobRequirements bind:jobData />
                  <JobDetails bind:jobData {errors} />
        
                  <div class="flex justify-end gap-4 pt-6">
                    <button
                      type="button"
                      class="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      on:click={() => dispatch('closeDialog')}
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                    type="submit"
                    class="px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    disabled={isLoading}
                  >
                    {#if isLoading}
                      <span class="material-icons-sharp animate-spin text-sm">refresh</span>
                    {/if}
                    {isLoading ? (isEditMode ? "Updating Job..." : "Adding Job...") : (isEditMode ? "Update Job" : "Add Job")}
                  </button>
                  </div>
                </div>
              </form>

            {#if jobData.jobType === JobType.TEMPORARY}
                <div class="w-96 flex-shrink-0">
                    <WorkingHours bind:workingHours={jobData.workingHours} />
                </div>
            {/if}
        </div>
    </div>
</div>
{/if}