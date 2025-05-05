<script lang="ts">
  import { fade } from 'svelte/transition';
  import Toast from '../../general_components/Toast.svelte';
  import InputComponent from '../../general_components/InputField.svelte';
  import { AddNewUserStore, AllUserStore, AllRolesStore, UpdateUserStore, } from '$houdini';
  import { onMount, createEventDispatcher } from 'svelte';
  import { initialJobData } from '$lib/components/client_details/add_details_types/job.constants';

  // Event dispatcher for dialog actions
  const dispatch = createEventDispatcher();

  // Initialize the stores
  const addUserStore = new AddNewUserStore();
  const updateUserStore = new UpdateUserStore();
  const allUsersStore = new AllUserStore();
  const allRolesStore = new AllRolesStore();
//   const deleteUserStore = new DeleteUserStore();

  // State variables - initialize with empty values
  let email = $state('');
  let password = $state('');
  let confirmPassword = $state('');
  let selectedRoleId = $state<number | null>(null);
  let selectedUserId = $state<number | null>(null);
  let isEditing = $state(false);
  let isActive = $state(true);

  // Toast state
  let showToast = $state(false);
  let toastMessage = $state('');
  let toastType = $state<'success' | 'error'>('success');

  // Delete confirmation modal
  let showDeleteModal = $state(false);
  let userToDelete = $state<{id: number, email: string} | null>(null);
  
  // Loading states
  let isSaving = $state(false);
  let isDeleting = $state(false);
  
  const { isOpen = $bindable(false) } = $props<{ 
    isOpen: boolean, 
  }>();
  function initializeDialog() {
    resetForm();
    allRolesStore.fetch();
  }
  // Reset form when dialog opens or closes
  $effect(() => {
    if (isOpen) {
      // Explicitly reset all form fields
      initializeDialog();
      // Fetch users and roles when dialog opens
    //   allUsersStore.fetch();
      allRolesStore.fetch();
    }
  });

  // Close the dialog
  function closeDialog() {
    // Explicitly reset form fields before closing
    email = '';
    password = '';
    confirmPassword = '';
    selectedRoleId = null;
    selectedUserId = null;
    isEditing = false;
    isActive = true;
    
    dispatch('close');
  }

  function showSuccessToast(message: string) {
    toastMessage = message;
    toastType = 'success';
    showToast = true;
    setTimeout(() => showToast = false, 3000);
  }

  function showErrorToast(message: string) {
    toastMessage = message;
    toastType = 'error';
    showToast = true;
    setTimeout(() => showToast = false, 3000);
  }
     //   allUsersStore.fetch();
    //  allRolesStore.fetch();

    function resetForm() {
    email = '';
    password = '';
    confirmPassword = '';
    selectedRoleId = null;
    selectedUserId = null;
    isEditing = false;
    isActive = true;
    showDeleteModal = false;
    userToDelete = null;
  }


  function selectUser(user: any) {
    if (!user || user === null) return;
    
    selectedUserId = user.id || null;
    email = user.email || '';
    isActive = (user as any).isActive !== false;
    
    // Get role from the user data
    if (user.role && user.role.id) {
      selectedRoleId = user.role.id;
    } else {
      selectedRoleId = null;
    }
    
    // Clear password fields when editing
    password = '';
    confirmPassword = '';
    
    isEditing = true;
  }
  
  function confirmDeleteUser(user: any, event: Event) {
    // Prevent the click from propagating to the parent (which would select the user)
    event.stopPropagation();
    
    if (!user || !user.id || !user.email) return;
    
    userToDelete = { id: user.id, email: user.email };
    showDeleteModal = true;
  }

//   async function handleDeleteUser() {
//     if (!userToDelete) return;
    
//     try {
//       isDeleting = true;
//       const result = await deleteUserStore.mutate({
//         input: {
//           id: userToDelete.id
//         }
//       });
      
//       if (result.data?.deleteUser?.success) {
//         showSuccessToast(result.data.deleteUser.message || 'User deleted successfully');
        
//         // If the deleted user was selected, reset the form
//         if (selectedUserId === userToDelete.id) {
//           resetForm();
//         }
        
//         // Refresh the users list
//         allUsersStore.fetch();
//       } else {
//         const errorMessage = result.data?.deleteUser?.message || 'Failed to delete user';
//         showErrorToast(errorMessage);
//       }
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       showErrorToast('An error occurred while deleting the user');
//     } finally {
//       // Close the modal
//       showDeleteModal = false;
//       userToDelete = null;
//       isDeleting = false;
//     }
//   }
  
  async function handleSaveUser() {
    // Validate form
    if (!email.trim()) {
      showErrorToast('Email is required');
      return;
    }
    
    if (!isEditing && !password.trim()) {
      showErrorToast('Password is required for new users');
      return;
    }
    
    if (!isEditing && password !== confirmPassword) {
      showErrorToast('Passwords do not match');
      return;
    }
    
    if (!selectedRoleId) {
      showErrorToast('Please select a role');
      return;
    }

    try {
      isSaving = true;
      let result;
      
      if (isEditing && selectedUserId) {
        // Update existing user
        const updateInput: any = {
          email: email.trim(),
          roleId: selectedRoleId,
          isActive: isActive
        };
        
        // Only include password if it was changed
        if (password.trim()) {
          if (password !== confirmPassword) {
            showErrorToast('Passwords do not match');
            isSaving = false;
            return;
          }
          updateInput.password = password.trim();
        }
        
        // Fixed mutation structure to match the expected format
        result = await updateUserStore.mutate({
          id: selectedUserId,
          input: updateInput
        });
        
        if (result.data?.updateUser?.success) {
          showSuccessToast(result.data.updateUser.message || 'User updated successfully');
          resetForm();
          // Refresh the users list
          allUsersStore.fetch();
        } else {
          const errorMessage = result.data?.updateUser?.message || 'Failed to update user';
          showErrorToast(errorMessage);
        }
      } else {
        // Create new user
        result = await addUserStore.mutate({
          input: {
            input: {
              email: email.trim(),
              password: password.trim(),
              roleId: selectedRoleId
            }
          }
        });
        
        if (result.data?.createUser?.success) {
          showSuccessToast(result.data.createUser.message || 'User created successfully');
          resetForm();
          // Refresh the users list
          allUsersStore.fetch();
        } else {
          const errorMessage = result.data?.createUser?.message || 'Failed to create user';
          showErrorToast(errorMessage);
        }
      }
    } catch (error) {
      console.error('Error saving user:', error);
      showErrorToast('An error occurred while saving the user');
    } finally {
      isSaving = false;
    }
  }

  $effect(() => {
  // The effect will automatically track email and password changes
  if (!email && !password) {
    isEditing = false;
  }
});
</script>

<Toast 
  show={showToast}
  message={toastMessage}
  type={toastType}
/>

{#if isOpen}
  <div class="fixed inset-0 bg-gray-900/5 backdrop-blur-[2px] flex items-center justify-center z-50" transition:fade={{ duration: 200 }}>
    <!-- Delete Confirmation Modal -->
  
      <div class="bg-white rounded-lg shadow-md overflow-hidden max-w-5xl w-full mx-4 max-h-[90vh] flex flex-col">
        <div class="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 class="text-2xl font-semibold text-gray-800">User Management</h2>
          <button 
            class="text-gray-500 hover:text-gray-700"
            on:click={closeDialog}
            aria-label="Close dialog"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-auto">
          <div class="flex flex-col md:flex-row">
            <!-- Users List (Left Side) -->
            <div class="w-full md:w-1/2 p-6 border-r border-gray-200">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-medium text-gray-700">Available Users</h3>
              </div>

              {#if $allUsersStore.fetching}
                <div class="py-4 text-center text-gray-500">Loading users...</div>
              {:else if $allUsersStore.errors}
                <div class="py-4 text-center text-red-500">
                  Error loading users: {$allUsersStore.errors[0]?.message || 'Unknown error'}
                </div>
              {:else if !$allUsersStore.data?.users?.items || $allUsersStore.data?.users?.items?.length === 0}
                <div class="py-4 text-center text-gray-500">No users found</div>
              {:else}
                <div class="space-y-2 max-h-[500px] overflow-y-auto">
                  {#each $allUsersStore.data?.users?.items || [] as user}
                    {#if user}
                      <div 
                        class="p-3 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 {selectedUserId === user.id ? 'bg-gray-100 border-gray-400' : 'border-gray-200'}"
                        role="button"
                        tabindex="0"
                        on:keydown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            selectUser(user);
                          }
                        }}
                        on:click={() => selectUser(user)}
                      >
                        <div class="flex justify-between items-center">
                          <div>
                            <h4 class="font-medium text-gray-800">{user.email || 'Unnamed User'}</h4>
                            {#if user.role && user.role.name}
                              <p class="text-sm text-gray-600 mt-1">Role: {user.role.name}</p>
                            {/if}
                          </div>
                          <div class="flex items-center space-x-2">
                            <div class={`inline-flex px-2 py-1 text-xs rounded-full ${(user as any).isActive !== false ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                            aria-label={(user as any).isActive !== false ? 'User is active' : 'User is inactive'}>
                         {(user as any).isActive !== false ? 'Active' : 'Inactive'}
                       </div>
                            <!-- <button 
                              class="p-1 text-red-500 hover:text-red-700 transition-colors"
                              on:click={(e) => confirmDeleteUser(user, e)}
                              title="Delete user"
                              aria-label="Delete user"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button> -->
                          </div>
                        </div>
                      </div>
                    {/if}
                  {/each}
                </div>
              {/if}
            </div>

            <!-- User Form (Right Side) -->
            <div class="w-full md:w-1/2 p-6">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-medium text-gray-700">{isEditing ? 'Edit User' : 'Add New User'}</h3>
                {#if email || password}
                <button 
                  class="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                  on:click={resetForm}
                >
                  New User
                </button>
              {/if}
              </div>

              <div class="space-y-4">
                <InputComponent
                  label="Email *"
                  placeholder="Enter email address"
                  bind:value={email}
                  required={true}
                  type="email"
                  icon=""
                />
                
                <InputComponent
                  label={isEditing ? "Password (leave blank to keep current)" : "Password *"}
                  placeholder="Enter password"
                  bind:value={password}
                  required={!isEditing}
                  type="password"
                  icon=""
                />
                
                <InputComponent
                  label={isEditing ? "Confirm Password" : "Confirm Password *"}
                  placeholder="Confirm password"
                  bind:value={confirmPassword}
                  required={!isEditing}
                  type="password"
                  icon=""
                />
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Role *</label>
                  
                  {#if $allRolesStore.fetching}
                    <div class="py-2 text-sm text-gray-500">Loading roles...</div>
                  {:else if $allRolesStore.errors}
                    <div class="py-2 text-sm text-red-500">
                      Error loading roles: {$allRolesStore.errors[0]?.message || 'Unknown error'}
                    </div>
                  {:else if !$allRolesStore.data?.roles?.items || $allRolesStore.data?.roles?.items?.length === 0}
                    <div class="py-2 text-sm text-gray-500">No roles available</div>
                  {:else}
                    <select 
                      bind:value={selectedRoleId}
                      class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                    >
                      <option value={null}>Select a role</option>
                      {#each $allRolesStore.data.roles.items as role}
                        {#if role && role.id}
                          <option value={role.id}>{role.name}</option>
                        {/if}
                      {/each}
                    </select>
                  {/if}
                </div>
                
                <div class="flex items-center">
                  <input
                    id="isActive"
                    type="checkbox"
                    bind:checked={isActive}
                    class="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                  />
                  <label for="isActive" class="ml-2 block text-sm text-gray-700">Active</label>
                </div>

                <div class="flex justify-end mt-6">
                  <button
                    class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    on:click={handleSaveUser}
                    disabled={isSaving}
                  >
                    {isSaving
                      ? 'Saving...' 
                      : isEditing 
                        ? 'Update User' 
                        : 'Create User'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
  </div>
{/if}