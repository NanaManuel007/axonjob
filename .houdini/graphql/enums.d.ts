
type ValuesOf<T> = T[keyof T]
	
export declare const AssignmentStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly COMPLETED: "COMPLETED";
    readonly ON_HOLD: "ON_HOLD";
    readonly TERMINATED: "TERMINATED";
}

export type AssignmentStatus$options = ValuesOf<typeof AssignmentStatus>
 
export declare const DedupeMatchMode: {
    readonly Variables: "Variables";
    readonly Operation: "Operation";
    readonly None: "None";
}

export type DedupeMatchMode$options = ValuesOf<typeof DedupeMatchMode>
 
export declare const JobStatus: {
    readonly ARCHIVED: "ARCHIVED";
    readonly CLOSED: "CLOSED";
    readonly DRAFT: "DRAFT";
    readonly PUBLISHED: "PUBLISHED";
}

export type JobStatus$options = ValuesOf<typeof JobStatus>
 
export declare const JobType: {
    readonly CONTRACT: "CONTRACT";
    readonly INTERNSHIP: "INTERNSHIP";
    readonly PART_TIME: "PART_TIME";
    readonly PERMANENT: "PERMANENT";
    readonly TEMPORARY: "TEMPORARY";
}

export type JobType$options = ValuesOf<typeof JobType>
 
export declare const PaymentType: {
    readonly DAILY: "DAILY";
    readonly MONTHLY: "MONTHLY";
    readonly PER_ANNUM: "PER_ANNUM";
    readonly PER_HOUR: "PER_HOUR";
    readonly PROJECT_BASED: "PROJECT_BASED";
}

export type PaymentType$options = ValuesOf<typeof PaymentType>
 
export declare const SortEnumType: {
    readonly ASC: "ASC";
    readonly DESC: "DESC";
}

export type SortEnumType$options = ValuesOf<typeof SortEnumType>
 
export declare const VerificationStatus: {
    readonly PENDING: "PENDING";
    readonly REJECTED: "REJECTED";
    readonly SUSPENDED: "SUSPENDED";
    readonly VERIFIED: "VERIFIED";
}

export type VerificationStatus$options = ValuesOf<typeof VerificationStatus>
 