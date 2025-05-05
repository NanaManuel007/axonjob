// import { GetClientJobsStore } from '$houdini';

// export async function fetchClientJobs(clientId: number) {
//     const clientJobsStore = new GetClientJobsStore();
//     await clientJobsStore.fetch({ variables: { clientId } });
//     return clientJobsStore;
// }

// export function mapJobData(jobs: any[]) {
//     return jobs.map(job => ({
//         ...job,
//         candidates: job.assignments?.length || 0,
//         datePosted: new Date(job.createdAt).toLocaleDateString(),
//         assignedCandidates: job.assignments?.map((assignment: {
//             candidate: {
//                 id: number;
//                 name: string;
//                 email: string;
//             };
//             status: string;
//         }) => ({
//             id: assignment.candidate.id,
//             name: assignment.candidate.name,
//             email: assignment.candidate.email,
//             status: assignment.status
//         })) || []
//     }));
// }


// import { GetClientJobsStore } from '$houdini';
// import { unauthorizedMsg } from '$lib/stores/authStore/authStore';

// export interface FetchJobsParams {
//     clientId: number;
//     skip: number;
//     searchQuery?: string;
// }

//job services


// export const fetchJobs = async ({ clientId, skip, searchQuery }: FetchJobsParams) => {
//     console.log("hi", unauthorizedMsg)

//     const clientJobsStore = new GetClientJobsStore();
    
//     try {
//         const result = await clientJobsStore.fetch({ 
//             variables: { 
//                 skip: skip,
//                 filter: {
//                     and: [
//                         { clientId: { eq: clientId } },
//                         {
//                             or: [
//                                 ...(searchQuery ? [
//                                     { title: { contains: searchQuery } },
//                                     { location: { contains: searchQuery } }
//                                 ] : [])
//                             ]
//                         }
//                     ]
//                 }
//             }
//         });

//         if (result.errors && result.errors.length > 0) {
           
//             throw new Error(result.errors[0].message);
//         }

//         return result.data;
//     } catch (err) {
//         throw err instanceof Error ? err : new Error('Failed to fetch jobs');
//     }
// };


import { AllJobsStore } from '$houdini';
import { unauthorizedMsg, authStore } from '$lib/stores/authStore/authStore';
import { goto } from '$app/navigation';
import { get } from 'svelte/store';
// Maps raw jobs data to the desired format
export function mapJobsData(jobs: any[]) {
    return jobs.map(item => {
        const assignment = item.assignments && item.assignments.length > 0 ? item.assignments[0] : null;
        return {
            id: item.id,
            jobId: `JOB-${item.id}`,
            jobTitle: item.title || 'Unknown',
            jobType: item.jobType || 'N/A',
            company: item.client?.companyName || 'Unknown Company',
            availableRoles: item.numberOfRoles || 0,
            appliedDate: item.createdAt || '',
            status: item.status || 'Pending',
            assignmentStatus: assignment?.status || 'Pending',
            user: {
                id: assignment?.candidateId || 0,
                name: assignment ? `Candidate #${assignment.candidateId}` : 'Unassigned',
                assignedAt: assignment?.assignedAt || '',
                image: null
            }
        };
    });
}

// Fetches jobs using the Houdini store and maps them, with error handling
export async function fetchAndMapAllJobs() {
    const store = new AllJobsStore();
    try {
        const result = await store.fetch();
        if (result.errors && result.errors.length > 0) {
            throw new Error(result.errors[0].message);
        }
        console.log("job items",result.data?.jobs?.items)
        return {
            jobs: mapJobsData(result.data?.jobs?.items || []),
            totalCount: result.data?.jobs?.totalCount || 0
        };
    } catch (error) {
        unauthorizedMsg.set(error instanceof Error? error.message : 'Failed to fetch jobs');
        console.log("hi", get(unauthorizedMsg))
        if (get(unauthorizedMsg) === "Unauthorized") {
            authStore.logout();
            goto('/');
        }
        throw error instanceof Error ? error : new Error('Failed to fetch jobs');
    }
}
// .