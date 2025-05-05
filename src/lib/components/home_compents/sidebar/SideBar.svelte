
<script lang="ts">
  import SideBarItems from './SideBarItems.svelte';
  import { page } from '$app/stores';
import { writable } from 'svelte/store';
import { AuthService } from '$services/auth_services/authServices';
import { authStore } from '$lib/stores/authStore/authStore';
export const isOpen = writable(true);
let hasPermission = $state(false);
$effect(() => {
    hasPermission = $authStore.user?.permissions?.includes('ReadPermissions') || false;
  });
async function handleLogout() {
    await AuthService.logout();
 
  }
  type MenuItem = {
    icon: string;
    title: string;
    href: string;
    isActive?: boolean;
    onClick?: () => Promise<void>;
  };
  let menuItems = $state<MenuItem[]>([]);

  $effect(() => {
    menuItems = [
      { icon: 'dashboard', title: 'Dashboard', href: '/private/home', isActive: true },
      { icon: 'groups', title: 'Clients', href: '/private/all_clients' },
      { icon: 'person_outline', title: 'Candidates', href: '/private/all_candidates' },
      { icon: 'receipt_long', title: 'All Jobs', href: '/private/all_applications' },
      // { icon: 'add', title: 'All Jobs', href: '/private/all_users' },
      ...(hasPermission ? [{ icon: 'add', title: 'Add New User', href: '/private/all_users' }] : []),
      { icon: 'logout', title: 'Logout', href: '/logout', onClick: handleLogout }
    ];
  });

  let currentPath = $state('');

  $effect(() => {
    currentPath = $page.url.pathname;
  });

  function toggleSidebar() {
        isOpen.update(value => !value);
    }
</script>


<aside class="h-screen fixed left-0 top-0 z-50 transition-all duration-300"
    class:w-72={$isOpen}
    class:w-25={!$isOpen}>
    <div class="flex items-center justify-between mt-5 px-4">
        {#if $isOpen}
            <div class="flex gap-2">
                <h1 class=" text-2xl font-semibold text-[#000000]">
                    Ax<span class="text-[#450a9c]">on</span>
                </h1>
            </div>
        {/if}
        <button 
            class="pr-4 cursor-pointer"
            on:click={toggleSidebar}
        >
            <span class="material-icons-sharp">
                {$isOpen ? 'close' : 'menu'}
            </span>
        </button>
    </div>
    <div class="flex flex-col bg-white shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] 
                transition-all duration-300 rounded-[15px] h-[88vh] relative top-6 mx-4 px-6">
        {#each menuItems as item}
            <SideBarItems {...item} isActive={currentPath === item.href} isOpen={$isOpen} />
        {/each}
    </div>
</aside>

<main class="transition-all duration-300"
    class:ml-72={$isOpen}
    class:ml-20={!$isOpen}>
    <slot />
</main>