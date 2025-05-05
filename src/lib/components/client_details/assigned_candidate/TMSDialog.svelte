<script lang="ts">
    import { fade, fly } from 'svelte/transition';

    export let showDialog = false;
    export let job: any;
    export let onClose = () => {};


    let selectedUser = job.candidates[0];
    let selectedTab: 'awaiting' | 'approved' | 'rejected' = 'awaiting';
    let userTimesheets: Record<number, UserTimesheet> = {};


    interface TimeEntry {
    day: string;
    date: string;
    startTime: string;
    endTime: string;
    breakTime: string; // Add this line
    amount: number;
    status: 'pending' | 'approved' | 'rejected';
}

    interface UserTimesheet {
        userId: number;
        timeEntries: TimeEntry[];
    }

    interface PaymentSummary {
        subtotal: number;
        taxDeduction: number;
        platformFee: number;
        total: number;
    }

    const sampleUsers = [
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            phone: "+44 123 456 7890",
            address: "123 London Street"
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "+44 098 765 4321",
            address: "456 Manchester Road"
        }
    ];

    job.candidates = sampleUsers;
    selectedUser = job.candidates[0];

    // Initialize sample timesheet data
    sampleUsers.forEach((user) => {
        userTimesheets[user.id] = {
            userId: user.id,
            timeEntries: user.id === 1 ? [
                {
                    day: 'Monday',
                    date: '2024-01-22',
                    startTime: '09:00',
                    endTime: '17:00',
                    breakTime: '01:00',
                    amount: 150,
                    status: 'pending'
                },
                {
                    day: 'Wednesday',
                    date: '2024-01-24',
                    startTime: '09:00',
                    endTime: '17:00',
                    breakTime: '01:00',
                    amount: 150,
                    status: 'pending'
                }
            ] : [
                {
                    day: 'Tuesday',
                    date: '2024-01-23',
                    startTime: '08:00',
                    endTime: '16:00',
                    breakTime: '01:00',
                    amount: 160,
                    status: 'pending'
                },
                {
                    day: 'Friday',
                    date: '2024-01-26',
                    startTime: '08:00',
                    endTime: '16:00',
                    breakTime: '01:00',
                    amount: 160,
                    status: 'approved'
                }
            ]
        };
    });



    function calculatePaymentSummary(entries: TimeEntry[]): PaymentSummary {
        const approvedEntries = entries.filter(e => e.status === 'approved');
        const subtotal = approvedEntries.reduce((sum, entry) => sum + entry.amount, 0);
        const taxDeduction = subtotal * 0.20; // 20% tax
        const platformFee = subtotal * 0.05; // 5% platform fee
        const total = subtotal - taxDeduction - platformFee;
        
        return { subtotal, taxDeduction, platformFee, total };
    }

    function handleIssuePayment() {
        const summary = calculatePaymentSummary(userTimesheets[selectedUser.id]?.timeEntries || []);
        console.log('Issuing payment:', summary);
        // Implement payment logic here
    }

    function handleClose() {
        showDialog = false;
        onClose();
    }

    async function handleApproveEntry(entry: TimeEntry) {
        entry.status = 'approved';
        userTimesheets = { ...userTimesheets }; // Trigger reactivity
    }

    async function handleRejectEntry(entry: TimeEntry) {
        entry.status = 'rejected';
        userTimesheets = { ...userTimesheets }; // Trigger reactivity
    }

    $: getFilteredEntries = (entries: TimeEntry[]) => {
        switch (selectedTab) {
            case 'awaiting':
                return entries.filter(e => e.status === 'pending');
            case 'approved':
                return entries.filter(e => e.status === 'approved');
            case 'rejected':
                return entries.filter(e => e.status === 'rejected');
        }
    };
    function handleTimeUpdate(entry: TimeEntry, field: 'startTime' | 'endTime' | 'breakTime', value: string) {
    entry[field] = value;
}
</script>

{#if showDialog}
    <div tabindex="-1"
        class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
        on:click={handleClose}
        on:keydown={e => e.key === 'Escape' && handleClose()}
        role="dialog"
        aria-modal="true"
        transition:fade
    >
        <div
        role="dialog"
        tabindex="0"
        on:keydown={e => e.key === 'Enter' && handleClose()}
        class="bg-white backdrop-blur rounded-3xl w-[95%] md:w-[1500px] max-h-[256vh] flex flex-col"
        on:click|stopPropagation
        >
            <!-- Header -->
            <div class="p-8 flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-bold text-gray-800">Timesheet Management System</h2>
                    <p class="text-gray-600 mt-1">Job: {job.title}</p>
                </div>
                <button 
                    class="p-2 hover:bg-gray-100/80 rounded-full transition-all duration-300"
                    on:click={handleClose}
                >
                    <span class="material-icons-sharp text-gray-600">close</span>
                </button>
            </div>

            <!-- Content -->
            <div class="flex-1 overflow-hidden flex gap-8 px-8 pb-8">
                <!-- Left: User List -->
                <div class="w-64 bg-gray-50/50 rounded-2xl p-4 overflow-y-auto">
                    <h3 class="font-semibold text-gray-700 mb-4 px-2">Assigned Users</h3>
                    <div class="space-y-2">
                        {#each job.candidates as candidate}
                            <button
                                class="w-full p-3 rounded-xl text-left transition-all duration-200
                                    {selectedUser.id === candidate.id ? 
                                    'bg-white scale-[1.02]' : 
                                    'hover:bg-white/50 hover:scale-[1.01]'}"
                                on:click={() => selectedUser = candidate}
                            >
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                        {#if candidate.image}
                                            <img src={candidate.image} alt={candidate.name} class="w-full h-full rounded-full object-cover">
                                        {:else}
                                            <span class="material-icons-sharp text-gray-400">person</span>
                                        {/if}
                                    </div>
                                    <span class="font-medium text-gray-700">{candidate.name}</span>
                                </div>
                            </button>
                        {/each}
                    </div>
                </div>

                <!-- Middle: User Details -->
                <div class="w-72 bg-gray-50/50 rounded-2xl p-6 overflow-y-auto">
                    <h3 class="font-semibold text-gray-700 mb-6">User Details</h3>
                    <div class="space-y-6">
                        <div class="flex justify-center mb-8">
                            <div class="w-28 h-28 rounded-full bg-white flex items-center justify-center p-1">
                                {#if selectedUser.image}
                                    <img src={selectedUser.image} alt={selectedUser.name} class="w-full h-full rounded-full object-cover">
                                {:else}
                                    <span class="material-icons-sharp text-5xl text-gray-400">person</span>
                                {/if}
                            </div>
                        </div>
                        <div class="bg-white rounded-xl p-4">
                            <label for="name" class="text-sm text-gray-500">Name</label>
                            <input type="text" id="name" value={selectedUser.name} readonly class="font-medium text-gray-800 mt-1 bg-transparent border-none p-0 w-full" />
                            <p class="font-medium text-gray-800 mt-1">{selectedUser.name}</p>
                        </div>
                        <div class="bg-white rounded-xl p-4">
                            <label for="email" class="text-sm text-gray-500">Email</label>
                            <input type="text" id="email" value={selectedUser.email} readonly class="font-medium text-gray-800 mt-1 bg-transparent border-none p-0 w-full" />
                            <p class="font-medium text-gray-800 mt-1">{selectedUser.email}</p>
                        </div>
                        <div class="bg-white rounded-xl p-4">
                            <label for="phone" class="text-sm text-gray-500">Phone</label>
                            <input type="text" id="phone" value={selectedUser.phone} readonly class="font-medium text-gray-800 mt-1 bg-transparent border-none p-0 w-full" />
                            <p class="font-medium text-gray-800 mt-1">{selectedUser.phone || 'N/A'}</p>
                        </div>
                        <div class="bg-white rounded-xl p-4">
                            <label for="address" class="text-sm text-gray-500">Address</label>
                            <p class="font-medium text-gray-800 mt-1">{selectedUser.address || 'N/A'}</p>
                        </div>
                    </div>
                </div>

                <!-- Right: Timesheet -->
                <div class="flex-1 flex flex-col gap-6">
                    <!-- Timesheet Entries -->
                    <div class="flex-1 bg-gray-50/50 rounded-2xl p-6">
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="font-semibold text-gray-700">Timesheet Entries</h3>
                            <div class="flex items-center gap-4 bg-gray-100 p-1 rounded-xl">
                                <button
                                class="px-4 py-2 rounded-xl transition-all duration-200 {selectedTab === 'awaiting' ? 'bg-white text-gray-800' : 'text-gray-600 hover:bg-white/50'}"
                                on:click={() => selectedTab = 'awaiting'}
                            >
                                Awaiting ({userTimesheets[selectedUser.id]?.timeEntries.filter(e => e.status === 'pending').length || 0})
                            </button>
                            <button
                                class="px-4 py-2 rounded-xl transition-all duration-200 {selectedTab === 'approved' ? 'bg-white text-gray-800' : 'text-gray-600 hover:bg-white/50'}"
                                on:click={() => selectedTab = 'approved'}
                            >
                                Approved ({userTimesheets[selectedUser.id]?.timeEntries.filter(e => e.status === 'approved').length || 0})
                            </button>
                            <button
                                class="px-4 py-2 rounded-xl transition-all duration-200 {selectedTab === 'rejected' ? 'bg-white text-gray-800' : 'text-gray-600 hover:bg-white/50'}"
                                on:click={() => selectedTab = 'rejected'}
                            >
                                Rejected ({userTimesheets[selectedUser.id]?.timeEntries.filter(e => e.status === 'rejected').length || 0})
                            </button>
                            </div>
                        </div>

                        <div class="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                            {#each getFilteredEntries(userTimesheets[selectedUser.id]?.timeEntries || []) as entry (entry.date)}
                                <div class="bg-white rounded-xl p-6 transition-all duration-300"
                                    in:fly={{ y: 20, duration: 300 }}
                                    out:fly={{ y: -20, duration: 300 }}
                                >
                                    <div class="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 class="font-medium text-gray-800 text-lg">{entry.day}</h4>
                                            <p class="text-sm text-gray-600 mt-1">{entry.date}</p>
                                        </div>
                                        <div class="space-x-2">
                                            {#if entry.status === 'pending'}
                                            <button
                                            class="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm hover:bg-green-100 transition-all duration-300"
                                            on:click={() => handleApproveEntry(entry)}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            class="px-4 py-2 bg-red-50 text-red-700 rounded-full text-sm hover:bg-red-100 transition-all duration-300"
                                            on:click={() => handleRejectEntry(entry)}
                                        >
                                            Reject
                                        </button>
                                            {:else}
                                                <span class="px-4 py-2 rounded-full text-sm font-medium
                                                    {entry.status === 'approved' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}">
                                                    {entry.status === 'approved' ? 'Approved' : 'Rejected'}
                                                </span>
                                            {/if}
                                        </div>
                                    </div>
                                    <div class="grid grid-cols-4 gap-6 mt-6">
                                        <div class="bg-gray-50 rounded-xl p-4">
                                            <label for="startTime" class="text-sm text-gray-500">Start Time</label>
                                            <input
                                                type="time"
                                                value={entry.startTime}
                                                on:input={(e) => handleTimeUpdate(entry, 'startTime', e.currentTarget.value)}
                                                class="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all"
                                            />
                                        </div>
                                        <div class="bg-gray-50 rounded-xl p-4">
                                            <label for="breakTime" class="text-sm text-gray-500">Break Time</label>
                                            <input
                                                type="time"
                                                value={entry.breakTime}
                                                on:input={(e) => handleTimeUpdate(entry, 'breakTime', e.currentTarget.value)}
                                                class="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all"
                                            />
                                        </div>
                                        <div class="bg-gray-50 rounded-xl p-4">
                                            <label for="endTime" class="text-sm text-gray-500">End Time</label>
                                            <input
                                                type="time"
                                                value={entry.endTime}
                                                on:input={(e) => handleTimeUpdate(entry, 'endTime', e.currentTarget.value)}
                                                class="w-full mt-1 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all"
                                            />
                                        </div>
                                        <div class="bg-gray-50 rounded-xl p-4">
<label for="amount" class="text-sm text-gray-500">Amount</label>
                                            <p class="font-medium text-gray-800 mt-1">£{entry.amount}</p>
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>

                    <!-- Payment Summary Section -->
                    {#if selectedTab === 'approved'}
                        {@const summary = calculatePaymentSummary(userTimesheets[selectedUser.id]?.timeEntries || [])}
                        <div class="bg-white rounded-2xl p-6">
                            <h3 class="font-semibold text-gray-700 mb-6">Payment Summary</h3>
                            <div class="space-y-4">
                                <div class="flex justify-between items-center py-3 border-b border-gray-100">
                                    <span class="text-gray-600">Subtotal</span>
                                    <span class="font-medium text-gray-800">£{summary.subtotal.toFixed(2)}</span>
                                </div>
                                <div class="flex justify-between items-center py-3 border-b border-gray-100">
                                    <div class="flex items-center gap-2">
                                        <span class="text-gray-600">Tax Deduction</span>
                                        <span class="text-xs text-gray-400">(20%)</span>
                                    </div>
                                    <span class="font-medium text-red-600">-£{summary.taxDeduction.toFixed(2)}</span>
                                </div>
                                <div class="flex justify-between items-center py-3 border-b border-gray-100">
                                    <div class="flex items-center gap-2">
                                        <span class="text-gray-600">Platform Fee</span>
                                        <span class="text-xs text-gray-400">(5%)</span>
                                    </div>
                                    <span class="font-medium text-red-600">-£{summary.platformFee.toFixed(2)}</span>
                                </div>
                                <div class="flex justify-between items-center py-4 mt-2">
                                    <span class="text-lg font-semibold text-gray-800">Total Payment</span>
                                    <span class="text-lg font-bold text-green-600">£{summary.total.toFixed(2)}</span>
                                </div>
                                <button
                                    class="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
                                    on:click={handleIssuePayment}
                                >
                                    <span class="material-icons-sharp">payments</span>
                                    Issue Payment
                                </button>
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
{/if}