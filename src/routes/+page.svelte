<script>
  import { fade, slide } from 'svelte/transition'; 
import { authStore } from '$lib/stores/authStore/authStore';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
	import LoginForm from '$lib/components/login_component/LoginForm.svelte';
	import TogglePanel from '$lib/components/login_component/TogglePanel.svelte';

    let mounted = false;
    let isActive = false;
    
    const toggleActive = () => {
      isActive = !isActive;
    };
    onMount(() => {
      mounted = true;
      authStore.subscribe(({ isAuthenticated }) => {
            if (isAuthenticated) {
                goto('/private/home');
            }
        });
    });
  </script>
  {#if mounted}
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff]"
         in:fade={{ duration: 1000, delay: 200 }}>
      <div class="bg-white rounded-[30px] shadow-lg relative overflow-hidden w-[768px] max-w-full min-h-[480px]" 
           class:active={isActive}
           in:slide={{ duration: 1000, delay: 300 }}>
        <LoginForm {isActive} />
        <TogglePanel {isActive} on:toggle={toggleActive} />
      </div>
    </div>
  {/if}