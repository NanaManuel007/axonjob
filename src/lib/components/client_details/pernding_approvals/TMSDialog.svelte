<script lang="ts">
    import { fade, fly } from 'svelte/transition';

    export let showDialog = false;
    export let approval: {
        id: number;
        candidateName: string;
        candidateEmail: string;
        jobRole: string;
        jobType: string;
        approvalType: string;
        status: string;
        totalAmount: number;
        date: string;
        submittedStartTime: string;
        submittedEndTime: string;
        submittedBreakTime: string;
        startTime: string;
        endTime: string;
        breakTime: string;
    } | null = null;
    export let onClose = () => {};
    function handleTimeUpdate(field: 'startTime' | 'endTime' | 'breakTime', value: string) {
        if (approval) {
            approval[field] = value;
        }
    }
    let selectedTab: 'details' | 'documents' = 'details';

    function handleApprove() {
        if (approval) {
            approval.status = 'Active';
            onClose();
        }
    }

    function handleReject() {
        if (approval) {
            approval.status = 'Closed';
            onClose();
        }
    }
</script>

{#if showDialog}
    <div 
        class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
        transition:fade
    >
        <div 
            class="bg-white rounded-2xl w-full max-w-2xl shadow-xl"
            transition:fly={{ y: 20, duration: 300 }}
        >
            <!-- Header -->
            <div class="p-6 border-b border-gray-200">
                <div class="flex justify-between items-center">
                    <h2 class="text-2xl font-bold text-gray-800">Approval Details</h2>
                    <button 
                        class="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        on:click={onClose}
                    >
                        <span class="material-icons-sharp">close</span>
                    </button>
                </div>
            </div>

            <!-- Content -->
            <div class="p-6">
                <!-- Tabs -->
                <div class="flex gap-4 mb-6">
                    <button
                        class="px-4 py-2 rounded-xl transition-all duration-200 {selectedTab === 'details' ? 'bg-gray-100 text-gray-800' : 'text-gray-600 hover:bg-gray-50'}"
                        on:click={() => selectedTab = 'details'}
                    >
                        Details
                    </button>
                    <button
                        class="px-4 py-2 rounded-xl transition-all duration-200 {selectedTab === 'documents' ? 'bg-gray-100 text-gray-800' : 'text-gray-600 hover:bg-gray-50'}"
                        on:click={() => selectedTab = 'documents'}
                    >
                        Documents
                    </button>
                </div>

                {#if selectedTab === 'details'}
                    <div class="space-y-6">
                        <!-- Candidate Info -->
                        <div class="bg-gray-50 rounded-xl p-4">
                            <h4 class="font-semibold text-gray-700 mb-4">Candidate Information</h4>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label for="candidate-name" class="text-sm text-gray-500">Name</label>
                                    <p class="font-medium text-gray-800 mt-1">{approval?.candidateName}</p>
                                </div>
                                <div>
                                    <label for="candidate-email" class="text-sm text-gray-500">Email</label>
                                    <p class="font-medium text-gray-800 mt-1">{approval?.candidateEmail}</p>
                                </div>
                            </div>

                            <!-- Time Information -->
                            <div class="space-y-4 mt-4">
                                <!-- Submitted Times -->
                                <div class="grid grid-cols-3 gap-4 pb-4 border-b border-gray-200">
                                    <div>
                                        <label for="submitted-start-time" class="text-sm text-gray-500">Submitted Start Time</label>
                                        <p class="font-medium text-gray-800 mt-1">{approval?.submittedStartTime || '09:00'}</p>
                                    </div>
                                    <div>
                                        <label for="submitted-break-time" class="text-sm text-gray-500">Submitted Break Time</label>
                                        <p class="font-medium text-gray-800 mt-1">{approval?.submittedBreakTime || '01:00'}</p>
                                    </div>
                                    <div>
                                        <label for="submitted-end-time" class="text-sm text-gray-500">Submitted End Time</label>
                                        <p class="font-medium text-gray-800 mt-1">{approval?.submittedEndTime || '17:00'}</p>
                                    </div>
                                </div>

                                <!-- Editable Times -->
                                <div class="grid grid-cols-3 gap-4">
                                    <div>
                                        <label for="start-time" class="text-sm text-gray-500">Update Start Time</label>
                                        <input
                                            type="time"
                                            value={approval?.startTime || approval?.submittedStartTime || '09:00'}
                                            on:input={(e) => handleTimeUpdate('startTime', e.currentTarget.value)}
                                            class="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label for="break-time" class="text-sm text-gray-500">Update Break Time</label>
                                        <input
                                            type="time"
                                            value={approval?.breakTime || approval?.submittedBreakTime || '01:00'}
                                            on:input={(e) => handleTimeUpdate('breakTime', e.currentTarget.value)}
                                            class="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label for="end-time" class="text-sm text-gray-500">Update End Time</label>
                                        <input
                                            type="time"
                                            value={approval?.endTime || approval?.submittedEndTime || '17:00'}
                                            on:input={(e) => handleTimeUpdate('endTime', e.currentTarget.value)}
                                            class="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Job Details -->
                        <div class="bg-gray-50 rounded-xl p-4">
                            <h4 class="font-semibold text-gray-700 mb-4">Job Details</h4>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label for="job-role" class="text-sm text-gray-500">Role</label>
                                    <p class="font-medium text-gray-800 mt-1">{approval?.jobRole}</p>
                                </div>
                                <div>
                                    <label for="job-type" class="text-sm text-gray-500">Type</label>
                                    <p class="font-medium text-gray-800 mt-1">{approval?.jobType}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Approval Details -->
                        <div class="bg-gray-50 rounded-xl p-4">
                            <h4 class="font-semibold text-gray-700 mb-4">Approval Details</h4>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label for="approval-type" class="text-sm text-gray-500">Type</label>
                                    <p class="font-medium text-gray-800 mt-1">{approval?.approvalType}</p>
                                </div>
                                <div>
                                    <label for="status" class="text-sm text-gray-500">Status</label>
                                    <span class="inline-block px-3 py-1 mt-1 rounded-full text-sm font-medium
                                        {approval?.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}">
                                        {approval?.status}
                                    </span>
                                </div>
                                <div>
                                    <label for="amount" class="text-sm text-gray-500">Amount</label>
                                    <p class="font-medium text-gray-800 mt-1">£{approval?.totalAmount}</p>
                                </div>
                                <div>
                                    <label for="approval-date" class="text-sm text-gray-500">Date</label>
                                    <p class="font-medium text-gray-800 mt-1">{approval?.date}</p>
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex gap-4 mt-8">
                            <button
                                class="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
                                on:click={handleApprove}
                            >
                                <span class="material-icons-sharp">check_circle</span>
                                Approve
                            </button>
                            <button
                                class="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
                                on:click={handleReject}
                            >
                                <span class="material-icons-sharp">cancel</span>
                                Reject
                            </button>
                        </div>
                    </div>
                {:else}
                    <!-- Documents Tab -->
                    <div class="bg-gray-50 rounded-xl p-6">
                        <div class="text-center py-8">
                            <span class="material-icons-sharp text-4xl text-gray-400">description</span>
                            <p class="text-gray-600 mt-2">No documents available</p>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}