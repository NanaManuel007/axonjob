<script lang="ts">
    import { goto } from '$app/navigation';
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100">
    <div class="text-center">
        <div class="relative">
            <h1 class="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                404
            </h1>
            <p class="text-2xl font-semibold text-gray-600 mt-4">Oops! Page not found</p>
            <p class="text-gray-500 mt-2 mb-6">The page you're looking for doesn't seem to exist.</p>
        </div>
        
        <div class="relative animate-bounce mt-4">
            <svg class="mx-auto h-12 w-12 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
        </div>

        <div class="mt-8">
            <button 
                onclick={() => goto('/')}
                class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-purple-600 transition duration-300 ease-in-out transform hover:-translate-y-1">
                Back to Home
            </button>
        </div>
    </div>
</div>