export type CustomerStatus = 'verified' | 'unverified' ;
export interface ClientData {
    id: number;
    companyName: string;
    companyLogo: string;
    logoBase64?: string;
    companyLocation: string;
    dateJoined: string;
    verificationStatus: string;
    logoMimeType?: string;
    // Additional fields
    ceoFirstName: string;
    ceoLastName: string;
    jobTitle: string;
    companyEmail: string;
    companyPhone: string;
    companyAddress: string;
    postalCode: string;
    registrationNumber: string;
    website: string;
    linkedIn: string;
    jobs?: Array<{
        id: number;
        status: string;
        published: boolean;
        assignments?: Array<any>;
    }>;

}

export interface Customer {
    id: number;
    companyName: string;
    companyImage: string;
    logoBase64?: string;
    logoMimeType?: string;
    companyLocation: string;
    dateJoined: string;
    verificationStatus: CustomerStatus;
    numberOfAttendingCandidate: number;
    // Additional fields
    ceoFirstName: string;
    ceoLastName: string;
    jobTitle: string;
    companyEmail: string;
    companyPhone: string;
    companyAddress: string;
    postalCode: string;
    registrationNumber: string;
    website: string;
    linkedIn: string;
    totalJobs: number;
    activeJobs: number;
    totalHires: number;

}
export function formatClientToCustomer(client: ClientData): Customer {
    // Calculate job statistics
    let totalJobs = 0;
    let activeJobs = 0;
    let totalHires = 0;

    if (client.jobs && Array.isArray(client.jobs)) {
        // Total number of jobs
        totalJobs = client.jobs.length;
        
        // Count active/published jobs
        activeJobs = client.jobs.filter(job => job.published === true).length;
        
        // Count total assignments (hires)
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
        logoBase64: client.logoBase64,
        logoMimeType: client.logoMimeType,
        dateJoined: new Date(client.dateJoined).toISOString().split('T')[0],
        verificationStatus: client.verificationStatus.toLowerCase() as CustomerStatus,
        numberOfAttendingCandidate: 0,
        ceoFirstName: client.ceoFirstName,
        ceoLastName: client.ceoLastName,
        jobTitle: client.jobTitle,
        companyEmail: client.companyEmail,
        companyPhone: client.companyPhone,
        companyAddress: client.companyAddress,
        postalCode: client.postalCode,
        registrationNumber: client.registrationNumber,
        website: client.website,
        linkedIn: client.linkedIn,
        totalJobs,
        activeJobs,
        totalHires
    };
}