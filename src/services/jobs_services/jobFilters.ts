export function filterJobs(
    jobs: any[],
    searchQuery: string,
    selectedJobType: string,
    selectedStatus: string
) {
    return jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            job.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesJobType = selectedJobType === 'all' || job.jobType === selectedJobType;
        const matchesStatus = selectedStatus === 'all' || job.status === selectedStatus;
        return matchesSearch && matchesJobType && matchesStatus;
    });
}

export function paginateJobs(jobs: any[], currentPage: number, itemsPerPage: number) {
    const totalPages = Math.ceil(jobs.length / itemsPerPage);
    const page = Math.min(Math.max(1, currentPage), Math.max(1, totalPages));
    
    return {
        paginatedJobs: jobs.slice(
            (page - 1) * itemsPerPage,
            page * itemsPerPage
        ),
        totalPages,
        currentPage: page
    };
}