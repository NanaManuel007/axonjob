<!-- <script lang="ts">
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import SearchBar from '$lib/components/all_clients/SearchBar.svelte';
    import Dialog from '../general_components/Dialog.svelte';
    import Toast from '../general_components/Toast.svelte';
    import InterviewDialog from './InterviewDialog.svelte';
    import { AllJobsStore } from '$houdini';
  import ManageCandidateDialog from '../client_details/add_job_jobs_added/manage_candidate_dialog/ManageCandidateDialog.svelte';

    // Initialize the Houdini store
    const store = new AllJobsStore();

    // Convert reactive variables to use $state
    let mounted = $state(false);
    let searchTerm = $state('');
    let selectedCompany = $state('All Companies');
    let selectedStatus = $state('All');
    let showInterviewDialog = $state(false);
    let showRejectDialog = $state(false);
    let showAssignDialog = $state(false);
    let showRemoveAssignmentDialog = $state(false);
    let selectedApplication = $state<any>(null);

    // Pagination variables
    let currentPage = $state(1);
    const itemsPerPage = 8;
    let totalPages = $state(1);
    let paginatedApplications = $state<any[]>([]);

    const statusOptions = ['All', 'Pending', 'Interview', 'Hired', 'Rejected'];

    // Fetch jobs on mount
    onMount(async () => {
        await store.fetch();
        mounted = true;
    });

    // Replace reactive statement with $effect
    $effect(() => {
        if (!$store.data?.jobs?.items) return;
        
        // Map GraphQL data to our expected format
        const jobsData = $store.data.jobs.items.map(item => {
            // Get the first assignment if available
            const assignment = item.assignments && item.assignments.length > 0 ? item.assignments[0] : null;
            
            return {
                id: item.id,
                jobId: `JOB-${item.id}`,
                jobTitle: item.title || 'Unknown',
                jobType: item.jobType || 'N/A',
                company: item.client?.companyName || 'Unknown Company',
                availableRoles: item.numberOfRoles || 0,
                appliedDate: item.createdAt || '',
                status: item.status || 'Pending',
                assignmentStatus: assignment?.status || 'Pending',
                user: {
                    id: assignment?.candidateId || 0,
                    name: assignment ? `Candidate #${assignment.candidateId}` : 'Unassigned',
                    assignedAt: assignment?.assignedAt || '',
                    image: null
                }
            };
        });
        
        // Filter jobs based on search term, company and status
        const filtered = jobsData.filter(job => {
            const matchesSearch = Object.values(job).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            );
            const matchesCompany = selectedCompany === 'All Companies' || job.company === selectedCompany;
            const matchesStatus = selectedStatus === 'All' || job.status === selectedStatus;
            return matchesSearch && matchesCompany && matchesStatus;
        });

        totalPages = Math.ceil(filtered.length / itemsPerPage);
        currentPage = Math.min(currentPage, totalPages) || 1;
        
        paginatedApplications = filtered.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );
    });

    // Derive companies list from the jobs data
    $effect(() => {
        if (!$store.data?.jobs?.items) return;
        
        const companyNames = $store.data.jobs.items
            .map(item => item.client?.companyName)
            .filter(Boolean) as string[];
            
        companies = ['All Companies', ...new Set(companyNames)];
    });

    let companies = $state<string[]>(['All Companies']);

    function goToPage(page: number) {
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
        }
    }

    function handleViewUser(userId: number) {
        goto(`/private/all_candidates/candidate_details/${userId}`);
    }

    let showToast = $state(false);
    let toastMessage = $state('');
    let toastType = $state<'success' | 'error'>('success');

    function showSuccessToast(message: string) {
        toastMessage = message;
        toastType = 'success';
        showToast = true;
        setTimeout(() => showToast = false, 3000);
    }


    function handleScheduleInterview(event: CustomEvent) {
        const interviewDetails = event.detail;
        if (selectedApplication) {
            selectedApplication.status = 'Interview';
            selectedApplication.interviewDetails = interviewDetails;
            showSuccessToast(`Interview scheduled for ${selectedApplication.user.name}`);
        }
        showInterviewDialog = false;
        selectedApplication = null;
    }

    // function confirmInterview() {
    //     if (selectedApplication) {
    //         selectedApplication.status = 'Interview';
    //         showSuccessToast(`Interview scheduled for ${selectedApplication.user.name}`);
    //     }
    //     showInterviewDialog = false;
    //     selectedApplication = null;
    // }

    function handleReject(application: any) {
        selectedApplication = application;
        showRejectDialog = true;
    }

    function handleAddCandidate(event: CustomEvent) {
    const { candidate } = event.detail;
    if (selectedApplication && candidate) {
        // Update the UI to show the newly assigned candidate
        selectedApplication.user = {
            id: candidate.id,
            name: candidate.name,
            assignedAt: new Date().toISOString(),
            image: null
        };
        selectedApplication.assignmentStatus = 'ACTIVE';
        showSuccessToast(`${candidate.name} assigned to ${selectedApplication.jobTitle}`);
    }
}
    function confirmReject() {
        if (selectedApplication) {
            selectedApplication.status = 'Rejected';
            showSuccessToast(`Application for ${selectedApplication.jobTitle} has been rejected`);
        }
        showRejectDialog = false;
        selectedApplication = null;
    }

    function handleAssign(application: any) {
        selectedApplication = application;
        showAssignDialog = true;
    }

    function confirmAssign() {
        if (selectedApplication) {
            // Here you would typically call a mutation to assign a candidate
            // For now, we'll just update the UI
            selectedApplication.user = {
                id: 999, // This would come from the selected candidate
                name: "Newly Assigned Candidate",
                assignedAt: new Date().toISOString(),
                image: null
            };
            selectedApplication.assignmentStatus = 'Pending';
            showSuccessToast(`Candidate assigned to ${selectedApplication.jobTitle}`);
        }
        showAssignDialog = false;
        selectedApplication = null;
    }

    function handleRemoveAssignment(application: any) {
        selectedApplication = application;
        showRemoveAssignmentDialog = true;
    }

    function confirmRemoveAssignment() {
        if (selectedApplication) {
            // Here you would typically call a mutation to remove the assignment
            // For now, we'll just update the UI
            selectedApplication.user = {
                id: 0,
                name: "Unassigned",
                assignedAt: "",
                image: null
            };
            selectedApplication.assignmentStatus = 'Pending';
            showSuccessToast(`Assignment removed from ${selectedApplication.jobTitle}`);
        }
        showRemoveAssignmentDialog = false;
        selectedApplication = null;
    }

    
</script> -->


<script lang="ts">
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import SearchBar from '$lib/components/all_clients/SearchBar.svelte';
    import Dialog from '../general_components/Dialog.svelte';
    import Toast from '../general_components/Toast.svelte';
    import InterviewDialog from './InterviewDialog.svelte';
    import ManageCandidateDialog from '../client_details/add_job_jobs_added/manage_candidate_dialog/ManageCandidateDialog.svelte';
    import { fetchAndMapAllJobs } from '$services/jobs_services/jobsServices';

    let mounted = $state(false);
    let searchTerm = $state('');
    let selectedCompany = $state('All Companies');
    let selectedStatus = $state('All');
    let showInterviewDialog = $state(false);
    let showRejectDialog = $state(false);
    let showAssignDialog = $state(false);
    let showRemoveAssignmentDialog = $state(false);
    let selectedApplication = $state<any>(null);

    let currentPage = $state(1);
    const itemsPerPage = 8;
    let totalPages = $state(1);
    let paginatedApplications = $state<any[]>([]);
    let companies = $state<string[]>(['All Companies']);
        let jobsData = $state<any[]>([]);
    let jobsError: string | null = null;
    let jobsTotalCount = 0;

    const statusOptions = ['All', 'Pending', 'Interview', 'Hired', 'Rejected'];

    onMount(async () => {
        try {
            const { jobs, totalCount } = await fetchAndMapAllJobs();
            jobsData = jobs;
            jobsTotalCount = totalCount;
            // Derive companies list from the jobs data
            const companyNames = jobsData
                .map(item => item.company)
                .filter(Boolean) as string[];
            companies = ['All Companies', ...new Set(companyNames)];
            mounted = true;
        } catch (err) {
            jobsError = err instanceof Error ? err.message : 'Unknown error';
        }
    });

    $effect(() => {
        if (!jobsData.length) return;

        const filtered = jobsData.filter(job => {
            const matchesSearch = Object.values(job).some(value =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            );
            const matchesCompany = selectedCompany === 'All Companies' || job.company === selectedCompany;
            const matchesStatus = selectedStatus === 'All' || job.status === selectedStatus;
            return matchesSearch && matchesCompany && matchesStatus;
        });

        totalPages = Math.ceil(filtered.length / itemsPerPage);
        currentPage = Math.min(currentPage, totalPages) || 1;

        paginatedApplications = filtered.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );
    });

    function goToPage(page: number) {
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
        }
    }

    function handleViewUser(userId: number) {
        goto(`/private/all_candidates/candidate_details/${userId}`);
    }

    let showToast = $state(false);
    let toastMessage = $state('');
    let toastType = $state<'success' | 'error'>('success');

    function showSuccessToast(message: string) {
        toastMessage = message;
        toastType = 'success';
        showToast = true;
        setTimeout(() => showToast = false, 3000);
    }

    function handleScheduleInterview(event: CustomEvent) {
        const interviewDetails = event.detail;
        if (selectedApplication) {
            selectedApplication.status = 'Interview';
            selectedApplication.interviewDetails = interviewDetails;
            showSuccessToast(`Interview scheduled for ${selectedApplication.user.name}`);
        }
        showInterviewDialog = false;
        selectedApplication = null;
    }

    function handleReject(application: any) {
        selectedApplication = application;
        showRejectDialog = true;
    }

    function handleAddCandidate(event: CustomEvent) {
        const { candidate } = event.detail;
        if (selectedApplication && candidate) {
            selectedApplication.user = {
                id: candidate.id,
                name: candidate.name,
                assignedAt: new Date().toISOString(),
                image: null
            };
            selectedApplication.assignmentStatus = 'ACTIVE';
            showSuccessToast(`${candidate.name} assigned to ${selectedApplication.jobTitle}`);
        }
    }
    function confirmReject() {
        if (selectedApplication) {
            selectedApplication.status = 'Rejected';
            showSuccessToast(`Application for ${selectedApplication.jobTitle} has been rejected`);
        }
        showRejectDialog = false;
        selectedApplication = null;
    }

    function handleAssign(application: any) {
        selectedApplication = application;
        showAssignDialog = true;
    }

    function confirmAssign() {
        if (selectedApplication) {
            selectedApplication.user = {
                id: 999,
                name: "Newly Assigned Candidate",
                assignedAt: new Date().toISOString(),
                image: null
            };
            selectedApplication.assignmentStatus = 'Pending';
            showSuccessToast(`Candidate assigned to ${selectedApplication.jobTitle}`);
        }
        showAssignDialog = false;
        selectedApplication = null;
    }

    function handleRemoveAssignment(application: any) {
        selectedApplication = application;
        showRemoveAssignmentDialog = true;
    }

    function confirmRemoveAssignment() {
        if (selectedApplication) {
            selectedApplication.user = {
                id: 0,
                name: "Unassigned",
                assignedAt: "",
                image: null
            };
            selectedApplication.assignmentStatus = 'Pending';
            showSuccessToast(`Assignment removed from ${selectedApplication.jobTitle}`);
        }
        showRemoveAssignmentDialog = false;
        selectedApplication = null;
    }
</script>


{#if showAssignDialog && selectedApplication}
    <ManageCandidateDialog
        showDialog={showAssignDialog}
        clientId={parseInt(selectedApplication.id)}
        jobTitle={selectedApplication.jobTitle}
        jobId={selectedApplication.id.toString()}
        currentCandidates={[]}
        on:close={() => showAssignDialog = false}
        on:addCandidate={handleAddCandidate}
    />
{/if}

{#if showRemoveAssignmentDialog && selectedApplication}
    <Dialog
        show={showRemoveAssignmentDialog}
        title="Remove Assignment"
        onClose={() => showRemoveAssignmentDialog = false}
    >
        <p class="text-gray-600">
            Are you sure you want to remove {selectedApplication?.user.name}'s assignment from {selectedApplication?.jobTitle}?
        </p>
        
        <svelte:fragment slot="actions">
            <button
                class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                onclick={() => showRemoveAssignmentDialog = false}
            >
                Cancel
            </button>
            <button
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                onclick={confirmRemoveAssignment}
            >
                Remove
            </button>
        </svelte:fragment>
    </Dialog>
{/if}

<Toast 
    show={showToast}
    message={toastMessage}
    type={toastType}
/>
<InterviewDialog
    show={showInterviewDialog}
    application={selectedApplication}
    on:scheduleInterview={handleScheduleInterview}
    on:close={() => showInterviewDialog = false}
/>
{#if showRejectDialog && selectedApplication}
    <Dialog
        show={showRejectDialog}
        title="Confirm Rejection"
        onClose={() => showRejectDialog = false}
    >
        <p class="text-gray-600">
            Are you sure you want to reject {selectedApplication?.user.name}'s application for {selectedApplication?.jobTitle}?
        </p>
        
        <svelte:fragment slot="actions">
            <button
                class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                onclick={() => showRejectDialog = false}
            >
                No
            </button>
            <button
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                onclick={confirmReject}
            >
                Yes
            </button>
        </svelte:fragment>
    </Dialog>
{/if}

{#if mounted}
    <div class="pt-10 pr-10 pl-10">
        <main class="bg-white rounded-2xl shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] transition-all duration-300" in:fade={{ duration: 1000 }}>
            <section class="w-full overflow-hidden">
                <div class="w-full bg-white/25 p-6 flex items-center">
                    <h1 class="text-3xl font-semibold">All Jobs</h1>
                    <div class="flex-grow"></div>
                    <div class="flex items-center gap-4">
                        <div class="relative">
                            <select
                                bind:value={selectedCompany}
                                class="appearance-none bg-white border border-gray-300 rounded-lg py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-blue-500"
                            >
                                {#each companies as company}
                                    <option value={company}>{company}</option>
                                {/each}
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <span class="material-icons-sharp text-sm">expand_more</span>
                            </div>
                        </div>
                        
                        <div class="relative">
                            <select
                                bind:value={selectedStatus}
                                class="appearance-none bg-white border border-gray-300 rounded-lg py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-blue-500"
                            >
                                {#each statusOptions as status}
                                    <option value={status}>{status}</option>
                                {/each}
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <span class="material-icons-sharp text-sm">expand_more</span>
                            </div>
                        </div>
                        
                        <SearchBar bind:searchTerm />
                    </div>
                </div>

                <!-- {#if $store.fetching}
                    <div class="p-6 text-center">Loading jobs...</div>
                {:else if $store.errors}
                    <div class="p-6 text-center text-red-500">Error loading jobs: {$store.errors[0]?.message}</div> -->
                <!-- {:else} -->
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th class="text-left p-4 font-medium text-gray-600 w-1/5">Assigned User</th>
                                    <th class="text-left p-4 font-medium text-gray-600 w-1/6">Company</th>
                                    <th class="text-left p-4 font-medium text-gray-600 w-1/12">Job ID</th>
                                    <th class="text-left p-4 font-medium text-gray-600 w-1/6">Job Title</th>
                                    <th class="text-left p-4 font-medium text-gray-600 w-1/12">Job Type</th>
                                    <th class="text-left p-4 font-medium text-gray-600 w-1/12">Added Date</th>
                                    <th class="text-center p-4 font-medium text-gray-600 w-1/12">Status</th>
                                    <th class="text-center p-4 font-medium text-gray-600 w-1/6">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each paginatedApplications as application}
                                    <tr class="border-b border-gray-100 hover:bg-gray-50/50">
                                        <td class="p-4">
                                            <div class="space-y-2">
                                                <div class="flex items-center gap-3">
                                                    <div class="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
                                                        {#if application.user.image}
                                                            <img src={application.user.image} alt={application.user.name} class="w-full h-full object-cover">
                                                        {:else}
                                                            <span class="material-icons-sharp text-gray-400 w-full h-full flex items-center justify-center">person</span>
                                                        {/if}
                                                    </div>
                                                    <div class="flex flex-col">
                                                        <span class="font-medium">{application.user.name}</span>
                                                        {#if application.user.id > 0 && application.user.assignedAt}
                                                            <span class="text-xs text-gray-500">
                                                                Assigned: {new Date(application.user.assignedAt).toLocaleDateString()}
                                                            </span>
                                                        {/if}
                                                    </div>
                                                </div>
                                                <!-- {#if application.user.id > 0}
                                                    <div class="pl-13">
                                                        <button
                                                            class="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                                                            onclick={() => handleViewUser(application.user.id)}
                                                        >
                                                            View Profile
                                                        </button>
                                                    </div>
                                                {/if} -->
                                            </div>
                                        </td>
                                        <td class="p-4">
                                            <span class="font-medium text-gray-700">{application.company}</span>
                                        </td>
                                        <td class="p-4">
                                            <span class="font-mono text-sm">{application.jobId}</span>
                                        </td>
                                        <td class="p-4">{application.jobTitle}</td>
                                        <td class="p-4">
                                            <span class="px-2 py-1 bg-gray-100 rounded-full text-sm">
                                                {application.jobType}
                                            </span>
                                        </td>
                                        <td class="p-4">
                                            {new Date(application.appliedDate).toLocaleDateString()}
                                        </td>
                                        <td class="p-4 text-center">
                                            {#if application.user.id > 0}
                                                <span class="text-sm px-2 py-1 rounded-full {
                                                    application.assignmentStatus === 'Interview' ? 'bg-blue-100 text-blue-700' : 
                                                    application.assignmentStatus === 'Hired' ? 'bg-green-100 text-green-700' : 
                                                    application.assignmentStatus === 'Rejected' ? 'bg-red-100 text-red-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                                }">
                                                    {application.assignmentStatus}
                                                </span>
                                            {:else}
                                                <span class="text-sm px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                                                    Unassigned
                                                </span>
                                            {/if}
                                        </td>
                                        <td class="p-4">
                                            <div class="flex items-center justify-center gap-2">
                                                {#if application.user.id === 0}
                                                    <button
                                                        class="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-xs flex items-center gap-1"
                                                        onclick={() => handleAssign(application)}
                                                        title="Assign Candidate"
                                                    >
                                                        <span class="material-icons-sharp text-sm">person_add</span>
                                                        Assign
                                                    </button>
                                                {:else}
                                                    <button
                                                        class="px-2 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-xs flex items-center gap-1"
                                                        onclick={() => handleRemoveAssignment(application)}
                                                        title="Remove Assignment"
                                                    >
                                                        <span class="material-icons-sharp text-sm">person_remove</span>
                                                        Remove
                                                    </button>
                                                    
                                                    <!-- {#if application.assignmentStatus === 'Pending'}
                                                        <button
                                                            class="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-xs flex items-center gap-1"
                                                            onclick={() => handleInterview(application)}
                                                            title="Schedule Interview"
                                                        >
                                                            <span class="material-icons-sharp text-sm">event</span>
                                                            Interview
                                                        </button>
                                                        <button
                                                            class="px-2 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-xs flex items-center gap-1"
                                                            onclick={() => handleReject(application)}
                                                            title="Reject"
                                                        >
                                                            <span class="material-icons-sharp text-sm">close</span>
                                                            Reject
                                                        </button>
                                                    {/if} -->
                                                {/if}
                                            </div>
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>

                    {#if totalPages > 1}
                        <div class="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                            <div class="text-sm text-gray-600">
                                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, paginatedApplications.length)}
                                 <!-- of {$store.data?.jobs?.totalCount || 0} entries -->
                            </div>
                            <div class="flex items-center gap-2">
                                <button
                                    class="px-3 py-1 rounded-lg border {currentPage === 1 ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'}"
                                    onclick={() => goToPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                                
                                {#each Array(totalPages) as _, i}
                                    {#if i + 1 === 1 || i + 1 === totalPages || (i + 1 >= currentPage - 1 && i + 1 <= currentPage + 1)}
                                        <button
                                            class="w-8 h-8 rounded-lg flex items-center justify-center {
                                                currentPage === i + 1
                                                    ? 'bg-blue-500 text-white'
                                                    : 'hover:bg-gray-50'
                                            }"
                                            onclick={() => goToPage(i + 1)}
                                        >
                                            {i + 1}
                                        </button>
                                    {:else if i + 1 === currentPage - 2 || i + 1 === currentPage + 2}
                                        <span class="px-1">...</span>
                                    {/if}
                                {/each}
                                
                                <button
                                    class="px-3 py-1 rounded-lg border {currentPage === totalPages ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'}"
                                    onclick={() => goToPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    {/if}
                <!-- {/if} -->
            </section>
        </main>
    </div>
{/if}