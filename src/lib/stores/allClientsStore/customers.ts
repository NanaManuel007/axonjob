import { writable } from 'svelte/store';
import { GetClientsStore } from '$houdini';
import type { Customer, } from './allClients.type';

function createCustomersStore() {
    const { subscribe, set, update } = writable<Customer[]>([]);
    const clientsStore = new GetClientsStore();

    async function fetchCustomers() {
        try {
            const result = await clientsStore.fetch();
            
            if (result.data?.clients?.items) {
                const formattedCustomers = result.data.clients.items.map(client => {
                    let totalJobs = 0;
                    let activeJobs = 0;
                    let totalHires = 0;

                    if (client.jobs && Array.isArray(client.jobs)) {
                        totalJobs = client.jobs.length;
                        activeJobs = client.jobs.filter(job => job.published === true).length;
                        totalHires = client.jobs.reduce((total, job) => {
                            if (job.assignments && Array.isArray(job.assignments)) {
                                return total + job.assignments.length;
                            }
                            return total;
                        }, 0);
                    }

                    return {
                        id: client.id,
                        companyName: client.companyName,
                        companyImage: client.companyLogo || '/src/lib/assets/images/default.png',
                        companyLocation: client.companyLocation,
                        dateJoined: new Date(client.dateJoined).toISOString().split('T')[0],
                        verificationStatus: client.verificationStatus.toLowerCase() as 'verified' | 'unverified',
                        numberOfAttendingCandidate: 0,
                        // Add missing required fields
                        ceoFirstName: client.ceoFirstName || '',
                        ceoLastName: client.ceoLastName || '',
                        jobTitle: client.jobTitle || '',
                        companyEmail: client.companyEmail || '',
                        companyPhone: client.companyPhone || '',
                        companyAddress: client.companyAddress || '',
                        postalCode: client.postalCode || '',
                        registrationNumber: client.registrationNumber || '',
                        website: client.website || '',
                        linkedIn: client.linkedIn || '',
                        totalJobs,
                        activeJobs,
                        totalHires
                    };
                });
                set(formattedCustomers);
            }
        } catch (error) {
            console.error('Error fetching customers:', error);
            set([]);
        }
    }

    return {
        subscribe,
        fetch: fetchCustomers,
        refresh: fetchCustomers
    };
}

export const customers = createCustomersStore();