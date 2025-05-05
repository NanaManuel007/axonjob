

<script lang="ts">
        import { createEventDispatcher } from 'svelte';
        const dispatch = createEventDispatcher();
    import Dialog from '../general_components/Dialog.svelte';

    const { show, application } = $props<{
        show: boolean;
        application: any;
    }>();

    let interviewDetails = $state({
        date: '',
        time: '',
        venue: '',
        duration: '1',
        documents: [] as string[],
        additionalNotes: ''
    });

    const documentOptions = [
        'CV/Resume',
        'Teaching Certificate',
        'ID/Passport',
        'Academic Transcripts',
        'Reference Letters',
        'Police Clearance',
        'Medical Certificate'
    ];

    const durationOptions = [
        { value: '0.5', label: '30 minutes' },
        { value: '1', label: '1 hour' },
        { value: '1.5', label: '1.5 hours' },
        { value: '2', label: '2 hours' }
    ];

    function handleSubmit() {
        dispatch('scheduleInterview', {
            applicationId: application?.id,
            ...interviewDetails
        });
        resetForm();
    }

    function resetForm() {
        interviewDetails = {
            date: '',
            time: '',
            venue: '',
            duration: '1',
            documents: [],
            additionalNotes: ''
        };
    }

    function handleClose() {
        resetForm();
        dispatch('close');
    }
</script>

<Dialog show={show} title="Schedule Interview" onClose={handleClose}>
    <div class="space-y-6">
        <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="font-medium text-gray-900">Interview Details</h3>
            <p class="text-sm text-gray-800 mt-1">
                Scheduling interview for {application?.user?.name} - {application?.jobTitle} at {application?.company}
            </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
                <label for="interview-date" class="block text-sm font-medium text-gray-700">Date</label>
                <input
                    type="date"
                    bind:value={interviewDetails.date}
                    class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    min={new Date().toISOString().split('T')[0]}
                    required
                />
            </div>

            <div class="space-y-2">
                <label for="time" class="block text-sm font-medium text-gray-700">Time</label>
                <input
                    type="time"
                    bind:value={interviewDetails.time}
                    class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>
        </div>

        <div class="space-y-2">
            <label for="venue" class="block text-sm font-medium text-gray-700">Venue</label>
            <input
                type="text"
                bind:value={interviewDetails.venue}
                placeholder="Enter interview location"
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
            />
        </div>

        <div class="space-y-2">
            <label for="duration" class="block text-sm font-medium text-gray-700">Duration</label>
            <select
                bind:value={interviewDetails.duration}
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                {#each durationOptions as option}
                    <option value={option.value}>{option.label}</option>
                {/each}
            </select>
        </div>

        <div class="space-y-2">
            <label for="required_documents" class="block text-sm font-medium text-gray-700">
                Required Documents
            </label>
            <div class="grid grid-cols-2 gap-2">
                {#each documentOptions as document}
                    <label class="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            value={document}
                            bind:group={interviewDetails.documents}
                            class="rounded text-blue-600 focus:ring-blue-400"
                        />
                        <span class="text-sm">{document}</span>
                    </label>
                {/each}
            </div>
        </div>

        <div class="space-y-2">
            <label for="additional_notes" class="block text-sm font-medium text-gray-700">
                Additional Notes
            </label>
            <textarea
                bind:value={interviewDetails.additionalNotes}
                placeholder="Any additional information for the candidate..."
                class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 h-24 resize-none"
            ></textarea>
        </div>
    </div>

    <svelte:fragment slot="actions">
        <button
            class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            onclick={handleClose}
        >
            Cancel
        </button>
        <button
            class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            onclick={handleSubmit}
        >
            Schedule Interview
        </button>
    </svelte:fragment>
</Dialog>