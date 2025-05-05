<script>
  import { scale, fade } from 'svelte/transition';
  export let show = false;
  export let message = '';
  export let type = 'error';

  const close = () => {
    show = false;
  };
</script>

{#if show}
  <div class="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] px-4 w-full max-w-sm" 
       transition:fade={{ duration: 200 }}>
    <div class="bg-white rounded-xl shadow-xl relative z-10"
         transition:scale={{ duration: 300, start: 0.95, opacity: 0 }}>
      <div class="p-6">
        <div class="flex items-center gap-3 mb-4">
          {#if type === 'error'}
            <div class="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
          {/if}
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Validation Error</h3>
            <p class="text-gray-600 mt-1">{message}</p>
          </div>
        </div>
        
        <div class="mt-6 flex justify-end">
          <button
            on:click={close}
            class="px-4 py-2 bg-[#512da8] text-white rounded-lg text-sm font-medium hover:bg-[#4527a0] transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}