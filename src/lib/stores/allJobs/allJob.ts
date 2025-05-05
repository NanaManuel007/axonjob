interface Job {
    id: number;
    title: string;
    location: string;
    status: string;
    candidates: number;
    datePosted: string;
    jobType: string;
    createdAt: string; 
    assignedCandidates?: Candidate[];
}

interface Candidate {
    id: number;
    name: string;
    email: string;
    status: string;
}

export const updateJobs = async ({
    clientJobsStore,
    clientJobsData,
    clientId,
    searchQuery = '',
    selectedJobType = 'all',
    selectedStatus = 'all',
    currentPage = 1,
    itemsPerPage = 10
}: {
    clientJobsStore: any,
    clientJobsData: any,
    clientId: number,
    searchQuery?: string,
    selectedJobType?: string,
    selectedStatus?: string,
    currentPage?: number,
    itemsPerPage?: number
}) => {
    await clientJobsStore.fetch({ variables: { clientId } });
    
    if (clientJobsData?.data?.jobs?.items) {
        const jobs: Job[] = clientJobsData.data.jobs.items.map((job: any) => ({
            ...job,
            candidates: job.assignments?.length || 0,
            datePosted: new Date(job.createdAt).toLocaleDateString(),
            assignedCandidates: job.assignments?.map((assignment: any) => ({
                id: assignment.candidate.id,
                name: assignment.candidate.name,
                email: assignment.candidate.email,
                status: assignment.status
            })) || []
        }));

        const sortedJobs = jobs.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        const filtered = sortedJobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                job.location.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesJobType = selectedJobType === 'all' || job.jobType === selectedJobType;
            const matchesStatus = selectedStatus === 'all' || job.status === selectedStatus;
            return matchesSearch && matchesJobType && matchesStatus;
        });

        const totalPages = Math.ceil(filtered.length / itemsPerPage);
        const paginatedJobs = filtered.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );

        return {
            filteredJobs: paginatedJobs,
            totalPages,
            currentPage: Math.min(Math.max(1, currentPage), Math.max(1, totalPages))
        };
    }

    return {
        filteredJobs: [],
        totalPages: 1,
        currentPage: 1
    };
};