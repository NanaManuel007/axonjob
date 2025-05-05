<script lang="ts">
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { AllUserStore,DeleteUserStore } from '$houdini';
  import Dialog from '../general_components/Dialog.svelte';
  import Toast from '../general_components/Toast.svelte';
  import { processUserData, type User } from '$services/all_users/userDataUsers';
  import Roles from './roles/Roles.svelte';
  import AddNewUser from './add_user/AddNewUser.svelte';
  
  // Initialize the Houdini store with network-only policy
  const store = new AllUserStore();
  let allUsers: User[] = [];

  // State variables
  let mounted = $state(false);
  let searchTerm = $state('');
  let showDeleteDialog = $state(false);
  let selectedUser = $state<User | null>(null);
  let showAddUserDialog = $state(false);
  let showRolesDialog = $state(false);

  // Pagination variables
  let currentPage = $state(1);
  const itemsPerPage = 10;
  let totalPages = $state(1);
  let paginatedUsers = $state<User[]>([]);
    const deleteUserStore = new DeleteUserStore();
  async function loadUsers() {
    try {
      const result = await store.fetch();
      if (result.data?.users?.items) {
        allUsers = result.data.users.items as unknown as User[];
        updatePaginatedUsers();
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      showErrorToast('Failed to fetch users');
    }
  }

  function updatePaginatedUsers() {
    if (!allUsers.length) return;

    // Filter users based on search term
    const filteredUsers = allUsers.filter(user => 
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate total pages
    totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));

    // Adjust current page if needed
    if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    // Get paginated users
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  }

  // Fetch users on mount
  onMount(async () => {
    await loadUsers();
    mounted = true;
  });

  function openAddUserDialog() {
    showAddUserDialog = true;
  }
  
  async function handleCloseAddUserDialog() {
    showAddUserDialog = false;
    await loadUsers(); // Reload users when dialog is closed
  }
  
  function openRolesDialog() {
    showRolesDialog = true;
  }
  
  async function handleCloseRolesDialog() {
    showRolesDialog = false;
    await loadUsers(); // Reload users when roles dialog is closed
  }

  // Watch for search term changes
  $effect(() => {
    if (mounted) {
      currentPage = 1; // Reset to first page when searching
      updatePaginatedUsers();
    }
  });

  // Watch for store changes
  $effect(() => {
    if ($store.data?.users?.items && mounted) {
      allUsers = $store.data.users.items as unknown as User[];
      updatePaginatedUsers();
    }
  });

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
      updatePaginatedUsers();
    }
  }

  let showToast = $state(false);
  let toastMessage = $state('');
  let toastType = $state<'success' | 'error'>('success');

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

  function handleEdit(user: User) {
    console.log('Edit user:', user);
  }

  async function handleDelete() {
  if (selectedUser) {
    try {
      const result = await deleteUserStore.mutate({
        input: {
          id: selectedUser.id
        }
      });

      if (result.data?.deleteUser?.success) {
        showSuccessToast(result.data.deleteUser.message || 'User deleted successfully');
        await loadUsers(); // Reload the users list
      } else {
        const errorMessage = result.data?.deleteUser?.message || 'Failed to delete user';
        showErrorToast(errorMessage);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      showErrorToast('Failed to delete user');
    }
    showDeleteDialog = false;
    selectedUser = null;
  }
}


</script>

<AddNewUser 
  isOpen={showAddUserDialog} 
  on:close={handleCloseAddUserDialog} 
/>

<Roles 
  isOpen={showRolesDialog} 
  on:close={handleCloseRolesDialog} 
/>

<Toast 
  show={showToast}
  message={toastMessage}
  type={toastType}
/>

{#if showDeleteDialog && selectedUser}
  <Dialog
    show={showDeleteDialog}
    title="Confirm Deletion"
    onClose={() => showDeleteDialog = false}
  >
    <p class="text-gray-600">
      Are you sure you want to delete user {selectedUser?.email}?
    </p>
    
    <svelte:fragment slot="actions">
      <button
        class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        on:click={() => showDeleteDialog = false}
      >
        Cancel
      </button>
      <button
        class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        on:click={handleDelete}
      >
        Delete
      </button>
    </svelte:fragment>
  </Dialog>
{/if}

{#if mounted}
  <div class="pt-10 pr-10 pl-10">
    <main class="bg-white rounded-2xl shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] transition-all duration-300" in:fade={{ duration: 1000 }}>
      <section class="w-full overflow-hidden">
        <div class="w-full bg-white/25 p-6 flex items-center">
          <h1 class="text-3xl font-semibold">System Users</h1>
          <div class="flex-grow"></div>
          <div class="flex items-center gap-4">
            <div class="relative">
              <input
                type="text"
                placeholder="Search users..."
                bind:value={searchTerm}
                class="border border-gray-300 rounded-lg py-2 px-4 pr-10 focus:outline-none focus:border-grey-500"
              />
              <span class="material-icons-sharp absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                search
              </span>
            </div>
            <button
              class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
              on:click={openAddUserDialog}
            >
              <span class="material-icons-sharp">add</span>
              Add User
            </button>
            <button
              class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
              on:click={openRolesDialog}
            >
              <span class="material-icons-sharp">add</span>
              Add Role
            </button>
          </div>
        </div>

        {#if $store.fetching}
          <div class="p-6 text-center">Loading users...</div>
        {:else if $store.errors}
          <div class="p-6 text-center text-red-500">Error loading users: {$store.errors[0]?.message}</div>
        {:else}
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th class="text-left p-4 font-medium text-gray-600">User ID</th>
                  <th class="text-left p-4 font-medium text-gray-600">Email</th>
                  <th class="text-left p-4 font-medium text-gray-600">Role</th>
                  <th class="text-left p-4 font-medium text-gray-600">Permissions</th>
                  <th class="text-center p-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {#each paginatedUsers as user}
                  <tr class="border-b border-gray-100 hover:bg-gray-50/50">
                    <td class="p-4">
                      <span class="font-mono text-sm">{user.id}</span>
                    </td>
                    <td class="p-4">{user.email}</td>
                    <td class="p-4">
                      <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {user.role?.name || 'No Role'}
                      </span>
                    </td>
                    <td class="p-4">
                      <div class="flex flex-wrap gap-1">
                        {#if user.role?.rolePermissions && user.role.rolePermissions.length > 0}
                          {#each user.role.rolePermissions as permission, i}
                            {#if i < 3}
                              <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                {permission.permissionName}
                              </span>
                            {:else if i === 3}
                              <span class="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                +{user.role.rolePermissions.length - 3} more
                              </span>
                            {/if}
                          {/each}
                        {:else}
                          <span class="text-gray-500 text-sm">No permissions</span>
                        {/if}
                      </div>
                    </td>
                    <td class="p-4">
                      <div class="flex items-center justify-center gap-3">
                        <button
                        class="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                        on:click={() => {
                          selectedUser = user;
                          showDeleteDialog = true;
                        }}
                        title="Delete User"
                      >
                        <span class="material-icons-sharp text-sm">delete</span>
                      </button>
                      </div>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>

          {#if totalPages > 1}
            <div class="flex items-center justify-between px-6 py-4 border-t border-gray-200">
              <div class="text-sm text-gray-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, paginatedUsers.length)} of {$store.data?.users?.totalCount || 0} entries
              </div>
              <div class="flex items-center gap-2">
                <button
                  class="px-3 py-1 rounded-lg border {currentPage === 1 ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'}"
                  on:click={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                
                {#each Array(totalPages) as _, i}
                  {#if i + 1 === 1 || i + 1 === totalPages || (i + 1 >= currentPage - 1 && i + 1 <= currentPage + 1)}
                    <button
                      class="w-8 h-8 rounded-lg flex items-center justify-center {
                        currentPage === i + 1
                          ? 'bg-grey-500 text-white'
                          : 'hover:bg-gray-50'
                      }"
                      on:click={() => goToPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  {:else if i + 1 === currentPage - 2 || i + 1 === currentPage + 2}
                    <span class="px-1">...</span>
                  {/if}
                {/each}
                
                <button
                  class="px-3 py-1 rounded-lg border {currentPage === totalPages ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-50'}"
                  on:click={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          {/if}
        {/if}
      </section>
    </main>
  </div>
{/if}