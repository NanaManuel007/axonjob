<script lang="ts">
    import type { Customer } from '$lib/stores/allClientsStore/allClients.type';
    import SearchBar from '$lib/components/all_clients/SearchBar.svelte';
    import CustomTable from '$lib/components/all_clients/CustomTable.svelte';
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';

    let mounted = false;
    let searchTerm = '';

    onMount(() => {
        mounted = true;
    });
</script>

{#if mounted}
<div class="pt-10 pr-10 pl-10">
    <main class="bg-white rounded-2xl shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] transition-all duration-300 flex justify-between items-center" in:fade={{ duration: 1000 }}>
        <section class="w-full overflow-hidden">
            <div class="w-full h-[10%] bg-white/25 p-3 flex items-center">
                <h1 class="text-5xl font-semibold pl-10">Clients</h1>
                <div class="flex-grow"></div>
                <div class="flex items-center gap-4">
                    <SearchBar bind:searchTerm />
                </div>
            </div>
            <CustomTable 
                {searchTerm}
            />
        </section>
    </main>
</div>
{/if}