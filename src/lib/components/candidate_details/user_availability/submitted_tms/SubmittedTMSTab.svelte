<script lang="ts">
    import { fade } from 'svelte/transition';

    export let showDialog = false;
    export let booking: any;
    export let onClose = () => {};

    type TabStatus = 'pending' | 'approved' | 'rejected';
    
    const tabs: Array<{ id: TabStatus; label: string; icon: string }> = [
        { id: 'pending', label: 'Awaiting Approval', icon: 'pending_actions' },
        { id: 'approved', label: 'Approved', icon: 'check_circle' },
        { id: 'rejected', label: 'Rejected', icon: 'cancel' }
    ];
    
    let activeTab: TabStatus = 'pending';
    interface TimesheetEntry {
        day: string;
        date: string;
        startTime: string;
        endTime: string;
        breakTime: string;
        amount: number;
        status: 'pending' | 'approved' | 'rejected';
        notes: string;
        location: string;
        supervisor: string;
        tasks: string[];
    }

    let editingEntry: TimesheetEntry | null = null;
    let adjustedTimes = {
        startTime: '',
        endTime: '',
        breakTime: ''
    };

    // Sample timesheet entries
    let timesheetEntries: TimesheetEntry[] = [
        {
            day: 'Monday',
            date: '2024-02-19',
            startTime: '08:00',
            endTime: '16:00',
            breakTime: '01:00',
            amount: 175,
            status: 'pending',
            notes: "Completed regular teaching duties and attended staff meeting",
            location: "Main Campus",
            supervisor: "Jane Smith",
            tasks: [
                "Morning classes",
                "Afternoon lab sessions",
                "Staff meeting",
                "Lesson planning"
            ]
        },
        {
            day: 'Tuesday',
            date: '2024-02-20',
            startTime: '08:30',
            endTime: '16:30',
            breakTime: '01:00',
            amount: 175,
            status: 'pending',
            notes: "Completed regular teaching duties and attended staff meeting",
            location: "Main Campus",
            supervisor: "Jane Smith",
            tasks: [
                "Morning classes",
                "Afternoon lab sessions",
                "Staff meeting",
                "Lesson planning"
            ]
        },
        {
            day: 'Wednesday',
            date: '2024-02-20',
            startTime: '08:30',
            endTime: '16:30',
            breakTime: '01:00',
            amount: 175,
            status: 'pending',
            notes: "Completed regular teaching duties and attended staff meeting",
            location: "Main Campus",
            supervisor: "Jane Smith",
            tasks: [
                "Morning classes",
                "Afternoon lab sessions",
                "Staff meeting",
                "Lesson planning"
            ]
        },
        
    ];

    function handleApprove(entry: TimesheetEntry) {
        timesheetEntries = timesheetEntries.map(e => 
            e === entry ? { ...e, status: 'approved' } : e
        );
        // Add API call here
    }

    function handleReject(entry: TimesheetEntry) {
        timesheetEntries = timesheetEntries.map(e => 
            e === entry ? { ...e, status: 'rejected' } : e
        );
        // Add API call here
    }

    function startEditing(entry: TimesheetEntry) {
        editingEntry = entry;
        adjustedTimes = {
            startTime: entry.startTime,
            endTime: entry.endTime,
            breakTime: entry.breakTime
        };
    }

    function saveTimeAdjustment() {
        if (editingEntry) {
            editingEntry.startTime = adjustedTimes.startTime;
            editingEntry.endTime = adjustedTimes.endTime;
            editingEntry.breakTime = adjustedTimes.breakTime;
            // Add API call here
            editingEntry = null;
        }
    }

    function cancelEditing() {
        editingEntry = null;
        adjustedTimes = {
            startTime: '',
            endTime: '',
            breakTime: ''
        };
    }

    // Calculate totals
    $: pendingEntries = timesheetEntries.filter(e => e.status === 'pending');
    $: approvedEntries = timesheetEntries.filter(e => e.status === 'approved');
    $: rejectedEntries = timesheetEntries.filter(e => e.status === 'rejected');

    $: pendingTotal = pendingEntries.reduce((sum, entry) => sum + entry.amount, 0);
    $: approvedSubtotal = approvedEntries.reduce((sum, entry) => sum + entry.amount, 0);
    $: rejectedTotal = rejectedEntries.reduce((sum, entry) => sum + entry.amount, 0);

    $: platformFee = approvedSubtotal * 0.1;
    $: tax = approvedSubtotal * 0.2;
    $: approvedTotal = approvedSubtotal + platformFee + tax;
</script>

{#if showDialog}
    <div
        class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[60]"
        tabindex="-1"
        on:click={onClose}
        on:keydown={e => e.key === 'Escape' && onClose()}
        role="dialog"
        aria-modal="true"
        transition:fade
    >
        <div
            role="dialog"
            tabindex="0"
            on:keydown={e => e.key === 'Enter' && onClose()}
            class="bg-white rounded-3xl w-[95%] max-w-4xl max-h-[90vh] overflow-y-auto"
            on:click|stopPropagation
        >
            <!-- Header -->
            <div class="p-6 border-b border-gray-100">
                <div class="flex justify-between items-center">
                    <div>
                        <h2 class="text-xl font-bold text-gray-800">{booking.jobTitle} - Timesheet Entries</h2>
                        <p class="text-sm text-gray-600 mt-1">View and manage submitted timesheets</p>
                    </div>
                    <button 
                        class="p-2 hover:bg-gray-100 rounded-full transition-all duration-300"
                        on:click={onClose}
                    >
                        <span class="material-icons-sharp text-gray-600">close</span>
                    </button>
                </div>
            </div>

            <!-- Content -->
            <div class="p-6">
                <!-- Booking Summary -->
                <div class="bg-gray-50 p-4 rounded-xl mb-6">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <span class="text-sm text-gray-500">Job Type</span>
                            <p class="font-medium mt-1">{booking.jobType}</p>
                        </div>
                        <div>
                            <span class="text-sm text-gray-500">Date Assigned</span>
                            <p class="font-medium mt-1">{booking.dateAssigned}</p>
                        </div>
                        <div>
                            <span class="text-sm text-gray-500">Duration</span>
                            <p class="font-medium mt-1">{booking.duration}</p>
                        </div>
                        <div>
                            <span class="text-sm text-gray-500">Total Hours</span>
                            <p class="font-medium mt-1">{booking.hours}h</p>
                        </div>
                    </div>
                </div>

                <!-- Tab Navigation -->
                <div class="bg-gray-100/50 p-2 rounded-xl inline-flex gap-2 mb-6">
                    {#each tabs as tab}
                        <button
                            class="px-6 py-3 font-medium rounded-lg transition-all duration-200 relative
                                {activeTab === tab.id 
                                    ? 'bg-white text-gray-600 shadow-sm' 
                                    : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'}"
                            on:click={() => activeTab = tab.id}
                        >
                            <div class="flex items-center gap-2">
                                <span class="material-icons-sharp text-sm">{tab.icon}</span>
                                {tab.label}
                                {#if (tab.id === 'pending' && pendingEntries.length > 0) || 
                                    (tab.id === 'approved' && approvedEntries.length > 0) || 
                                    (tab.id === 'rejected' && rejectedEntries.length > 0)}
                                    <span class="absolute -top-1 -right-1 px-1.5 py-0.5 bg-gray-600 text-white rounded-full text-xs">
                                        {tab.id === 'pending' 
                                            ? pendingEntries.length 
                                            : tab.id === 'approved'
                                            ? approvedEntries.length
                                            : rejectedEntries.length}
                                    </span>
                                {/if}
                            </div>
                        </button>
                    {/each}
                </div>

                <!-- Tab Content -->
                {#if activeTab === 'approved'}
                    <!-- Approved Summary -->
                    <div class="bg-green-50 p-4 rounded-xl mb-6">
                        <div class="space-y-1">
                            <div class="flex justify-between text-sm text-green-700">
                                <span>Subtotal:</span>
                                <span>£{approvedSubtotal.toFixed(2)}</span>
                            </div>
                            <div class="flex justify-between text-sm text-green-700">
                                <span>Platform Fee (10%):</span>
                                <span>£{platformFee.toFixed(2)}</span>
                            </div>
                            <div class="flex justify-between text-sm text-green-700">
                                <span>Tax (20%):</span>
                                <span>£{tax.toFixed(2)}</span>
                            </div>
                            <div class="flex justify-between text-green-900 font-bold pt-1 border-t border-green-200">
                                <span>Total:</span>
                                <span>£{approvedTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                {/if}

                <!-- Timesheet Entries -->
                <div class="space-y-4">
                    {#each timesheetEntries.filter(entry => entry.status === activeTab) as entry}
                        <div class="border rounded-xl p-4">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <h3 class="font-medium">{entry.day}, {entry.date}</h3>
                                    <p class="text-sm text-gray-600">Supervisor: {entry.supervisor}</p>
                                </div>
                                <div class="flex items-center gap-2">
                                    {#if entry.status === 'pending'}
                     
                                    <button
                                    class="px-3 py-1 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors text-sm"
                                    on:click={() => handleApprove(entry)}
                                >
                                    Approve
                                </button>
                                <button
                                    class="px-3 py-1 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors text-sm"
                                    on:click={() => handleReject(entry)}
                                >
                                    Reject
                                </button>
                                    {:else}
                                        <span class="px-3 py-1 rounded-full text-sm
                                            {entry.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                                            {entry.status}
                                        </span>
                                    {/if}
                                </div>
                            </div>
                            
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                {#if editingEntry === entry}
                                    <div>
                                        <span class="text-sm text-gray-500">Start Time</span>
                                        <input
                                            type="time"
                                            bind:value={adjustedTimes.startTime}
                                            class="w-full mt-1 px-3 py-1.5 border rounded-lg focus:ring-2 focus:ring-gray-400"
                                        >
                                    </div>
                                    <div>
                                        <span class="text-sm text-gray-500">End Time</span>
                                        <input
                                            type="time"
                                            bind:value={adjustedTimes.endTime}
                                            class="w-full mt-1 px-3 py-1.5 border rounded-lg focus:ring-2 focus:ring-gray-400"
                                        >
                                    </div>
                                    <div>
                                        <span class="text-sm text-gray-500">Break (HH:mm)</span>
                                        <input
                                            type="time"
                                            bind:value={adjustedTimes.breakTime}
                                            class="w-full mt-1 px-3 py-1.5 border rounded-lg focus:ring-2 focus:ring-gray-400"
                                        >
                                    </div>
                                    <div class="flex items-end gap-2">
                                        <button
                                            class="px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                                            on:click={saveTimeAdjustment}
                                        >
                                            Save
                                        </button>
                                        <button
                                            class="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                                            on:click={cancelEditing}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                {:else}
                                    <div>
                                        <span class="text-sm text-gray-500">Start Time</span>
                                        <div class="flex items-center gap-2">
                                            <p class="font-medium">{entry.startTime}</p>
                                            {#if entry.status === 'pending'}
                                                <button
                                                    class="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                                    on:click={() => startEditing(entry)}
                                                >
                                                    <span class="material-icons-sharp text-gray-600 text-sm">edit</span>
                                                </button>
                                            {/if}
                                        </div>
                                    </div>
                                    <div>
                                        <span class="text-sm text-gray-500">End Time</span>
                                        <p class="font-medium">{entry.endTime}</p>
                                    </div>
                                    <div>
                                        <span class="text-sm text-gray-500">Break</span>
                                        <p class="font-medium">{entry.breakTime}</p>
                                    </div>
                                    <div>
                                        <span class="text-sm text-gray-500">Amount</span>
                                        <p class="font-medium">£{entry.amount}</p>
                                    </div>
                                {/if}
                            </div>

                            <div class="space-y-2">
                                <h4 class="text-sm font-medium text-gray-500">Tasks Completed</h4>
                                <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {#each entry.tasks as task}
                                        <li class="flex items-start gap-2">
                                            <span class="material-icons-sharp text-gray-400 text-sm mt-1">check_circle</span>
                                            <span class="text-sm text-gray-700">{task}</span>
                                        </li>
                                    {/each}
                                </ul>
                            </div>

                            {#if entry.notes}
                                <div class="mt-4 pt-4 border-t">
                                    <h4 class="text-sm font-medium text-gray-500 mb-2">Notes</h4>
                                    <p class="text-sm text-gray-700">{entry.notes}</p>
                                </div>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Footer -->
            <div class="p-6 border-t border-gray-100">
                <div class="flex justify-end gap-3">
                    <button
                        class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        on:click={onClose}
                    >
                        Close
                    </button>
                    <button
                        class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                    >
                        <span class="material-icons-sharp text-sm">print</span>
                        Print All
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}