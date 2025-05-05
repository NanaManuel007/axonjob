<script lang="ts">
	import BookingDialog from './current_booking/BookingDialog.svelte';
    import ViewTimesheetDialog from './submitted_tms/SubmittedTMSTab.svelte';

// ... existing imports and code ...

let showTimesheetDialog = false;
let selectedBooking: CurrentBooking | null = null;
let showBookingDialog = false;
    
    function handleBookNow() {
        showBookingDialog = true;
    }

    function handleAssignJob(job: any) {
        const newBooking: CurrentBooking = {
            jobTitle: job.title,
            jobType: job.type,
            dateAssigned: new Date().toISOString().split('T')[0],
            duration: job.duration,
            progress: 0,
            hours: job.hours,
            status: 'ongoing'
        };
        
        currentBookings = [newBooking, ...currentBookings];
        showBookingDialog = false;
    }

    type CurrentBooking = {
        jobTitle: string;
        jobType: string;
        dateAssigned: string;
        duration: string;
        progress: number;
        hours: number;
        status: 'ongoing' | 'completed' | 'pending';
    };

    let currentBookings: CurrentBooking[] = [
    {
        jobTitle: 'Mathematics Teacher',
        jobType: 'Full Time',
        dateAssigned: '2024-01-15',
        duration: '3 months',
        progress: 65,
        hours: 120,
        status: 'ongoing'
    },
    {
        jobTitle: 'Science Lab Assistant',
        jobType: 'Part Time',
        dateAssigned: '2024-01-20',
        duration: '6 months',
        progress: 30,
        hours: 80,
        status: 'ongoing'
    },
    {
        jobTitle: 'Physical Education',
        jobType: 'Temporary',
        dateAssigned: '2024-02-01',
        duration: '2 months',
        progress: 45,
        hours: 60,
        status: 'ongoing'
    },
    {
        jobTitle: 'English Literature',
        jobType: 'Full Time',
        dateAssigned: '2024-01-10',
        duration: '12 months',
        progress: 15,
        hours: 160,
        status: 'ongoing'
    },
    {
        jobTitle: 'Art Teacher',
        jobType: 'Part Time',
        dateAssigned: '2024-02-05',
        duration: '4 months',
        progress: 25,
        hours: 48,
        status: 'ongoing'
    },
    {
        jobTitle: 'Chemistry Lab Supervisor',
        jobType: 'Full Time',
        dateAssigned: '2024-01-25',
        duration: '6 months',
        progress: 40,
        hours: 140,
        status: 'ongoing'
    },
    {
        jobTitle: 'Music Teacher',
        jobType: 'Part Time',
        dateAssigned: '2024-02-10',
        duration: '3 months',
        progress: 10,
        hours: 36,
        status: 'ongoing'
    },
    {
        jobTitle: 'Special Education Assistant',
        jobType: 'Full Time',
        dateAssigned: '2024-01-05',
        duration: '12 months',
        progress: 70,
        hours: 180,
        status: 'ongoing'
    },
    {
        jobTitle: 'Computer Science Teacher',
        jobType: 'Full Time',
        dateAssigned: '2024-02-15',
        duration: '6 months',
        progress: 5,
        hours: 90,
        status: 'ongoing'
    },
    {
        jobTitle: 'Library Assistant',
        jobType: 'Part Time',
        dateAssigned: '2024-01-30',
        duration: '4 months',
        progress: 35,
        hours: 64,
        status: 'ongoing'
    }
];

    // Pagination and Search
    let itemsPerPage = 5;
    let currentPage = 1;
    let searchQuery = '';

    $: filteredBookings = currentBookings.filter(booking => 
        booking.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.jobType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.dateAssigned.includes(searchQuery)
    );

    $: totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
    $: paginatedBookings = filteredBookings.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    function changePage(page: number) {
        currentPage = page;
    }

    function nextPage() {
        if (currentPage < totalPages) currentPage++;
    }

    function prevPage() {
        if (currentPage > 1) currentPage--;
    }

    function handleView(booking: CurrentBooking) {
    selectedBooking = booking;
    showTimesheetDialog = true;
}

    function handlePrint(booking: CurrentBooking) {
        // Implement print logic
    }

    function handleExport(booking: CurrentBooking) {
        // Implement export logic
    }
</script>
<BookingDialog
    showDialog={showBookingDialog}
    onClose={() => showBookingDialog = false}
    onAssign={handleAssignJob}
/>
<div class="p-4">
    <div class="mb-4 flex justify-between items-center">
        <div>
            <h2 class="text-2xl font-bold text-gray-800">Current Bookings</h2>
            <p class="text-sm text-gray-600 mt-1">View and manage current job assignments</p>
        </div>
        <div class="flex items-center gap-2">
            <button 
            class="px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-1.5"
            on:click={handleBookNow}
        >
            <span class="material-icons-sharp text-xs">add</span>
            Book Now
        </button>
            <button class="px-3 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-1.5">
                <span class="material-icons-sharp text-xs">download</span>
                Export All
            </button>
       
        </div>
    </div>

    <!-- Search Bar -->
    <div class="mb-4 flex items-center gap-4">
        <div class="relative flex-1">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
                <span class="material-icons-sharp text-gray-400">search</span>
            </span>
            <input
                type="text"
                bind:value={searchQuery}
                placeholder="Search by job title, type or date..."
                class="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
        </div>
        <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">Show:</span>
            <select 
                bind:value={itemsPerPage}
                class="border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
            </select>
        </div>
    </div>

    <div class="bg-white shadow-[0_1rem_2rem_rgba(132,139,200,0.18)] rounded-lg overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Type</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Assigned</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    {#each paginatedBookings as booking}
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 text-sm text-gray-900">{booking.jobTitle}</td>
                            <td class="px-4 py-3 text-sm text-gray-600">{booking.jobType}</td>
                            <td class="px-4 py-3 text-sm text-gray-600">{booking.dateAssigned}</td>
                            <td class="px-4 py-3 text-sm text-gray-600">{booking.duration}</td>
                            <td class="px-4 py-3">
                                <div class="flex items-center">
                                    <div class="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            class="bg-gray-600 h-2 rounded-full" 
                                            style="width: {booking.progress}%"
                                        ></div>
                                    </div>
                                    <span class="ml-2 text-xs text-gray-600">{booking.progress}%</span>
                                </div>
                            </td>
                            <td class="px-4 py-3 text-sm text-gray-600">{booking.hours}h</td>
                            <td class="px-4 py-3 text-sm">
                                <div class="flex space-x-2">
                                    <button 
                                        class="p-1 hover:bg-gray-100 rounded-full"
                                        on:click={() => handleView(booking)}
                                    >
                                        <span class="material-icons-sharp text-gray-600 text-sm">visibility</span>
                                    </button>
                                    <button 
                                        class="p-1 hover:bg-gray-100 rounded-full"
                                        on:click={() => handlePrint(booking)}
                                    >
                                        <span class="material-icons-sharp text-gray-600 text-sm">print</span>
                                    </button>
                                    <button 
                                        class="p-1 hover:bg-gray-100 rounded-full"
                                        on:click={() => handleExport(booking)}
                                    >
                                        <span class="material-icons-sharp text-gray-600 text-sm">download</span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="px-4 py-3 flex items-center justify-between border-t border-gray-200">
            <div class="flex items-center">
                <p class="text-sm text-gray-700">
                    Showing <span class="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span class="font-medium">{Math.min(currentPage * itemsPerPage, filteredBookings.length)}</span> of <span class="font-medium">{filteredBookings.length}</span> results
                </p>
            </div>
            <div class="flex items-center space-x-2">
                <button
                    class="px-3 py-1 rounded-lg text-sm {currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
                    on:click={prevPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                
                {#each Array(totalPages) as _, i}
                    {#if totalPages <= 7 || i + 1 === 1 || i + 1 === totalPages || (i + 1 >= currentPage - 1 && i + 1 <= currentPage + 1)}
                        <button
                            class="px-3 py-1 rounded-lg text-sm {currentPage === i + 1 ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
                            on:click={() => changePage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    {:else if i + 1 === currentPage - 2 || i + 1 === currentPage + 2}
                        <span class="px-2 py-1 text-gray-500">...</span>
                    {/if}
                {/each}
                
                <button
                    class="px-3 py-1 rounded-lg text-sm {currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
                    on:click={nextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    </div>
</div>
{#if selectedBooking}
    <ViewTimesheetDialog
        showDialog={showTimesheetDialog}
        booking={selectedBooking}
        onClose={() => {
            showTimesheetDialog = false;
            selectedBooking = null;
        }}
    />
{/if}
