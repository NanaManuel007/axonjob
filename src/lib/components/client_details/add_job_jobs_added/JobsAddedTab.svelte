<script lang="ts">
  import { fly } from "svelte/transition";
  import AddJobDialog from "./AddJobDialog.svelte";
  import ManageCandidateDialog from "./manage_candidate_dialog/ManageCandidateDialog.svelte";
  import { DeleteJobStore, GetClientJobsStore } from "$houdini";
  import { createEventDispatcher } from "svelte";

  let showAddJobDialog = $state(false);
  let searchQuery = $state("");
  let selectedJobType = $state("all");
  let selectedStatus = $state("all");
  let currentPage = $state(1);
  let hasNextPage = $state(false);
  let hasPreviousPage = $state(false);
  let pageSizeOptions = [10, 20, 50, 100];
  let selectedPageSize = $state(20);
  let totalCount = $state(0);
  let filteredJobs = $state<Job[]>([]);
  const { clientId } = $props<{ clientId: number }>();
  const clientJobsStore = new GetClientJobsStore();
  const clientJobsData = $derived(clientJobsStore);
  let isLoading = $state(false);
  let error = $state<string | null>(null);
  let isEditMode = $state(false);
  let jobToEdit = $state<Job | null>(null);
  let showDeleteDialog = $state(false);
  let jobToDelete = $state<Job | null>(null);
  const deleteJobStore = new DeleteJobStore();

  async function confirmDeleteJob() {
    if (!jobToDelete) return;

    try {
      isLoading = true;
      error = null;
      
      console.log("Attempting to delete job:", jobToDelete);

      const result = await deleteJobStore.mutate({
        id: jobToDelete.id,
      });
      
      console.log("Delete job response:", result);
      console.log("Delete job success:", result.data?.deleteJob?.success);
      console.log("Delete job message:", result.data?.deleteJob?.message);

      if (result.errors && result.errors.length > 0) {
        throw new Error(result.errors[0].message);
      }

      // Close the dialog and refresh jobs
      showDeleteDialog = false;
      jobToDelete = null;
      fetchJobs();
    } catch (err) {
      error = err instanceof Error ? err.message : "Failed to delete job";
      console.error("Delete error:", err);
    } finally {
      isLoading = false;
    }
  }

  // edit functions
  function handleEditJob(job: Job) {
    jobToEdit = job;
    isEditMode = true;
    showAddJobDialog = true;
  }

  // update Jobs function
  function handleJobSaved() {
    fetchJobs();
  }

  function handleAddedJob() {
    fetchJobs();
  }

  // Function to handle adding a new job - ensures form is cleared
  function handleAddNewJob() {
    isEditMode = false;
    jobToEdit = null;
    showAddJobDialog = true;
  }
  const dispatch = createEventDispatcher();

  // Function to fetch job
  const fetchJobs = async () => {
    try {
      console.log("Fetching data...");
      isLoading = true;
      error = null;

      const result: any = await clientJobsStore.fetch({
        variables: {
          skip: (currentPage - 1) * selectedPageSize,
          take: selectedPageSize,
          filter: {
            and: [
              { clientId: { eq: clientId } },
              {
                or: [
                  ...(searchQuery
                    ? [
                        { title: { contains: searchQuery } },
                        { location: { contains: searchQuery } },
                      ]
                    : []),
                ],
              },
            ],
          },
        },
      });

      if (result.errors && result.errors.length > 0) {
        throw new Error(result.errors[0].message);
      }

      console.log("Fetched data:", result.data);
    } catch (err) {
      error = err instanceof Error ? err.message : "Failed to fetch jobs";
      console.error("Fetch error:", err);
    } finally {
      isLoading = false;
    }
  };

  $effect(() => {
    fetchJobs();
  });

  $effect(() => {
    if ($clientJobsData.data?.jobs) {
      totalCount = $clientJobsData.data.jobs.totalCount;
      hasNextPage = currentPage * selectedPageSize < totalCount;
      hasPreviousPage = currentPage > 1;

      filteredJobs =
        $clientJobsData.data.jobs.items?.map((job) => ({
          ...job,
          candidates: job.assignments?.length || 0,
          datePosted: new Date(job.createdAt).toLocaleDateString(),
          assignedCandidates:
            job.assignments?.map((assignment) => ({
              id: assignment.candidate.id,
              name: assignment.candidate.name,
              email: assignment.candidate.email,
              status: assignment.status,
            })) || [],
        })) || [];
    }
  });
  function openAddJobDialog() {
    isEditMode = false;
    jobToEdit = null;
    showAddJobDialog = true;
  }

  function openEditJobDialog(job: any) {
    isEditMode = true;
    jobToEdit = job;
    showAddJobDialog = true;
  }

  let debounceTimer: NodeJS.Timeout;

  $effect(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      currentPage = 1;
      fetchJobs();
    }, 300);
    return () => clearTimeout(debounceTimer);
  });

  $effect(() => {
    if (currentPage !== 1) {
      currentPage = 1;
    }
    fetchJobs();
  });

  function goToPage(page: number) {
    currentPage = page;
    void fetchJobs();
  }

  let showCandidatesDialog = $state(false);
  let selectedJob = $state<any>(null);

  function handleManageCandidates(job: any) {
    selectedJob = job;
    showCandidatesDialog = true;
  }

  interface Candidate {
    id: number;
    name: string;
    email: string;
    status: string;
  }

  interface Job {
    id: number;
    title: string;
    location: string;
    status: string;
    candidates: number;
    datePosted: string;
    jobType: string;
    assignedCandidates?: Candidate[];
  }

  const getJobTypeColor = (type: string) => {
    return type === "Permanent"
      ? "bg-gray-100 text-gray-700"
      : "bg-gray-100 text-gray-700";
  };
  function handleDeleteJob(job: Job) {
    jobToDelete = job;
    showDeleteDialog = true;
  }
  function handleAddCandidate(
    event: CustomEvent<{ jobId: string; candidate: Candidate }>
  ) {
    const { jobId, candidate } = event.detail;

    // Find the job in the filteredJobs array
    const jobIndex = filteredJobs.findIndex(
      (job) => job.id.toString() === jobId
    );

    if (jobIndex !== -1) {
      // Create a copy of the job
      const updatedJob = { ...filteredJobs[jobIndex] };

      // Add the candidate to the assignedCandidates array if it exists
      if (!updatedJob.assignedCandidates) {
        updatedJob.assignedCandidates = [];
      }
      // Function to handle delete job button click

      // Add the candidate
      updatedJob.assignedCandidates.push({
        id: candidate.id,
        name: candidate.name,
        email: candidate.email,
        status: "Active",
      });

      // Update the candidates count
      updatedJob.candidates = updatedJob.assignedCandidates.length;

      // Update the filteredJobs array
      filteredJobs[jobIndex] = updatedJob;
      filteredJobs = [...filteredJobs]; // Trigger reactivity
    }

    // Refresh the jobs data to ensure consistency with the server
    fetchJobs();
  }

  function handleRemoveCandidate(
    event: CustomEvent<{ jobId: string; candidateId: number }>
  ) {
    const { jobId, candidateId } = event.detail;

    // Find the job in the filteredJobs array
    const jobIndex = filteredJobs.findIndex(
      (job) => job.id.toString() === jobId
    );

    if (jobIndex !== -1) {
      // Create a copy of the job
      const updatedJob = { ...filteredJobs[jobIndex] };

      // Remove the candidate from the assignedCandidates array if it exists
      if (updatedJob.assignedCandidates) {
        updatedJob.assignedCandidates = updatedJob.assignedCandidates.filter(
          (candidate) => candidate.id !== candidateId
        );

        // Update the candidates count
        updatedJob.candidates = updatedJob.assignedCandidates.length;

        // Update the filteredJobs array
        filteredJobs[jobIndex] = updatedJob;
        filteredJobs = [...filteredJobs]; // Trigger reactivity
      }
    }

    // Refresh the jobs data to ensure consistency with the server
    fetchJobs();
  }
</script>

<div class="space-y-6">
  {#if error}
    <div
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <span class="block sm:inline">Error: {error}</span>
    </div>
  {/if}

  <div class="flex justify-between items-center mb-8">
    <h2 class="text-2xl font-bold text-gray-800">Jobs Added</h2>
    <button
      class="bg-gray-500 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-gray-600 transition-all duration-300 hover:scale-105 shadow-md"
      on:click|stopPropagation={handleAddNewJob}
    >
      <span class="material-icons-sharp">add_circle</span>
      <span>Add New Job</span>
    </button>
  </div>

  <!-- Search and Filter Section -->
  <div class="bg-white p-6 rounded-[15px] shadow-sm space-y-4">
    <div class="flex gap-4 items-center">
      <!-- Search Bar -->
      <div class="flex-1 relative">
        <span
          class="material-icons-sharp absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          >search</span
        >
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search jobs..."
          class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all"
        />
      </div>

      <!-- Job Type Filter -->
      <!-- <div class="min-w-[200px]">
        <select
          bind:value={selectedJobType}
          class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all"
        >
          <option value="all">All Job Types</option>
          <option value="Permanent">Permanent</option>
          <option value="Temporary">Temporary</option>
        </select>
      </div> -->

      <!-- Status Filter -->
      <!-- <div class="min-w-[200px]">
        <select
          bind:value={selectedStatus}
          class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all"
        >
          <option value="all">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Closed">Closed</option>
        </select>
      </div> -->
    </div>
  </div>

  {#if showDeleteDialog && jobToDelete}
  <div
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div
      class="bg-white rounded-lg p-6 max-w-md w-full shadow-xl"
      in:fly={{ y: 20, duration: 300 }}
    >
      <h3 class="text-xl font-bold text-gray-800 mb-4">Confirm Delete</h3>
      <p class="text-gray-600 mb-6">
        Are you sure you want to delete the job "<span class="font-semibold"
          >{jobToDelete.title}</span
        >" located at "<span class="font-semibold"
          >{jobToDelete.location}</span
        >"? This action cannot be undone.
      </p>

      <div class="flex justify-end gap-3">
        <button
          on:click={() => (showDeleteDialog = false)}
          class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          on:click={confirmDeleteJob}
          class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
{/if}

  {#if isLoading}
    <div
      class="bg-white shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] rounded-[15px] p-6"
    >
      <div class="flex justify-center py-4">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"
        ></div>
      </div>
    </div>
  {:else}
    <div
      class="bg-white shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] rounded-[15px] overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50">
              <th
                class="px-6 py-4 text-left text-sm font-semibold text-gray-600"
                >Job Title</th
              >
              <th
                class="px-6 py-4 text-left text-sm font-semibold text-gray-600"
                >Location</th
              >
              <th
                class="px-6 py-4 text-left text-sm font-semibold text-gray-600"
                >Job Type</th
              >
              <th
                class="px-6 py-4 text-left text-sm font-semibold text-gray-600"
                >Status</th
              >
              <th
                class="px-6 py-4 text-left text-sm font-semibold text-gray-600"
                >Candidates</th
              >
              <th
                class="px-6 py-4 text-left text-sm font-semibold text-gray-600"
                >Posted Date</th
              >
              <th
                class="px-6 py-4 text-left text-sm font-semibold text-gray-600"
                >Actions</th
              >
            </tr>
          </thead>
          <tbody>
            {#each filteredJobs as job, i}
              <tr
                class="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                in:fly|local={{ y: 20, duration: 300, delay: i * 100 }}
              >
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <span class="material-icons-sharp text-gray-400 mr-2"
                      >work</span
                    >
                    <span class="font-medium text-gray-800">{job.title}</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-gray-600">{job.location}</td>
                <td class="px-6 py-4">
                  <div class="flex flex-col gap-2">
                    <span
                      class="px-3 py-1 rounded-full text-sm font-medium inline-block w-fit
                                            {getJobTypeColor(job.jobType)}"
                    >
                      {job.jobType}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span
                    class="px-3 py-1 rounded-full text-sm font-medium
                                        {job.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'}"
                  >
                    {job.status}
                  </span>
                </td>
                <td class="px-6 py-4">
                  {#if job.candidates > 0}
                    <button
                      class="flex items-center gap-2 text-gray-500 hover:text-gray-700"
                      on:click={() => handleManageCandidates(job)}
                    >
                      <span class="material-icons-sharp">groups</span>
                      <span class="font-medium">{job.candidates}</span>
                    </button>
                  {:else}
                    <button
                      class="text-gray-500 font-medium flex items-center gap-1 hover:text-gray-700"
                      on:click={() => handleManageCandidates(job)}
                    >
                      <span class="material-icons-sharp text-sm"
                        >person_add</span
                      >
                      Assign Candidates
                    </button>
                  {/if}
                </td>
                <td class="px-6 py-4 text-gray-600">{job.datePosted}</td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                    <button
                      on:click={() => handleEditJob(job)}
                      class="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <span class="material-icons-sharp text-gray-600"
                        >edit</span
                      >
                    </button>
                    <button
                      on:click={() => handleDeleteJob(job)}
                      class="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <span class="material-icons-sharp text-gray-600"
                        >delete</span
                      >
                    </button>
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>

        <div class="flex items-center justify-between px-6 py-4 border-t">
          <div class="flex items-center gap-4">
            <div class="text-sm text-gray-600">
              Showing {(currentPage - 1) * selectedPageSize + 1} to {Math.min(
                currentPage * selectedPageSize,
                totalCount
              )} of {totalCount} entries
            </div>

            <!-- Page size selector -->
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-600">Show</span>
              <select
                bind:value={selectedPageSize}
                class="px-2 py-1 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all"
              >
                {#each pageSizeOptions as size}
                  <option value={size}>{size}</option>
                {/each}
              </select>
              <span class="text-sm text-gray-600">entries</span>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button
              class="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!hasPreviousPage}
              on:click={() => goToPage(currentPage - 1)}
            >
              <span class="material-icons-sharp">chevron_left</span>
            </button>

            <button
              class="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!hasNextPage}
              on:click={() => goToPage(currentPage + 1)}
            >
              <span class="material-icons-sharp">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}

  {#if showAddJobDialog}
    <AddJobDialog
      {clientId}
      showDialog={showAddJobDialog}
      {isEditMode}
      {jobToEdit}
      on:closeDialog={() => (showAddJobDialog = false)}
      on:jobAdded={handleAddedJob}
      on:jobUpdated={handleJobSaved}
    />
  {/if}

  <ManageCandidateDialog
    showDialog={showCandidatesDialog}
    {clientId}
    jobId={selectedJob?.id}
    jobTitle={selectedJob?.title || ""}
    currentCandidates={selectedJob?.assignedCandidates || []}
    on:addCandidate={handleAddCandidate}
    on:removeCandidate={handleRemoveCandidate}
    on:close={() => (showCandidatesDialog = false)}
  />
</div>
