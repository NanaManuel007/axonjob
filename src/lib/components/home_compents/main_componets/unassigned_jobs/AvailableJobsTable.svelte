<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { AllJobsStore, GetCandidatesStore } from '$houdini';
    
    // Initialize GraphQL stores
    const jobsStore = new AllJobsStore();
    const candidatesStore = new GetCandidatesStore();
    
    let availableJobs: any[] = [];
    let candidates: any[] = [];
    let loading = true;
    let selectedCandidate: any = null;
    let showAssignModal = false;
    let currentJob: any = null;
    
    async function loadData() {
      try {
        // Fetch jobs and candidates in parallel
        const [jobsResult, candidatesResult] = await Promise.all([
          jobsStore.fetch(),
          candidatesStore.fetch()
        ]);
        
        if (jobsResult.data?.jobs?.items) {
          // Filter for jobs that are not fully assigned
          availableJobs = jobsResult.data.jobs.items
            .filter(job => {
              // Check if job has fewer assignments than required roles
              return !job.assignments || 
                     job.assignments.length < (job.numberOfRoles || 1);
            })
            .map(job => ({
              id: job.id,
              jobTitle: job.title,
              company: job.client?.companyName || 'Unknown Company',
              rate: job.salaryPerAnnum ? (job.salaryPerAnnum / 12).toFixed(0) : 'N/A',
              rateType: job.paymentType || 'month',
              location: job.location,
              numberOfRoles: job.numberOfRoles,
              currentAssignments: job.assignments?.length || 0,
              clientId: job.clientId,
              clientLogo: job.client?.companyLogo || '/src/lib/assets/images/default.png'
            }));
        }
        
        if (candidatesResult.data?.candidates?.items) {
          candidates = candidatesResult.data.candidates.items;
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        loading = false;
      }
    }
    
    function openAssignModal(job: any) {
      currentJob = job;
      showAssignModal = true;
    }
    
    function closeModal() {
      showAssignModal = false;
      selectedCandidate = null;
    }
    
    async function assignJob() {
      if (!currentJob || !selectedCandidate) return;
      
      try {
        // Here you would make a GraphQL mutation to assign the job
        // For now, we'll just simulate it by removing the job from the list
        
        // In a real implementation, you would call your GraphQL mutation here
        // const result = await assignJobMutation.mutate({
        //   jobId: currentJob.id,
        //   candidateId: selectedCandidate.id
        // });
        
        // For demo purposes, just remove the job from the list if fully assigned
        const jobIndex = availableJobs.findIndex(job => job.id === currentJob.id);
        if (jobIndex !== -1) {
          const job = availableJobs[jobIndex];
          job.currentAssignments += 1;
          
          // If all roles are filled, remove the job
          if (job.currentAssignments >= job.numberOfRoles) {
            availableJobs = availableJobs.filter(j => j.id !== currentJob.id);
          } else {
            // Otherwise update the job in the list
            availableJobs[jobIndex] = { ...job };
            availableJobs = [...availableJobs];
          }
        }
        
        // Close the modal
        closeModal();
      } catch (error) {
        console.error('Error assigning job:', error);
      }
    }
    
    function handleViewMore() {
      goto('/private/all_bookings');
    }
    
    onMount(() => {
      loadData();
    });
</script>

<div class="mt-10">
  <div class="bg-white p-7 rounded-2xl shadow-[0_2rem_3rem_rgba(132,139,200,0.18)]
    transition-all duration-300">
    <h2 class="text-lg font-semibold mb-4 justify-items-start items-start">Available Jobs</h2>
    
    {#if loading}
      <div class="flex justify-center py-8">
        <span class="material-icons animate-spin">refresh</span>
      </div>
    {:else if availableJobs.length === 0}
      <div class="text-center py-8 text-gray-500">
        No available jobs found
      </div>
    {:else}
      <table class="w-full">
        <thead class="sticky top-0 left-0 bg-[#d5d1defe] px-4 text-center cursor-pointer capitalize group rounded-2xl">
          <tr>
            <th class="hidden sm:table-cell">
              <p class="h-10 bg-gray-300 opacity-60 rounded-2xl items-center pt-2 px-2 mt-2">
                Company
              </p>
            </th>
            <th>
              <p class="h-10 bg-gray-300 opacity-60 rounded-2xl items-center pt-2 px-2 mt-2">
                Position
              </p>
            </th>
            <th>
              <p class="h-10 bg-gray-300 opacity-60 rounded-2xl items-center pt-2 mr-2 ml-2 mt-2">
                Rate
              </p>
            </th>
            <!-- <th class="hidden sm:table-cell">
              <p class="h-10 bg-gray-300 opacity-60 rounded-2xl items-center pt-2 mr-2 ml-2 mt-2">
                Actions
              </p>
            </th> -->
          </tr>   
        </thead>
    
        <tbody class="mt-10">
          {#each availableJobs as job,i}
          <tr class={` ${i % 2 === 0 ? "bg-black/[0.03]" : "bg-white"}`}>
            <td class="hidden sm:table-cell px-6">
              <div class="flex items-center gap-3 justify-start  ">
                <div class="w-10 h-10 rounded-full bg-gray-100 overflow-hidden my-3 items-center justify-center">
                  {#if job.clientLogo}
                    <img src={job.clientLogo} alt={job.company} class="w-full h-full object-cover">
                  {:else}
                    <span class="material-icons-sharp text-gray-400 flex items-center justify-center">business</span>
                  {/if}
                </div>
                <span>{job.company}</span>
              </div>
            </td>
            <td class="px-6">
              <div class="space-y-1">
                <p>{job.jobTitle}</p>
                <p class="text-sm text-gray-500">{job.location}</p>
              </div>
            </td>
            <td>${job.rate}/{job.rateType}</td>
            <!-- <td class="hidden sm:table-cell">
              <div class="flex justify-center gap-4">
                <span 
                  class="material-icons-sharp text-green-600 cursor-pointer bg-green-100 p-1.5 rounded-3xl hover:bg-green-200 transition-colors"
                  on:click={() => openAssignModal(job)}
                >
                  person_add
                </span>
                <span class="material-icons-sharp text-gray-600 cursor-pointer bg-gray-100 p-1.5 rounded-3xl hover:bg-gray-200 transition-colors">visibility</span>
              </div>
            </td> -->
          </tr>
          {/each}
        </tbody>
      </table>
    {/if}
    
    <div class="flex justify-center mt-4">
      <button 
        class="text-gray-600 hover:text-gray-800 flex items-center gap-2 text-sm font-medium transition-colors justify-center"
        on:click={handleViewMore}
      >
        View all jobs
        <span class="material-icons-sharp text-sm">arrow_forward</span>
      </button>
    </div>
  </div>
</div>

<!-- Assignment Modal -->
{#if showAssignModal}
<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div class="bg-white rounded-lg p-6 w-full max-w-md">
    <h3 class="text-lg font-semibold mb-4">Assign Job: {currentJob?.jobTitle}</h3>
    
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">Select Candidate</label>
      <select 
        class="w-full p-2 border border-gray-300 rounded-md"
        bind:value={selectedCandidate}
      >
        <option value={null}>-- Select a candidate --</option>
        {#each candidates as candidate}
          <option value={candidate}>{candidate.name} ({candidate.email})</option>
        {/each}
      </select>
    </div>
    
    <div class="text-sm mb-4">
      <p>Roles: {currentJob?.currentAssignments || 0} of {currentJob?.numberOfRoles || 1} assigned</p>
    </div>
    
    <div class="flex justify-end gap-2">
      <button 
        class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        on:click={closeModal}
      >
        Cancel
      </button>
      <button 
        class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        on:click={assignJob}
        disabled={!selectedCandidate}
      >
        Assign
      </button>
    </div>
  </div>
</div>
{/if}