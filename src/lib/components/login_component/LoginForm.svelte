<script lang="ts">
  import SocialIcons from './SocialIcons.svelte';
  import Toast from './Toast.svelte';
  import { AuthService } from '$services/auth_services/authServices';
  import { z } from 'zod';
  const { isActive } = $props<{ isActive: boolean }>();

  interface FormErrors {
    email: string;
    password: string;
  }

  let email = $state<string>('');
  let password = $state<string>('');
  let showToast = $state<boolean>(false);
  let toastMessage = $state<string>('');
  let isLoading = $state<boolean>(false);
  let errors = $state<FormErrors>({ email: '', password: '' });

  const loginSchema = z.object({
    email: z.string()
      .email('Please enter a valid email address')
      .min(1, 'Email is required'),
    password: z.string()
      .min(6, 'Password must be at least 6 characters')
      .max(50, 'Password is too long')
  });

  function validateForm() {
    errors = { email: '', password: '' };
    try {
      loginSchema.parse({ email, password });
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          if (err.path[0] === 'email') errors.email = err.message;
          if (err.path[0] === 'password') errors.password = err.message;
        });
      }
      return false;
    }
  }

  async function handleSubmit() {
    if (!validateForm()) {
      toastMessage = 'Please fix the validation errors';
      showToast = true;
      setTimeout(() => showToast = false, 3000);
      return;
    }

    try {
      isLoading = true;
      const response = await AuthService.login(email, password);
      
      if (!response.success) {
        toastMessage = response.message || 'Invalid email or password';
        showToast = true;
        setTimeout(() => showToast = false, 3000);
      }
    } catch (error) {
      toastMessage = 'An error occurred during login';
      showToast = true;
      setTimeout(() => showToast = false, 3000);
    } finally {
      isLoading = false;
    }
  }
</script>

<Toast message={toastMessage} show={showToast} />

<div class="absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 z-2" 
     class:translate-x-full={isActive}>
  <form class="bg-white flex flex-col items-center justify-center h-full px-10" onsubmit={e => { e.preventDefault(); handleSubmit(); }}>
    <h1 class="text-2xl font-bold mb-4">Sign In</h1>
    <!-- <SocialIcons />
    <span class="text-sm mb-4">or use your email password</span> -->
    <div class="w-full">
      <input 
        type="email" 
        placeholder="Email" 
        bind:value={email}
        class="bg-[#eee] border-none my-2 px-4 py-2 text-sm rounded-lg w-full outline-none"
        disabled={isLoading}
      >
      {#if errors.email}
        <p class="text-red-500 text-xs mt-1">{errors.email}</p>
      {/if}
    </div>
    <div class="w-full">
      <input 
        type="password" 
        placeholder="Password" 
        bind:value={password}
        class="bg-[#eee] border-none my-2 px-4 py-2 text-sm rounded-lg w-full outline-none"
        disabled={isLoading}
      >
      {#if errors.password}
        <p class="text-red-500 text-xs mt-1">{errors.password}</p>
      {/if}
    </div>
    <!-- <a href="/" class="text-sm text-gray-700 no-underline my-4">Forget Your Password?</a> -->
    <button 
      type="submit" 
      class="bg-[#512da8] text-white text-sm px-11 py-2.5 border border-transparent rounded-lg font-semibold tracking-wider uppercase mt-2.5 cursor-pointer flex items-center justify-center min-w-[160px]"
      disabled={isLoading}
    >
      {#if isLoading}
        <svg class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
      {/if}
      {isLoading ? 'Signing In...' : 'Sign In'}
    </button>
  </form>
</div>