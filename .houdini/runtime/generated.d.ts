import type { Record } from "./public/record";
import { AllUser$result, AllUser$input } from "../../$houdini/artifacts/AllUser";
import { AllUserStore } from "../plugins/houdini-svelte/stores/AllUser";
import { AllJobs$result, AllJobs$input } from "../../$houdini/artifacts/AllJobs";
import { AllJobsStore } from "../plugins/houdini-svelte/stores/AllJobs";
import { AllPermission$result, AllPermission$input } from "../../$houdini/artifacts/AllPermission";
import { AllPermissionStore } from "../plugins/houdini-svelte/stores/AllPermission";
import { AllCandidates$result, AllCandidates$input } from "../../$houdini/artifacts/AllCandidates";
import { AllCandidatesStore } from "../plugins/houdini-svelte/stores/AllCandidates";
import { AllRoles$result, AllRoles$input } from "../../$houdini/artifacts/AllRoles";
import { AllRolesStore } from "../plugins/houdini-svelte/stores/AllRoles";
import { GetCandidates$result, GetCandidates$input } from "../../$houdini/artifacts/GetCandidates";
import { GetCandidatesStore } from "../plugins/houdini-svelte/stores/GetCandidates";
import { GetClients$result, GetClients$input } from "../../$houdini/artifacts/GetClients";
import { GetClientsStore } from "../plugins/houdini-svelte/stores/GetClients";
import { GetClientJobs$result, GetClientJobs$input } from "../../$houdini/artifacts/GetClientJobs";
import { GetClientJobsStore } from "../plugins/houdini-svelte/stores/GetClientJobs";
import { GetRolePermissions$result, GetRolePermissions$input } from "../../$houdini/artifacts/GetRolePermissions";
import { GetRolePermissionsStore } from "../plugins/houdini-svelte/stores/GetRolePermissions";
import { UserDataAndPermissions$result, UserDataAndPermissions$input } from "../../$houdini/artifacts/UserDataAndPermissions";
import { UserDataAndPermissionsStore } from "../plugins/houdini-svelte/stores/UserDataAndPermissions";
import type { AssignmentStatus } from "$houdini/graphql/enums";
import type { JobStatus } from "$houdini/graphql/enums";
import type { PaymentType } from "$houdini/graphql/enums";
import type { JobType } from "$houdini/graphql/enums";
import type { ValueOf } from "$houdini/runtime/lib/types";
import type { SortEnumType } from "$houdini/graphql/enums";

type CandidateSortInput = {
    createdAt?: ValueOf<typeof SortEnumType> | null | undefined;
    email?: ValueOf<typeof SortEnumType> | null | undefined;
    experience?: ValueOf<typeof SortEnumType> | null | undefined;
    id?: ValueOf<typeof SortEnumType> | null | undefined;
    name?: ValueOf<typeof SortEnumType> | null | undefined;
    phone?: ValueOf<typeof SortEnumType> | null | undefined;
    updatedAt?: ValueOf<typeof SortEnumType> | null | undefined;
    verified?: ValueOf<typeof SortEnumType> | null | undefined;
};

type DateTimeOperationFilterInput = {
    eq?: Date | null | undefined;
    gt?: Date | null | undefined;
    gte?: Date | null | undefined;
    in?: (Date | null | undefined)[] | null | undefined;
    lt?: Date | null | undefined;
    lte?: Date | null | undefined;
    neq?: Date | null | undefined;
    ngt?: Date | null | undefined;
    ngte?: Date | null | undefined;
    nin?: (Date | null | undefined)[] | null | undefined;
    nlt?: Date | null | undefined;
    nlte?: Date | null | undefined;
};

type LongOperationFilterInput = {
    eq?: number | null | undefined;
    gt?: number | null | undefined;
    gte?: number | null | undefined;
    in?: (number | null | undefined)[] | null | undefined;
    lt?: number | null | undefined;
    lte?: number | null | undefined;
    neq?: number | null | undefined;
    ngt?: number | null | undefined;
    ngte?: number | null | undefined;
    nin?: (number | null | undefined)[] | null | undefined;
    nlt?: number | null | undefined;
    nlte?: number | null | undefined;
};

type StringOperationFilterInput = {
    and?: (StringOperationFilterInput)[] | null | undefined;
    contains?: string | null | undefined;
    endsWith?: string | null | undefined;
    eq?: string | null | undefined;
    in?: (string | null | undefined)[] | null | undefined;
    ncontains?: string | null | undefined;
    nendsWith?: string | null | undefined;
    neq?: string | null | undefined;
    nin?: (string | null | undefined)[] | null | undefined;
    nstartsWith?: string | null | undefined;
    or?: (StringOperationFilterInput)[] | null | undefined;
    startsWith?: string | null | undefined;
};

type ListFilterInputTypeOfJobFilterInput = {
    all?: JobFilterInput | null | undefined;
    any?: boolean | null | undefined;
    none?: JobFilterInput | null | undefined;
    some?: JobFilterInput | null | undefined;
};

type ClientFilterInput = {
    and?: (ClientFilterInput)[] | null | undefined;
    ceoFirstName?: StringOperationFilterInput | null | undefined;
    ceoLastName?: StringOperationFilterInput | null | undefined;
    companyAddress?: StringOperationFilterInput | null | undefined;
    companyEmail?: StringOperationFilterInput | null | undefined;
    companyLocation?: StringOperationFilterInput | null | undefined;
    companyLogo?: StringOperationFilterInput | null | undefined;
    companyName?: StringOperationFilterInput | null | undefined;
    companyPhone?: StringOperationFilterInput | null | undefined;
    createdAt?: DateTimeOperationFilterInput | null | undefined;
    dateJoined?: DateTimeOperationFilterInput | null | undefined;
    id?: LongOperationFilterInput | null | undefined;
    jobTitle?: StringOperationFilterInput | null | undefined;
    jobs?: ListFilterInputTypeOfJobFilterInput | null | undefined;
    linkedIn?: StringOperationFilterInput | null | undefined;
    locationCoordinates?: StringOperationFilterInput | null | undefined;
    logoBase64?: StringOperationFilterInput | null | undefined;
    logoMimeType?: StringOperationFilterInput | null | undefined;
    or?: (ClientFilterInput)[] | null | undefined;
    postalCode?: StringOperationFilterInput | null | undefined;
    registrationNumber?: StringOperationFilterInput | null | undefined;
    updatedAt?: DateTimeOperationFilterInput | null | undefined;
    verificationStatus?: StringOperationFilterInput | null | undefined;
    website?: StringOperationFilterInput | null | undefined;
};

type ListStringOperationFilterInput = {
    all?: StringOperationFilterInput | null | undefined;
    any?: boolean | null | undefined;
    none?: StringOperationFilterInput | null | undefined;
    some?: StringOperationFilterInput | null | undefined;
};

type JobTypeOperationFilterInput = {
    eq?: ValueOf<typeof JobType> | null | undefined;
    in?: (ValueOf<typeof JobType>)[] | null | undefined;
    neq?: ValueOf<typeof JobType> | null | undefined;
    nin?: (ValueOf<typeof JobType>)[] | null | undefined;
};

type IntOperationFilterInput = {
    eq?: number | null | undefined;
    gt?: number | null | undefined;
    gte?: number | null | undefined;
    in?: (number | null | undefined)[] | null | undefined;
    lt?: number | null | undefined;
    lte?: number | null | undefined;
    neq?: number | null | undefined;
    ngt?: number | null | undefined;
    ngte?: number | null | undefined;
    nin?: (number | null | undefined)[] | null | undefined;
    nlt?: number | null | undefined;
    nlte?: number | null | undefined;
};

type PaymentTypeOperationFilterInput = {
    eq?: ValueOf<typeof PaymentType> | null | undefined;
    in?: (ValueOf<typeof PaymentType>)[] | null | undefined;
    neq?: ValueOf<typeof PaymentType> | null | undefined;
    nin?: (ValueOf<typeof PaymentType>)[] | null | undefined;
};

type BooleanOperationFilterInput = {
    eq?: boolean | null | undefined;
    neq?: boolean | null | undefined;
};

type DecimalOperationFilterInput = {
    eq?: number | null | undefined;
    gt?: number | null | undefined;
    gte?: number | null | undefined;
    in?: (number | null | undefined)[] | null | undefined;
    lt?: number | null | undefined;
    lte?: number | null | undefined;
    neq?: number | null | undefined;
    ngt?: number | null | undefined;
    ngte?: number | null | undefined;
    nin?: (number | null | undefined)[] | null | undefined;
    nlt?: number | null | undefined;
    nlte?: number | null | undefined;
};

type JobStatusOperationFilterInput = {
    eq?: ValueOf<typeof JobStatus> | null | undefined;
    in?: (ValueOf<typeof JobStatus>)[] | null | undefined;
    neq?: ValueOf<typeof JobStatus> | null | undefined;
    nin?: (ValueOf<typeof JobStatus>)[] | null | undefined;
};

type JobFilterInput = {
    and?: (JobFilterInput)[] | null | undefined;
    assignments?: ListFilterInputTypeOfJobAssignmentFilterInput | null | undefined;
    client?: ClientFilterInput | null | undefined;
    clientId?: LongOperationFilterInput | null | undefined;
    createdAt?: DateTimeOperationFilterInput | null | undefined;
    duties?: ListStringOperationFilterInput | null | undefined;
    id?: LongOperationFilterInput | null | undefined;
    jobHours?: StringOperationFilterInput | null | undefined;
    jobType?: JobTypeOperationFilterInput | null | undefined;
    location?: StringOperationFilterInput | null | undefined;
    numberOfRoles?: IntOperationFilterInput | null | undefined;
    or?: (JobFilterInput)[] | null | undefined;
    paymentType?: PaymentTypeOperationFilterInput | null | undefined;
    published?: BooleanOperationFilterInput | null | undefined;
    requirements?: ListStringOperationFilterInput | null | undefined;
    salaryPerAnnum?: DecimalOperationFilterInput | null | undefined;
    startDate?: DateTimeOperationFilterInput | null | undefined;
    status?: JobStatusOperationFilterInput | null | undefined;
    title?: StringOperationFilterInput | null | undefined;
    updatedAt?: DateTimeOperationFilterInput | null | undefined;
};

type AssignmentStatusOperationFilterInput = {
    eq?: ValueOf<typeof AssignmentStatus> | null | undefined;
    in?: (ValueOf<typeof AssignmentStatus>)[] | null | undefined;
    neq?: ValueOf<typeof AssignmentStatus> | null | undefined;
    nin?: (ValueOf<typeof AssignmentStatus>)[] | null | undefined;
};

type JobAssignmentFilterInput = {
    and?: (JobAssignmentFilterInput)[] | null | undefined;
    assignedAt?: DateTimeOperationFilterInput | null | undefined;
    candidate?: CandidateFilterInput | null | undefined;
    candidateId?: LongOperationFilterInput | null | undefined;
    id?: LongOperationFilterInput | null | undefined;
    job?: JobFilterInput | null | undefined;
    jobId?: LongOperationFilterInput | null | undefined;
    or?: (JobAssignmentFilterInput)[] | null | undefined;
    status?: AssignmentStatusOperationFilterInput | null | undefined;
};

type ListFilterInputTypeOfJobAssignmentFilterInput = {
    all?: JobAssignmentFilterInput | null | undefined;
    any?: boolean | null | undefined;
    none?: JobAssignmentFilterInput | null | undefined;
    some?: JobAssignmentFilterInput | null | undefined;
};

type CandidateFilterInput = {
    and?: (CandidateFilterInput)[] | null | undefined;
    assignments?: ListFilterInputTypeOfJobAssignmentFilterInput | null | undefined;
    createdAt?: DateTimeOperationFilterInput | null | undefined;
    email?: StringOperationFilterInput | null | undefined;
    experience?: StringOperationFilterInput | null | undefined;
    id?: LongOperationFilterInput | null | undefined;
    name?: StringOperationFilterInput | null | undefined;
    or?: (CandidateFilterInput)[] | null | undefined;
    phone?: StringOperationFilterInput | null | undefined;
    skills?: ListStringOperationFilterInput | null | undefined;
    updatedAt?: DateTimeOperationFilterInput | null | undefined;
    verified?: BooleanOperationFilterInput | null | undefined;
};

type ClientSortInput = {
    ceoFirstName?: ValueOf<typeof SortEnumType> | null | undefined;
    ceoLastName?: ValueOf<typeof SortEnumType> | null | undefined;
    companyAddress?: ValueOf<typeof SortEnumType> | null | undefined;
    companyEmail?: ValueOf<typeof SortEnumType> | null | undefined;
    companyLocation?: ValueOf<typeof SortEnumType> | null | undefined;
    companyLogo?: ValueOf<typeof SortEnumType> | null | undefined;
    companyName?: ValueOf<typeof SortEnumType> | null | undefined;
    companyPhone?: ValueOf<typeof SortEnumType> | null | undefined;
    createdAt?: ValueOf<typeof SortEnumType> | null | undefined;
    dateJoined?: ValueOf<typeof SortEnumType> | null | undefined;
    id?: ValueOf<typeof SortEnumType> | null | undefined;
    jobTitle?: ValueOf<typeof SortEnumType> | null | undefined;
    linkedIn?: ValueOf<typeof SortEnumType> | null | undefined;
    locationCoordinates?: ValueOf<typeof SortEnumType> | null | undefined;
    logoBase64?: ValueOf<typeof SortEnumType> | null | undefined;
    logoMimeType?: ValueOf<typeof SortEnumType> | null | undefined;
    postalCode?: ValueOf<typeof SortEnumType> | null | undefined;
    registrationNumber?: ValueOf<typeof SortEnumType> | null | undefined;
    updatedAt?: ValueOf<typeof SortEnumType> | null | undefined;
    verificationStatus?: ValueOf<typeof SortEnumType> | null | undefined;
    website?: ValueOf<typeof SortEnumType> | null | undefined;
};

type JobSortInput = {
    client?: ClientSortInput | null | undefined;
    clientId?: ValueOf<typeof SortEnumType> | null | undefined;
    createdAt?: ValueOf<typeof SortEnumType> | null | undefined;
    id?: ValueOf<typeof SortEnumType> | null | undefined;
    jobHours?: ValueOf<typeof SortEnumType> | null | undefined;
    jobType?: ValueOf<typeof SortEnumType> | null | undefined;
    location?: ValueOf<typeof SortEnumType> | null | undefined;
    numberOfRoles?: ValueOf<typeof SortEnumType> | null | undefined;
    paymentType?: ValueOf<typeof SortEnumType> | null | undefined;
    published?: ValueOf<typeof SortEnumType> | null | undefined;
    salaryPerAnnum?: ValueOf<typeof SortEnumType> | null | undefined;
    startDate?: ValueOf<typeof SortEnumType> | null | undefined;
    status?: ValueOf<typeof SortEnumType> | null | undefined;
    title?: ValueOf<typeof SortEnumType> | null | undefined;
    updatedAt?: ValueOf<typeof SortEnumType> | null | undefined;
};

type JobAssignmentSortInput = {
    assignedAt?: ValueOf<typeof SortEnumType> | null | undefined;
    candidate?: CandidateSortInput | null | undefined;
    candidateId?: ValueOf<typeof SortEnumType> | null | undefined;
    id?: ValueOf<typeof SortEnumType> | null | undefined;
    job?: JobSortInput | null | undefined;
    jobId?: ValueOf<typeof SortEnumType> | null | undefined;
    status?: ValueOf<typeof SortEnumType> | null | undefined;
};

type PermissionSortInput = {
    description?: ValueOf<typeof SortEnumType> | null | undefined;
    name?: ValueOf<typeof SortEnumType> | null | undefined;
};

type UserFilterInput = {
    and?: (UserFilterInput)[] | null | undefined;
    createdAt?: DateTimeOperationFilterInput | null | undefined;
    email?: StringOperationFilterInput | null | undefined;
    id?: LongOperationFilterInput | null | undefined;
    or?: (UserFilterInput)[] | null | undefined;
    password?: StringOperationFilterInput | null | undefined;
    role?: RoleFilterInput | null | undefined;
    roleId?: LongOperationFilterInput | null | undefined;
    updatedAt?: DateTimeOperationFilterInput | null | undefined;
};

type ListFilterInputTypeOfUserFilterInput = {
    all?: UserFilterInput | null | undefined;
    any?: boolean | null | undefined;
    none?: UserFilterInput | null | undefined;
    some?: UserFilterInput | null | undefined;
};

type RoleFilterInput = {
    and?: (RoleFilterInput)[] | null | undefined;
    createdAt?: DateTimeOperationFilterInput | null | undefined;
    description?: StringOperationFilterInput | null | undefined;
    id?: LongOperationFilterInput | null | undefined;
    isActive?: BooleanOperationFilterInput | null | undefined;
    name?: StringOperationFilterInput | null | undefined;
    or?: (RoleFilterInput)[] | null | undefined;
    rolePermissions?: ListFilterInputTypeOfRolePermissionFilterInput | null | undefined;
    updatedAt?: DateTimeOperationFilterInput | null | undefined;
    users?: ListFilterInputTypeOfUserFilterInput | null | undefined;
};

type RolePermissionFilterInput = {
    and?: (RolePermissionFilterInput)[] | null | undefined;
    id?: LongOperationFilterInput | null | undefined;
    or?: (RolePermissionFilterInput)[] | null | undefined;
    permission?: PermissionFilterInput | null | undefined;
    permissionName?: StringOperationFilterInput | null | undefined;
    role?: RoleFilterInput | null | undefined;
    roleId?: LongOperationFilterInput | null | undefined;
};

type ListFilterInputTypeOfRolePermissionFilterInput = {
    all?: RolePermissionFilterInput | null | undefined;
    any?: boolean | null | undefined;
    none?: RolePermissionFilterInput | null | undefined;
    some?: RolePermissionFilterInput | null | undefined;
};

type PermissionFilterInput = {
    and?: (PermissionFilterInput)[] | null | undefined;
    description?: StringOperationFilterInput | null | undefined;
    name?: StringOperationFilterInput | null | undefined;
    or?: (PermissionFilterInput)[] | null | undefined;
    rolePermissions?: ListFilterInputTypeOfRolePermissionFilterInput | null | undefined;
};

type RoleSortInput = {
    createdAt?: ValueOf<typeof SortEnumType> | null | undefined;
    description?: ValueOf<typeof SortEnumType> | null | undefined;
    id?: ValueOf<typeof SortEnumType> | null | undefined;
    isActive?: ValueOf<typeof SortEnumType> | null | undefined;
    name?: ValueOf<typeof SortEnumType> | null | undefined;
    updatedAt?: ValueOf<typeof SortEnumType> | null | undefined;
};

type GetUserByIdInput = {
    id: number;
};

type UserSortInput = {
    createdAt?: ValueOf<typeof SortEnumType> | null | undefined;
    email?: ValueOf<typeof SortEnumType> | null | undefined;
    id?: ValueOf<typeof SortEnumType> | null | undefined;
    password?: ValueOf<typeof SortEnumType> | null | undefined;
    role?: RoleSortInput | null | undefined;
    roleId?: ValueOf<typeof SortEnumType> | null | undefined;
    updatedAt?: ValueOf<typeof SortEnumType> | null | undefined;
};

export declare type CacheTypeDef = {
    types: {
        CallResult: {
            idFields: never;
            fields: {
                code: {
                    type: number;
                    args: never;
                };
                message: {
                    type: string | null;
                    args: never;
                };
                success: {
                    type: boolean;
                    args: never;
                };
            };
            fragments: [];
        };
        CallResultOfCandidateResponse: {
            idFields: never;
            fields: {
                code: {
                    type: number;
                    args: never;
                };
                message: {
                    type: string | null;
                    args: never;
                };
                result: {
                    type: Record<CacheTypeDef, "CandidateResponse"> | null;
                    args: never;
                };
                success: {
                    type: boolean;
                    args: never;
                };
            };
            fragments: [];
        };
        CallResultOfClientResponse: {
            idFields: never;
            fields: {
                code: {
                    type: number;
                    args: never;
                };
                message: {
                    type: string | null;
                    args: never;
                };
                result: {
                    type: Record<CacheTypeDef, "ClientResponse"> | null;
                    args: never;
                };
                success: {
                    type: boolean;
                    args: never;
                };
            };
            fragments: [];
        };
        CallResultOfJobResponse: {
            idFields: never;
            fields: {
                code: {
                    type: number;
                    args: never;
                };
                message: {
                    type: string | null;
                    args: never;
                };
                result: {
                    type: Record<CacheTypeDef, "JobResponse"> | null;
                    args: never;
                };
                success: {
                    type: boolean;
                    args: never;
                };
            };
            fragments: [];
        };
        CallResultOfLoginResponse: {
            idFields: never;
            fields: {
                code: {
                    type: number;
                    args: never;
                };
                message: {
                    type: string | null;
                    args: never;
                };
                result: {
                    type: Record<CacheTypeDef, "LoginResponse"> | null;
                    args: never;
                };
                success: {
                    type: boolean;
                    args: never;
                };
            };
            fragments: [];
        };
        CallResultOfRoleResponse: {
            idFields: never;
            fields: {
                code: {
                    type: number;
                    args: never;
                };
                message: {
                    type: string | null;
                    args: never;
                };
                result: {
                    type: Record<CacheTypeDef, "RoleResponse"> | null;
                    args: never;
                };
                success: {
                    type: boolean;
                    args: never;
                };
            };
            fragments: [];
        };
        CallResultOfUserResponse: {
            idFields: never;
            fields: {
                code: {
                    type: number;
                    args: never;
                };
                message: {
                    type: string | null;
                    args: never;
                };
                result: {
                    type: Record<CacheTypeDef, "UserResponse"> | null;
                    args: never;
                };
                success: {
                    type: boolean;
                    args: never;
                };
            };
            fragments: [];
        };
        Candidate: {
            idFields: {
                id: number;
            };
            fields: {
                assignments: {
                    type: (Record<CacheTypeDef, "JobAssignment">)[];
                    args: never;
                };
                createdAt: {
                    type: Date;
                    args: never;
                };
                email: {
                    type: string;
                    args: never;
                };
                experience: {
                    type: string | null;
                    args: never;
                };
                id: {
                    type: number;
                    args: never;
                };
                name: {
                    type: string;
                    args: never;
                };
                phone: {
                    type: string;
                    args: never;
                };
                skills: {
                    type: (string)[];
                    args: never;
                };
                updatedAt: {
                    type: Date;
                    args: never;
                };
                verified: {
                    type: boolean;
                    args: never;
                };
            };
            fragments: [];
        };
        CandidateResponse: {
            idFields: {
                id: number;
            };
            fields: {
                createdAt: {
                    type: Date;
                    args: never;
                };
                email: {
                    type: string;
                    args: never;
                };
                experience: {
                    type: string | null;
                    args: never;
                };
                id: {
                    type: number;
                    args: never;
                };
                name: {
                    type: string;
                    args: never;
                };
                phone: {
                    type: string;
                    args: never;
                };
                skills: {
                    type: (string)[];
                    args: never;
                };
                updatedAt: {
                    type: Date;
                    args: never;
                };
                verified: {
                    type: boolean;
                    args: never;
                };
            };
            fragments: [];
        };
        CandidatesCollectionSegment: {
            idFields: never;
            fields: {
                items: {
                    type: (Record<CacheTypeDef, "Candidate">)[] | null;
                    args: never;
                };
                pageInfo: {
                    type: Record<CacheTypeDef, "CollectionSegmentInfo">;
                    args: never;
                };
                totalCount: {
                    type: number;
                    args: never;
                };
            };
            fragments: [];
        };
        Client: {
            idFields: {
                id: number;
            };
            fields: {
                ceoFirstName: {
                    type: string;
                    args: never;
                };
                ceoLastName: {
                    type: string;
                    args: never;
                };
                companyAddress: {
                    type: string;
                    args: never;
                };
                companyEmail: {
                    type: string;
                    args: never;
                };
                companyLocation: {
                    type: string;
                    args: never;
                };
                companyLogo: {
                    type: string | null;
                    args: never;
                };
                companyName: {
                    type: string;
                    args: never;
                };
                companyPhone: {
                    type: string;
                    args: never;
                };
                createdAt: {
                    type: Date;
                    args: never;
                };
                dateJoined: {
                    type: Date;
                    args: never;
                };
                id: {
                    type: number;
                    args: never;
                };
                jobTitle: {
                    type: string | null;
                    args: never;
                };
                jobs: {
                    type: (Record<CacheTypeDef, "Job">)[];
                    args: never;
                };
                linkedIn: {
                    type: string | null;
                    args: never;
                };
                locationCoordinates: {
                    type: string | null;
                    args: never;
                };
                logoBase64: {
                    type: string | null;
                    args: never;
                };
                logoMimeType: {
                    type: string | null;
                    args: never;
                };
                postalCode: {
                    type: string;
                    args: never;
                };
                registrationNumber: {
                    type: string;
                    args: never;
                };
                updatedAt: {
                    type: Date;
                    args: never;
                };
                verificationStatus: {
                    type: string;
                    args: never;
                };
                website: {
                    type: string | null;
                    args: never;
                };
            };
            fragments: [];
        };
        ClientResponse: {
            idFields: {
                id: number;
            };
            fields: {
                ceoFirstName: {
                    type: string;
                    args: never;
                };
                ceoLastName: {
                    type: string;
                    args: never;
                };
                companyAddress: {
                    type: string;
                    args: never;
                };
                companyEmail: {
                    type: string;
                    args: never;
                };
                companyLocation: {
                    type: string;
                    args: never;
                };
                companyLogo: {
                    type: string | null;
                    args: never;
                };
                companyName: {
                    type: string;
                    args: never;
                };
                companyPhone: {
                    type: string;
                    args: never;
                };
                createdAt: {
                    type: Date;
                    args: never;
                };
                dateJoined: {
                    type: Date;
                    args: never;
                };
                id: {
                    type: number;
                    args: never;
                };
                jobTitle: {
                    type: string | null;
                    args: never;
                };
                linkedIn: {
                    type: string | null;
                    args: never;
                };
                locationCoordinates: {
                    type: string | null;
                    args: never;
                };
                postalCode: {
                    type: string;
                    args: never;
                };
                registrationNumber: {
                    type: string;
                    args: never;
                };
                updatedAt: {
                    type: Date;
                    args: never;
                };
                verificationStatus: {
                    type: string;
                    args: never;
                };
                website: {
                    type: string | null;
                    args: never;
                };
            };
            fragments: [];
        };
        ClientsCollectionSegment: {
            idFields: never;
            fields: {
                items: {
                    type: (Record<CacheTypeDef, "Client">)[] | null;
                    args: never;
                };
                pageInfo: {
                    type: Record<CacheTypeDef, "CollectionSegmentInfo">;
                    args: never;
                };
                totalCount: {
                    type: number;
                    args: never;
                };
            };
            fragments: [];
        };
        CollectionSegmentInfo: {
            idFields: never;
            fields: {
                hasNextPage: {
                    type: boolean;
                    args: never;
                };
                hasPreviousPage: {
                    type: boolean;
                    args: never;
                };
            };
            fragments: [];
        };
        Job: {
            idFields: {
                id: number;
            };
            fields: {
                assignments: {
                    type: (Record<CacheTypeDef, "JobAssignment">)[];
                    args: never;
                };
                client: {
                    type: Record<CacheTypeDef, "Client">;
                    args: never;
                };
                clientId: {
                    type: number;
                    args: never;
                };
                createdAt: {
                    type: Date;
                    args: never;
                };
                duties: {
                    type: (string)[];
                    args: never;
                };
                id: {
                    type: number;
                    args: never;
                };
                jobHours: {
                    type: string;
                    args: never;
                };
                jobType: {
                    type: JobType;
                    args: never;
                };
                location: {
                    type: string;
                    args: never;
                };
                numberOfRoles: {
                    type: number;
                    args: never;
                };
                paymentType: {
                    type: PaymentType;
                    args: never;
                };
                published: {
                    type: boolean;
                    args: never;
                };
                requirements: {
                    type: (string)[];
                    args: never;
                };
                salaryPerAnnum: {
                    type: number;
                    args: never;
                };
                startDate: {
                    type: Date;
                    args: never;
                };
                status: {
                    type: JobStatus;
                    args: never;
                };
                title: {
                    type: string;
                    args: never;
                };
                updatedAt: {
                    type: Date;
                    args: never;
                };
            };
            fragments: [];
        };
        JobAssignment: {
            idFields: {
                id: number;
            };
            fields: {
                assignedAt: {
                    type: Date;
                    args: never;
                };
                candidate: {
                    type: Record<CacheTypeDef, "Candidate">;
                    args: never;
                };
                candidateId: {
                    type: number;
                    args: never;
                };
                id: {
                    type: number;
                    args: never;
                };
                job: {
                    type: Record<CacheTypeDef, "Job">;
                    args: never;
                };
                jobId: {
                    type: number;
                    args: never;
                };
                status: {
                    type: AssignmentStatus;
                    args: never;
                };
            };
            fragments: [];
        };
        JobAssignmentsCollectionSegment: {
            idFields: never;
            fields: {
                items: {
                    type: (Record<CacheTypeDef, "JobAssignment">)[] | null;
                    args: never;
                };
                pageInfo: {
                    type: Record<CacheTypeDef, "CollectionSegmentInfo">;
                    args: never;
                };
                totalCount: {
                    type: number;
                    args: never;
                };
            };
            fragments: [];
        };
        JobResponse: {
            idFields: {
                id: number;
            };
            fields: {
                clientId: {
                    type: number;
                    args: never;
                };
                createdAt: {
                    type: Date;
                    args: never;
                };
                duties: {
                    type: (string)[];
                    args: never;
                };
                id: {
                    type: number;
                    args: never;
                };
                jobHours: {
                    type: string;
                    args: never;
                };
                jobType: {
                    type: JobType;
                    args: never;
                };
                location: {
                    type: string;
                    args: never;
                };
                numberOfRoles: {
                    type: number;
                    args: never;
                };
                paymentType: {
                    type: PaymentType;
                    args: never;
                };
                published: {
                    type: boolean;
                    args: never;
                };
                requirements: {
                    type: (string)[];
                    args: never;
                };
                salaryPerAnnum: {
                    type: number;
                    args: never;
                };
                startDate: {
                    type: Date;
                    args: never;
                };
                status: {
                    type: JobStatus;
                    args: never;
                };
                title: {
                    type: string;
                    args: never;
                };
                updatedAt: {
                    type: Date;
                    args: never;
                };
            };
            fragments: [];
        };
        JobsCollectionSegment: {
            idFields: never;
            fields: {
                items: {
                    type: (Record<CacheTypeDef, "Job">)[] | null;
                    args: never;
                };
                pageInfo: {
                    type: Record<CacheTypeDef, "CollectionSegmentInfo">;
                    args: never;
                };
                totalCount: {
                    type: number;
                    args: never;
                };
            };
            fragments: [];
        };
        LoginResponse: {
            idFields: never;
            fields: {
                email: {
                    type: string;
                    args: never;
                };
                permissions: {
                    type: (string)[];
                    args: never;
                };
                role: {
                    type: string;
                    args: never;
                };
                token: {
                    type: string;
                    args: never;
                };
                userId: {
                    type: number;
                    args: never;
                };
            };
            fragments: [];
        };
        Permission: {
            idFields: never;
            fields: {
                description: {
                    type: string | null;
                    args: never;
                };
                name: {
                    type: string;
                    args: never;
                };
                rolePermissions: {
                    type: (Record<CacheTypeDef, "RolePermission">)[];
                    args: never;
                };
            };
            fragments: [];
        };
        PermissionsCollectionSegment: {
            idFields: never;
            fields: {
                items: {
                    type: (Record<CacheTypeDef, "Permission">)[] | null;
                    args: never;
                };
                pageInfo: {
                    type: Record<CacheTypeDef, "CollectionSegmentInfo">;
                    args: never;
                };
                totalCount: {
                    type: number;
                    args: never;
                };
            };
            fragments: [];
        };
        __ROOT__: {
            idFields: {};
            fields: {
                candidates: {
                    type: Record<CacheTypeDef, "CandidatesCollectionSegment"> | null;
                    args: {
                        order?: (CandidateSortInput)[] | null | undefined;
                        skip?: number | null | undefined;
                        take?: number | null | undefined;
                        where?: CandidateFilterInput | null | undefined;
                    };
                };
                clients: {
                    type: Record<CacheTypeDef, "ClientsCollectionSegment"> | null;
                    args: {
                        order?: (ClientSortInput)[] | null | undefined;
                        skip?: number | null | undefined;
                        take?: number | null | undefined;
                        where?: ClientFilterInput | null | undefined;
                    };
                };
                jobAssignments: {
                    type: Record<CacheTypeDef, "JobAssignmentsCollectionSegment"> | null;
                    args: {
                        order?: (JobAssignmentSortInput)[] | null | undefined;
                        skip?: number | null | undefined;
                        take?: number | null | undefined;
                        where?: JobAssignmentFilterInput | null | undefined;
                    };
                };
                jobs: {
                    type: Record<CacheTypeDef, "JobsCollectionSegment"> | null;
                    args: {
                        order?: (JobSortInput)[] | null | undefined;
                        skip?: number | null | undefined;
                        take?: number | null | undefined;
                        where?: JobFilterInput | null | undefined;
                    };
                };
                permissions: {
                    type: Record<CacheTypeDef, "PermissionsCollectionSegment"> | null;
                    args: {
                        order?: (PermissionSortInput)[] | null | undefined;
                        skip?: number | null | undefined;
                        take?: number | null | undefined;
                        where?: PermissionFilterInput | null | undefined;
                    };
                };
                roles: {
                    type: Record<CacheTypeDef, "RolesCollectionSegment"> | null;
                    args: {
                        order?: (RoleSortInput)[] | null | undefined;
                        skip?: number | null | undefined;
                        take?: number | null | undefined;
                        where?: RoleFilterInput | null | undefined;
                    };
                };
                userById: {
                    type: Record<CacheTypeDef, "CallResultOfUserResponse"> | null;
                    args: {
                        input?: GetUserByIdInput | null | undefined;
                    };
                };
                users: {
                    type: Record<CacheTypeDef, "UsersCollectionSegment"> | null;
                    args: {
                        order?: (UserSortInput)[] | null | undefined;
                        skip?: number | null | undefined;
                        take?: number | null | undefined;
                        where?: UserFilterInput | null | undefined;
                    };
                };
            };
            fragments: [];
        };
        Role: {
            idFields: {
                id: number;
            };
            fields: {
                createdAt: {
                    type: Date;
                    args: never;
                };
                description: {
                    type: string | null;
                    args: never;
                };
                id: {
                    type: number;
                    args: never;
                };
                isActive: {
                    type: boolean;
                    args: never;
                };
                name: {
                    type: string;
                    args: never;
                };
                rolePermissions: {
                    type: (Record<CacheTypeDef, "RolePermission">)[];
                    args: never;
                };
                updatedAt: {
                    type: Date;
                    args: never;
                };
                users: {
                    type: (Record<CacheTypeDef, "User">)[];
                    args: never;
                };
            };
            fragments: [];
        };
        RolePermission: {
            idFields: {
                id: number;
            };
            fields: {
                id: {
                    type: number;
                    args: never;
                };
                permission: {
                    type: Record<CacheTypeDef, "Permission">;
                    args: never;
                };
                permissionName: {
                    type: string;
                    args: never;
                };
                role: {
                    type: Record<CacheTypeDef, "Role">;
                    args: never;
                };
                roleId: {
                    type: number;
                    args: never;
                };
            };
            fragments: [];
        };
        RoleResponse: {
            idFields: {
                id: number;
            };
            fields: {
                createdAt: {
                    type: Date;
                    args: never;
                };
                description: {
                    type: string | null;
                    args: never;
                };
                id: {
                    type: number;
                    args: never;
                };
                isActive: {
                    type: boolean;
                    args: never;
                };
                name: {
                    type: string;
                    args: never;
                };
                permissions: {
                    type: (string)[];
                    args: never;
                };
                updatedAt: {
                    type: Date;
                    args: never;
                };
            };
            fragments: [];
        };
        RolesCollectionSegment: {
            idFields: never;
            fields: {
                items: {
                    type: (Record<CacheTypeDef, "Role">)[] | null;
                    args: never;
                };
                pageInfo: {
                    type: Record<CacheTypeDef, "CollectionSegmentInfo">;
                    args: never;
                };
                totalCount: {
                    type: number;
                    args: never;
                };
            };
            fragments: [];
        };
        User: {
            idFields: {
                id: number;
            };
            fields: {
                createdAt: {
                    type: Date;
                    args: never;
                };
                email: {
                    type: string;
                    args: never;
                };
                id: {
                    type: number;
                    args: never;
                };
                password: {
                    type: string;
                    args: never;
                };
                role: {
                    type: Record<CacheTypeDef, "Role"> | null;
                    args: never;
                };
                roleId: {
                    type: number;
                    args: never;
                };
                updatedAt: {
                    type: Date;
                    args: never;
                };
            };
            fragments: [];
        };
        UserResponse: {
            idFields: {
                id: number;
            };
            fields: {
                createdAt: {
                    type: Date;
                    args: never;
                };
                email: {
                    type: string;
                    args: never;
                };
                id: {
                    type: number;
                    args: never;
                };
                roleId: {
                    type: number;
                    args: never;
                };
                roleName: {
                    type: string;
                    args: never;
                };
                updatedAt: {
                    type: Date;
                    args: never;
                };
            };
            fragments: [];
        };
        UsersCollectionSegment: {
            idFields: never;
            fields: {
                items: {
                    type: (Record<CacheTypeDef, "User">)[] | null;
                    args: never;
                };
                pageInfo: {
                    type: Record<CacheTypeDef, "CollectionSegmentInfo">;
                    args: never;
                };
                totalCount: {
                    type: number;
                    args: never;
                };
            };
            fragments: [];
        };
    };
    lists: {};
    queries: [[UserDataAndPermissionsStore, UserDataAndPermissions$result, UserDataAndPermissions$input], [GetRolePermissionsStore, GetRolePermissions$result, GetRolePermissions$input], [GetClientJobsStore, GetClientJobs$result, GetClientJobs$input], [GetClientsStore, GetClients$result, GetClients$input], [GetCandidatesStore, GetCandidates$result, GetCandidates$input], [AllRolesStore, AllRoles$result, AllRoles$input], [AllCandidatesStore, AllCandidates$result, AllCandidates$input], [AllPermissionStore, AllPermission$result, AllPermission$input], [AllJobsStore, AllJobs$result, AllJobs$input], [AllUserStore, AllUser$result, AllUser$input]];
};