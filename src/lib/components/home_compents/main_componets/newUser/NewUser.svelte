<script lang="ts">
	import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { GetCandidatesStore } from '$houdini';
  import defaultProfile from '$lib/assets/user_images/default.jpg';
  
  // Initialize the GraphQL store
  const candidatesStore = new GetCandidatesStore();
  let candidates:any = [];
  let loading = true;
  
  // Format time difference
  function getTimeAgo(dateString:any) {
    if (!dateString) return "Recently";
    
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins} Min Ago`;
    } else {
      const diffHours = Math.floor(diffMins / 60);
      return `${diffHours} Hours Ago`;
    }
  }
  
  async function loadCandidates() {
    try {
      const result = await candidatesStore.fetch();
      
      if (result.data?.candidates?.items) {
        // Get the 5 most recent candidates
        candidates = result.data.candidates.items
          .slice(0, 5)
          .map(candidate => ({
            id: candidate.id,
            name: candidate.name || 'Anonymous',
            time: candidate.phone, // Using verified date as "joined" time
            image: defaultProfile, // Use default image since we don't have profile images
            verified: candidate.verified,
            email: candidate.email
          }));
      }
    } catch (error) {
      console.error('Error fetching candidates:', error);
    } finally {
      loading = false;
    }
  }

  function handleViewMore() {
    goto('/private/all_candidates');
  }
  
  onMount(() => {
    loadCandidates();
  });
</script>

<div class="rounded-xl pt-10">
  <div class="bg-white pt-2 pb-5 pl-5 pr-5 sm:pl-10 sm:pr-10 rounded-2xl shadow-[0_2rem_3rem_rgba(132,139,200,0.18)]
              transition-all duration-300">
    <h2 class="text-lg font-semibold mb-4">New Candidates</h2>
    
    {#if loading}
      <div class="flex justify-center py-4">
        <span class="material-icons animate-spin">refresh</span>
      </div>
    {:else}
      <div class="grid grid-cols-2 sm:flex sm:items-center sm:justify-between gap-6">
        {#each candidates as candidate}
          <div class="flex flex-col items-center">
            <div class="w-16 h-16 rounded-full overflow-hidden relative">
              <img class="w-full h-full object-cover" src={candidate.image} alt={candidate.name} />
            </div>
            <p class="mt-2 font-semibold text-gray-900 text-center">{candidate.name}</p>
            <p class="text-sm text-gray-500">{candidate.time}</p>
          </div>
        {/each}
        
        <button 
          on:click={handleViewMore}
          class="flex flex-col items-center">
          <div class="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-full">
            <span class="text-3xl text-gray-500 material-icons">visibility</span>
          </div>
          <p class="mt-2 font-semibold text-gray-900">View</p>
          <p class="text-sm text-gray-500">All Candidates</p>
        </button>
      </div>
    {/if}
  </div>
</div>
<!-- line for hover boxshadow response hover:shadow-none -->