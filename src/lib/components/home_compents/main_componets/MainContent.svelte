<script lang="ts">
  import AnalyticsCard from './analytics/AnalyticsCard.svelte';
  import NewUser from './newUser/NewUser.svelte';
  import OrderTable from './unassigned_jobs/AvailableJobsTable.svelte';
  import Reminder from "$lib/components/home_compents/incoming_approvals/IncomingApprovals.svelte";
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { authStore } from '$lib/stores/authStore/authStore';
  
  let mounted = false;

  onMount(() => {
    mounted = true;
  });
  
  // Check if user has permission to see analytics
  $: hasAnalyticsPermission = $authStore.user?.permissions?.includes('ReadPermissions') || false;
</script>

{#if mounted}
<main class="p-6" in:fade={{ duration: 1000 }}>
    <div class="grid grid-cols-12 gap-20">
        <div class="col-span-8 pl-10">
            {#if hasAnalyticsPermission}
                <AnalyticsCard/>
            {/if}
            <NewUser />
            <div class="mt-8">
                <OrderTable/>
            </div>
        </div>
        <!-- {#if hasAnalyticsPermission} -->
        <div class="col-span-4 pr-10" 
        in:fly={{ duration: 1000, delay: 300, x: 200 }}>
       <Reminder/>
     
   </div>
   <!-- {/if} -->
     
    </div>
</main>
{/if}