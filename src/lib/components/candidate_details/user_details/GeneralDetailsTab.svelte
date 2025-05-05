<script lang="ts">
    import { fly } from 'svelte/transition';
    import type { Candidate } from '$lib/stores/allUsersStore/canditates';
    import CircularProgress from '../../client_details/CircularProgress.svelte';

    export let candidate: Candidate;

    const getStatusColor = (status: boolean) => {
        return status
            ? 'bg-[#86e49d] text-[#006b21]' 
            : 'bg-[#d893a3] text-[#b30021]';
    };

    const statistics = [
        { label: 'Jobs Applied', value: 15, percentage: 75, color: '#6366f1' },
        { label: 'Active Jobs', value: 3, percentage: 60, color: '#22c55e' },
        { label: 'Completed Jobs', value: 8, percentage: 80, color: '#3b82f6' }
    ];
</script>

<div 
    class="bg-white shadow-[0_2rem_3rem_rgba(132,139,200,0.18)] rounded-[15px] p-8"
    in:fly={{ x: 100, duration: 800, delay: 300 }}
>
    <div class="flex items-center gap-6 mb-8">
        <div class="w-24 h-24 rounded-full overflow-hidden shadow-lg">
            <img 
                src={candidate?.image} 
                alt={candidate?.name}
                class="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
            />
        </div>
        <div>
            <h3 class="text-3xl font-bold text-gray-800 mb-2">{candidate?.name}</h3>
            <p class="text-gray-600 flex items-center gap-2">
                <span class="material-icons-sharp text-sm">location_on</span>
                {candidate?.location}
            </p>
        </div>
        <div class="ml-auto">
            <span class="px-4 py-2 rounded-full {getStatusColor(candidate?.userVerified)} font-medium">
                {candidate?.userVerified ? 'Verified' : 'Pending'}
            </span>
        </div>
    </div>

    <div class="grid grid-cols-2 gap-8">
        <!-- Personal Information -->
        <div 
            class="space-y-6 p-6 bg-gray-50 rounded-xl"
            in:fly={{ x: 100, duration: 800, delay: 400 }}
        >
            <h4 class="text-xl font-semibold text-gray-800 mb-4">Personal Information</h4>
            <div class="space-y-4">
                <div class="flex items-center gap-3">
                    <span class="material-icons-sharp text-gray-600">person</span>
                    <div>
                        <p class="text-sm text-gray-500">Full Name</p>
                        <p class="text-gray-800 font-medium">{candidate?.name}</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <span class="material-icons-sharp text-gray-600">calendar_today</span>
                    <div>
                        <p class="text-sm text-gray-500">Date Joined</p>
                        <p class="text-gray-800 font-medium">{new Date(candidate?.joinedDate).toLocaleDateString()}</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <span class="material-icons-sharp text-gray-600">work</span>
                    <div>
                        <p class="text-sm text-gray-500">Current Status</p>
                        <p class="text-gray-800 font-medium">
                            {candidate?.adminVerified ? 'Active' : 'Pending Verification'}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Contact Information -->
        <div 
            class="space-y-6 p-6 bg-gray-50 rounded-xl"
            in:fly={{ x: 100, duration: 800, delay: 500 }}
        >
            <h4 class="text-xl font-semibold text-gray-800 mb-4">Contact Information</h4>
            <div class="space-y-4">
                <div class="flex items-center gap-3">
                    <span class="material-icons-sharp text-gray-600">email</span>
                    <div>
                        <p class="text-sm text-gray-500">Email</p>
                        <p class="text-gray-800 font-medium">{candidate?.email}</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <span class="material-icons-sharp text-gray-600">phone</span>
                    <div>
                        <p class="text-sm text-gray-500">Phone Number</p>
                        <p class="text-gray-800 font-medium">{candidate?.phoneNumber}</p>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <span class="material-icons-sharp text-gray-600">location_on</span>
                    <div>
                        <p class="text-sm text-gray-500">Location</p>
                        <p class="text-gray-800 font-medium">{candidate?.location}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Statistics -->
        <div 
            class="col-span-2 space-y-6 p-6 bg-gray-50 rounded-xl"
            in:fly={{ x: 100, duration: 800, delay: 600 }}
        >
            <h4 class="text-xl font-semibold text-gray-800 mb-4">Job Statistics</h4>
            <div class="grid grid-cols-3 gap-6">
                {#each statistics as stat}
                    <CircularProgress 
                        percentage={stat.percentage}
                        color={stat.color}
                        label={stat.label}
                        value={stat.value}
                    />
                {/each}
            </div>
        </div>
    </div>
</div>