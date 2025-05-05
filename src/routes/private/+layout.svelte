<!-- <script lang="ts">
	import { goto } from '$app/navigation';


    import SideBar from '$lib/components/home_compents/sidebar/SideBar.svelte';
	import { auth } from '$lib/stores/authStore/authStore';
    import {darkMode} from "$services/home/stores/darkMode";
	import { onMount } from 'svelte';
    $: darkModeClass = $darkMode ? 'dark':"";

    
    onMount(() => {
        auth.initialize();
        auth.subscribe(({ isAuthenticatedn }) => {
            if (!isAuthenticatedn) {
                goto('/');
            }
        });
    });
</script> -->
<!-- {#if $auth.isAuthenticatedn} -->
    <!-- <div class="flex">
        <SideBar />
        <div class="flex-1">
            <slot />
        </div>
    </div> -->
<!-- {/if} -->

<script lang="ts">
    import { goto } from '$app/navigation';
    import SideBar from '$lib/components/home_compents/sidebar/SideBar.svelte';
    import { authStore, unauthorizedMsg } from '$lib/stores/authStore/authStore';
    import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  $: if ($unauthorizedMsg === "Unauthorized") {
        authStore.logout();
        goto('/');
  }

    onMount(() => {
        if (!$authStore.isAuthenticated) {
            goto('/');
        }
    });
</script>

{#if $authStore.isAuthenticated}
    <div class="flex">
        <SideBar />
        <div class="flex-1">
            <slot />
        </div>
    </div>
{:else}
<div class="flex items-center justify-center h-screen">
    <div class="flex flex-col justify-center items-center h-64" in:fade={{ duration: 300 }}>
        <div class="relative w-24 h-24">
            <div class="absolute top-0 left-0 right-0 bottom-0 animate-pulse bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-75"></div>
            <div class="absolute top-1 left-1 right-1 bottom-1 bg-white rounded-full"></div>
            <div class="absolute top-3 left-3 right-3 bottom-3 animate-spin">
                <div class="h-full w-full border-4 border-t-blue-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full"></div>
            </div>
            <div class="absolute inset-0 flex items-center justify-center">
                <svg class="w-8 h-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            </div>
        </div>
        <p class="mt-4 text-gray-600 font-medium animate-pulse">Please wait...</p>
    </div>
</div>
{/if}



              