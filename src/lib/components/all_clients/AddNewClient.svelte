<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';
    import InputField from '../general_components/InputField.svelte';
    import GoogleMaps from '../general_components/GoogleMaps.svelte';
    import Toast from '../general_components/Toast.svelte';
    import { CreateClientStore, UpdateClientStore } from '$houdini';
    import { clientSchema, type ClientFormData } from '$lib/schemas/createClient';
    import { customers } from '$lib/stores/allClientsStore/customers';
    
    const dispatch = createEventDispatcher();
    const { showModal, existingClient = null } = $props<{ 
        showModal: boolean;
        existingClient?: {
            id: number;
            companyName: string;
            ceoFirstName: string;
            ceoLastName: string;
            jobTitle: string;
            companyEmail: string;
            companyPhone: string;
            companyAddress: string;
            postalCode: string;
            registrationNumber: string;
            website: string;
            companyLocation: string;
            linkedIn: string;
            compnayLogo: string;
        } | null;
    }>();

    const createStore = new CreateClientStore();
    const updateStore = new UpdateClientStore();
    let isLoading = $state(false);
    let showToast = $state(false);
    let toastMessage = $state('');
    let errors = $state<Partial<Record<keyof ClientFormData, string>>>({});
    let companyLogo: File | null = null;
    let base64Logo: string | null = existingClient?.compnayLogo || null;

    let formData = $state({
        companyName: existingClient?.companyName || '',
        ceoFirstName: existingClient?.ceoFirstName || '',
        ceoLastName: existingClient?.ceoLastName || '',
        jobTitle: existingClient?.jobTitle || '',
        companyEmail: existingClient?.companyEmail || '',
        companyNumber: existingClient?.companyPhone || '',
        companyAddress: existingClient?.companyAddress || '',
        postalCode: existingClient?.postalCode || '',
        registrationNumber: existingClient?.registrationNumber || '',
        website: existingClient?.website || '',
        linkedin: existingClient?.linkedIn || '',
        latitude: '',
        longitude: '',
        mapsLocation: existingClient?.companyLocation || '',
        companyLogo: existingClient?.compnayLogo || null
    });

    function handleClose() {
        dispatch('close');
    }

    async function handleLocationSelect(lat: number, lng: number, address: string) {
        formData.latitude = lat.toString();
        formData.longitude = lng.toString();
        formData.mapsLocation = address;
    }

    function fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    }

    async function handleFileChange(event: Event) {
        const input = event.target as HTMLInputElement;

        if (!input.files || input.files.length === 0) {
            if (!existingClient) {
                errors = {
                    ...errors,
                    companyLogo: 'Company logo is required'
                } as typeof errors;
            }
            companyLogo = null;
            // Keep existing logo if updating client
            if (!existingClient) {
                base64Logo = null;
                formData = {
                    ...formData,
                    companyLogo: null
                };
            }
            return;
        }

        const file = input.files[0];
        companyLogo = file;
        
        try {
            // Convert the file to base64
            base64Logo = await fileToBase64(file);
            formData = {
                ...formData,
                companyLogo: base64Logo
            };
            
            if ('companyLogo' in errors) {
                delete errors['companyLogo'];
                errors = { ...errors };
            }
        } catch (error) {
            console.error('Error converting file to base64:', error);
            errors = {
                ...errors,
                companyLogo: 'Error processing image'
            } as typeof errors;
        }
    }

    // async function handleSubmit() {
    //     try {
    //         isLoading = true;
    //         const validatedData = clientSchema.parse(formData);
    //         errors = {};

    //         const { 
    //             companyNumber,
    //             linkedin,
    //             latitude,
    //             longitude,
    //             mapsLocation,
    //             ...inputData
    //         } = validatedData;

    //         // Determine if we're dealing with a URL string or base64 data
    //         let logoData = {};
            
    //         if (base64Logo) {
    //             // If it starts with data:image, it's a base64 image from file upload
    //             if (base64Logo.startsWith('data:image')) {
    //                 logoData = { logoImg: base64Logo };
    //             } else {
    //                 // It's a URL string
    //                 logoData = { companyLogo: base64Logo };
    //             }
    //         } else if (formData.companyLogo && typeof formData.companyLogo === 'string') {
    //             // Handle existing URL string
    //             logoData = { companyLogo: formData.companyLogo };
    //         }

    //         if (existingClient) {
    //             const response = await updateStore.mutate({
    //                 input: {
    //                     id: existingClient.id,
    //                     input: {
    //                         ...inputData,
    //                         companyLocation: formData.mapsLocation,
    //                         companyPhone: formData.companyNumber,
    //                         linkedIn: formData.linkedin,
    //                         ...logoData
    //                     }
    //                 }
    //             });

    //             const result = response.data?.updateClient;
    //             if (!result) {
    //                 toastMessage = 'Failed to update client';
    //                 showToast = true;
    //                 return;
    //             }

    //             if (result.success) {
    //                 toastMessage = 'Client updated successfully!';
    //                 showToast = true;
                    
    //                 try {
    //                     const { GetClientsStore } = await import('$houdini');
    //                     const clientsStore = new GetClientsStore();
    //                     await Promise.all([
    //                         clientsStore.fetch({ policy: 'NetworkOnly' }),
    //                         customers.fetch()
    //                     ]);
                        
    //                     dispatch('clientUpdated', {
    //                         updatedClient: result.result,
    //                         refreshData: true
    //                     });
    //                     handleClose();
    //                 } catch (fetchError) {
    //                     console.error('Error refreshing data:', fetchError);
    //                 }
    //             }
    //         } else {
    //             const response = await createStore.mutate({
    //                 input: {
    //                     ...inputData,
    //                     companyLocation: formData.mapsLocation,
    //                     companyPhone: formData.companyNumber,
    //                     verificationStatus: 'PENDING',
    //                     ...logoData
    //                 }
    //             });

    //             const result = response.data?.createClient;
    //             if (!result) {
    //                 toastMessage = 'Failed to create client';
    //                 showToast = true;
    //                 return;
    //             }

    //             if (result.success) {
    //                 toastMessage = 'Client created successfully!';
    //                 showToast = true;
                    
    //                 try {
    //                     const { GetClientsStore } = await import('$houdini');
    //                     const clientsStore = new GetClientsStore();
    //                     await Promise.all([
    //                         clientsStore.fetch({ policy: 'NetworkOnly' }),
    //                         customers.fetch()
    //                     ]);
                        
    //                     dispatch('clientCreated', {
    //                         newClient: result.result,
    //                         refreshData: true
    //                     });
    //                     handleClose();
    //                 } catch (fetchError) {
    //                     console.error('Error refreshing data:', fetchError);
    //                 }
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //         if (error instanceof Error) {
    //             toastMessage = error.message;
    //         } else {
    //             toastMessage = 'An unexpected error occurred';
    //         }
    //         showToast = true;
    //     } finally {
    //         isLoading = false;
    //         setTimeout(() => showToast = false, 3000);
    //     }
    // }

        async function handleSubmit() {
        try {
            isLoading = true;
            const validatedData = clientSchema.parse(formData);
            errors = {};

            const { 
                companyNumber,
                linkedin,
                latitude,
                longitude,
                mapsLocation,
                ...inputData
            } = validatedData;

            // Determine if we're dealing with a URL string or file upload
            let logoData = {};
            
            // For file uploads, we need to use the actual File object
            if (companyLogo) {
                logoData = { logoImg: companyLogo };
            } 
            // For existing URL strings (not base64)
            else if (base64Logo && !base64Logo.startsWith('data:image')) {
                logoData = { companyLogo: base64Logo };
            }
            // For existing URL in formData
            else if (formData.companyLogo && typeof formData.companyLogo === 'string' && !formData.companyLogo.startsWith('data:image')) {
                logoData = { companyLogo: formData.companyLogo };
            }

            if (existingClient) {
                const response = await updateStore.mutate({
                    input: {
                        id: existingClient.id,
                        input: {
                            ...inputData,
                            companyLocation: formData.mapsLocation,
                            companyPhone: formData.companyNumber,
                            linkedIn: formData.linkedin,
                            ...logoData
                        }
                    }
                });

                const result = response.data?.updateClient;
                if (!result) {
                    toastMessage = 'Failed to update client';
                    showToast = true;
                    return;
                }

                if (result.success) {
                    toastMessage = 'Client updated successfully!';
                    showToast = true;
                    
                    try {
                        const { GetClientsStore } = await import('$houdini');
                        const clientsStore = new GetClientsStore();
                        await Promise.all([
                            clientsStore.fetch({ policy: 'NetworkOnly' }),
                            customers.fetch()
                        ]);
                        
                        dispatch('clientUpdated', {
                            updatedClient: result.result,
                            refreshData: true
                        });
                        handleClose();
                    } catch (fetchError) {
                        console.error('Error refreshing data:', fetchError);
                    }
                }
            } else {
                const response = await createStore.mutate({
                    input: {
                        ...inputData,
                        companyLocation: formData.mapsLocation,
                        companyPhone: formData.companyNumber,
                        verificationStatus: 'PENDING',
                        ...logoData
                    }
                });

                const result = response.data?.createClient;
                if (!result) {
                    toastMessage = 'Failed to create client';
                    showToast = true;
                    return;
                }

                if (result.success) {
                    toastMessage = 'Client created successfully!';
                    showToast = true;
                    
                    try {
                        const { GetClientsStore } = await import('$houdini');
                        const clientsStore = new GetClientsStore();
                        await Promise.all([
                            clientsStore.fetch({ policy: 'NetworkOnly' }),
                            customers.fetch()
                        ]);
                        
                        dispatch('clientCreated', {
                            newClient: result.result,
                            refreshData: true
                        });
                        handleClose();
                    } catch (fetchError) {
                        console.error('Error refreshing data:', fetchError);
                    }
                }
            }
        } catch (error) {
            console.error('Error:', error);
            if (error instanceof Error) {
                toastMessage = error.message;
            } else {
                toastMessage = 'An unexpected error occurred';
            }
            showToast = true;
        } finally {
            isLoading = false;
            setTimeout(() => showToast = false, 3000);
        }
    }
</script>

<Toast message={toastMessage} show={showToast} />

{#if showModal}
<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto py-5" transition:fade>
    <div class="bg-white rounded-lg w-full max-w-[95%] p-8 relative my-auto">
        <button 
            onclick={handleClose}
            class="absolute top-6 right-8 text-gray-500 hover:text-gray-700"
        >
            <span class="material-icons-sharp">close</span>
        </button>
        
        <h2 class="text-2xl font-semibold mb-6 text-gray-800">
            {existingClient ? 'Update Company' : 'Add New Company'}
        </h2>
        
        <div class="flex gap-8">
            <div class="w-[60%] overflow-y-auto max-h-[70vh] pr-5 pl-5">
                <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-6">
                    <div class="grid grid-cols-2 gap-4">
                        <InputField 
                            label="Company Name"
                            icon="business"
                            placeholder="Enter company name"
                            required={true}
                            bind:value={formData.companyName}
                            error={errors.companyName}
                            disabled={isLoading}
                        />
                        <InputField 
                            label="CEO First Name"
                            icon="person"
                            placeholder="Enter CEO first name"
                            required={true}
                            bind:value={formData.ceoFirstName}
                            error={errors.ceoFirstName}
                            disabled={isLoading}
                        />
                        <InputField 
                            label="CEO Last Name"
                            icon="person"
                            placeholder="Enter CEO last name"
                            required={true}
                            bind:value={formData.ceoLastName}
                            error={errors.ceoLastName}
                            disabled={isLoading}
                        />
                        <InputField 
                            label="Job Title"
                            icon="work"
                            placeholder="Enter job title"
                            bind:value={formData.jobTitle}
                            error={errors.jobTitle}
                            disabled={isLoading}
                        />
                        <InputField 
                            label="Company Email"
                            type="email"
                            icon="email"
                            placeholder="Enter company email"
                            required={true}
                            bind:value={formData.companyEmail}
                            error={errors.companyEmail}
                            disabled={isLoading}
                        />
                        <InputField 
                            label="Company Phone"
                            type="tel"
                            icon="phone"
                            placeholder="Enter company phone number"
                            required={true}
                            bind:value={formData.companyNumber}
                            error={errors.companyNumber}
                            disabled={isLoading}
                        />
                        <InputField 
                            label="Company Address"
                            icon="location_on"
                            placeholder="Enter company address"
                            required={true}
                            bind:value={formData.companyAddress}
                            error={errors.companyAddress}
                            disabled={isLoading}
                        />
                        <InputField 
                            label="Postal Code"
                            icon="local_post_office"
                            placeholder="Enter postal code"
                            required={true}
                            bind:value={formData.postalCode}
                            error={errors.postalCode}
                            disabled={isLoading}
                        />
                        <InputField 
                            label="Registration Number"
                            icon="numbers"
                            placeholder="Enter company registration number"
                            required={true}
                            bind:value={formData.registrationNumber}
                            error={errors.registrationNumber}
                            disabled={isLoading}
                        />
                        <InputField 
                            label="Website"
                            type="url"
                            icon="language"
                            placeholder="Enter company website"
                            bind:value={formData.website}
                            error={errors.website}
                            disabled={isLoading}
                        />
                        <InputField 
                            label="LinkedIn"
                            type="url"
                            icon="link"
                            placeholder="Enter LinkedIn profile URL"
                            bind:value={formData.linkedin}
                            error={errors.linkedin}
                            disabled={isLoading}
                        />
                        <InputField 
                            label="Location Coordinates"
                            icon="location_searching"
                            placeholder="Click on map to set location"
                            value={formData.mapsLocation}
                            readonly={true}
                            error={errors.mapsLocation}
                            disabled={isLoading}
                        />
                        <div class="col-span-2">
                            <label for="companyLogo" class="mb-1 block text-sm font-medium text-gray-700">
                                Company Logo {#if 'companyLogo' in errors}<span class="text-red-500">*</span>{/if}
                            </label>
                            <div class="relative">
                                <span class="material-icons-sharp absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
                                    image
                                </span>
                                <input
                                    id="companyLogo"
                                    type="file"
                                    accept="image/*"
                                    onchange={handleFileChange}
                                    class="w-full border py-2.5 pr-3 pl-10 {'companyLogo' in errors
                                        ? 'border-red-500'
                                        : 'border-gray-300'} rounded-lg focus:ring-2 focus:outline-none {'companyLogo' in errors
                                        ? 'focus:ring-red-400'
                                        : 'focus:ring-gray-400'} transition-all duration-200 file:mr-4
                                        file:rounded-full file:border-0 file:bg-gray-50 file:px-4 file:py-2 file:text-sm file:font-semibold
                                        file:text-gray-700 hover:file:bg-gray-100 focus:border-transparent"
                                />
                            </div>
                            {#if 'companyLogo' in errors}
                                <p class="mt-1 text-sm text-red-600">{errors['companyLogo']}</p>
                            {/if}
                            {#if base64Logo && !base64Logo.startsWith('data:image')}
                                <div class="mt-2">
                                    <p class="text-sm text-gray-600">Current logo:</p>
                                    <img src={base64Logo} alt="Company Logo" class="h-16 mt-1 rounded" />
                                </div>
                            {/if}
                            {#if base64Logo && base64Logo.startsWith('data:image')}
                                <div class="mt-2">
                                    <p class="text-sm text-gray-600">Selected logo:</p>
                                    <img src={base64Logo} alt="Company Logo" class="h-16 mt-1 rounded" />
                                </div>
                            {/if}
                        </div>
                    </div>

                    <div class="flex justify-end gap-3 mt-6">
                        <button 
                            type="button"
                            onclick={handleClose}
                            class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            class="px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center min-w-[120px]"
                            disabled={isLoading}
                        >
                            {#if isLoading}
                                <svg class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                </svg>
                            {/if}
                            {isLoading ? (existingClient ? 'Updating...' : 'Creating...') : (existingClient ? 'Update Company' : 'Add Company')}
                        </button>
                    </div>
                </form>
            </div>

            <div class="w-[40%] h-[70vh] rounded-lg overflow-hidden">
                <GoogleMaps onLocationSelect={handleLocationSelect} />
            </div>
        </div>
    </div>
</div>
{/if}