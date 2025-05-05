<script lang="ts">
    import { fly } from 'svelte/transition';
    import TMSDialog from './TMSDialog.svelte';

    let showTMSDialog = false;
    let selectedApproval: Approval | null = null;

    interface Approval {
        id: number;
        candidateName: string;
        candidateEmail: string;
        jobRole: string;
        jobType: string;
        approvalType: string;
        status: string;
        totalAmount: number;
        date: string;
    }
    let startDate = '';
    let endDate = '';
    let searchQuery = '';
    let selectedJobType = 'all';
    let selectedStatus = 'all';
    let selectedDate = '';
    let currentPage = 1;
    const itemsPerPage = 10;
    let totalPages = 1;
    let filteredApprovals: Approval[] = [];

    let approvals: Approval[] = [
        {
            id: 1,
            candidateName: 'John Doe',
            candidateEmail: 'john@example.com',
            jobRole: 'Frontend Developer',
            jobType: 'Permanent',
            approvalType: 'Job Offer',
            status: 'Active',
            totalAmount: 5000,
            date: '2024-01-22'
        },
        {
            id: 2,
            candidateName: 'Jane Smith',
            candidateEmail: 'jane@example.com',
            jobRole: 'DevOps Engineer',
            jobType: 'Temporary',
            approvalType: 'Timesheet',
            status: 'Active',
            totalAmount: 3000,
            date: '2024-01-24'
        }
    ];

    function handleView(approval: Approval) {
        selectedApproval = approval;
        showTMSDialog = true;
    }

    $: {
        const filtered = approvals.filter(approval => {
        const matchesSearch = 
            approval.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            approval.candidateEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
            approval.jobRole.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesJobType = selectedJobType === 'all' || approval.jobType === selectedJobType;
        const matchesStatus = selectedStatus === 'all' || approval.status === selectedStatus;
        
        // New date range filter logic
        const approvalDate = new Date(approval.date);
        const isAfterStart = !startDate || approvalDate >= new Date(startDate);
        const isBeforeEnd = !endDate || approvalDate <= new Date(endDate);
        
        return matchesSearch && matchesJobType && matchesStatus && isAfterStart && isBeforeEnd;
    });


        totalPages = Math.ceil(filtered.length / itemsPerPage);
        currentPage = Math.min(Math.max(1, currentPage), Math.max(1, totalPages));
        filteredApprovals = filtered.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );
    }

    function goToPage(page: number) {
        currentPage = Math.min(Math.max(1, page), totalPages);
    }
</script>

<div class="space-y-6">
    <div class="flex justify-between items-center mb-8">
        <h2 class="text-2xl font-bold text-gray-800">Pending Approvals</h2>
    </div>

    <!-- Search and Filter Section -->
    <div class="bg-white p-6 rounded-[15px] shadow-sm space-y-4">
        <div class="flex gap-4 items-center flex-wrap">
            <!-- Search Bar -->
            <div class="flex-1 relative min-w-[200px]">
                <span class="material-icons-sharp absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                <input 
                    type="text"
                    bind:value={searchQuery}
                    placeholder="Search approvals..."
                    class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all"
                />
            </div>

            <!-- Job Type Filter -->
            <div class="min-w-[150px]">
                <select
                    bind:value={selectedJobType}
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all"
                >
                    <option value="all">All Job Types</option>
                    <option value="Permanent">Permanent</option>
                    <option value="Temporary">Temporary</option>
                </select>
            </div>

            <!-- Status Filter -->
            <div class="min-w-[150px]">
                <select
                    bind:value={selectedStatus}
                    class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all"
                >
                    <option value="all">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Closed">Closed</option>
                </select>
            </div>

            <!-- Date Filter -->
            <div class="flex gap-2 min-w-[300px]">
                <div class="flex-1">
                    <label class="text-sm text-gray-500 block mb-1">From</label>
                    <input 
                        type="date"
                        bind:value={startDate}
                        class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all"
                    />
                </div>
                <div class="flex-1">
                    <label class="text-sm text-gray-500 block mb-1">To</label>
                    <input 
                        type="date"
                        bind:value={endDate}
                        class="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all"
                    />
                </div>
            </div>
        </div>
    </div>

    <!-- Table Section -->
    <div class="bg-white shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] rounded-[15px] overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead>
                    <tr class="bg-gray-50">
                        <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Candidate Name</th>
                        <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Email</th>
                        <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Job Role</th>
                        <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Job Type</th>
                        <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Approval</th>
                        <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                        <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Amount</th>
                        <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Date</th>
                        <th class="px-6 py-4 text-left text-sm font-semibold text-gray-600">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {#each filteredApprovals as approval, i}
                        <tr 
                            class="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                            in:fly|local={{ y: 20, duration: 300, delay: i * 100 }}
                        >
                            <td class="px-6 py-4">
                                <div class="flex items-center">
                                    <span class="material-icons-sharp text-gray-400 mr-2">person</span>
                                    <span class="font-medium text-gray-800">{approval.candidateName}</span>
                                </div>
                            </td>
                            <td class="px-6 py-4 text-gray-600">{approval.candidateEmail}</td>
                            <td class="px-6 py-4 text-gray-600">{approval.jobRole}</td>
                            <td class="px-6 py-4">
                                <span class="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                                    {approval.jobType}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-gray-600">{approval.approvalType}</td>
                            <td class="px-6 py-4">
                                <span class="px-3 py-1 rounded-full text-sm font-medium
                                    {approval.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}">
                                    {approval.status}
                                </span>
                            </td>
                            <td class="px-6 py-4 font-medium text-gray-800">£{approval.totalAmount}</td>
                            <td class="px-6 py-4 text-gray-600">{approval.date}</td>
                            <td class="px-6 py-4">
                                <button 
                                    class="text-blue-500 hover:text-blue-600 flex items-center gap-1"
                                    on:click={() => handleView(approval)}
                                >
                                    <span class="material-icons-sharp">visibility</span>
                                    View
                                </button>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>

            <!-- Pagination -->
            {#if totalPages > 0}
                <div class="flex items-center justify-between px-6 py-4 border-t">
                    <div class="text-sm text-gray-600">
                        Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, approvals.length)} of {approvals.length} entries
                    </div>
                    <div class="flex items-center gap-2">
                        <button 
                            class="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={currentPage === 1}
                            on:click={() => goToPage(currentPage - 1)}
                        >
                            <span class="material-icons-sharp">chevron_left</span>
                        </button>
                        
                        {#each Array(totalPages) as _, i}
                            <button 
                                class="min-w-[32px] h-8 rounded-lg transition-colors {currentPage === i + 1 ? 'bg-gray-200' : 'hover:bg-gray-100'}"
                                on:click={() => goToPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        {/each}
                        
                        <button 
                            class="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={currentPage === totalPages}
                            on:click={() => goToPage(currentPage + 1)}
                        >
                            <span class="material-icons-sharp">chevron_right</span>
                        </button>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>

{#if showTMSDialog && selectedApproval}
    <TMSDialog 
        bind:showDialog={showTMSDialog}
        approval={selectedApproval}
        onClose={() => {
            showTMSDialog = false;
            selectedApproval = null;
        }}
    />
{/if}