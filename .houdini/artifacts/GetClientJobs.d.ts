import { AssignmentStatus } from "$houdini/graphql/enums";
import { PaymentType } from "$houdini/graphql/enums";
import { JobStatus } from "$houdini/graphql/enums";
import { JobType } from "$houdini/graphql/enums";
import type { ValueOf } from "$houdini/runtime/lib/types";

export type GetClientJobs = {
    readonly "input": GetClientJobs$input;
    readonly "result": GetClientJobs$result | undefined;
};

export type GetClientJobs$result = {
    readonly jobs: {
        readonly totalCount: number;
        /**
         * A flattened list of the items.
        */
        readonly items: ({
            readonly id: number;
            readonly title: string;
            readonly location: string;
            readonly jobType: ValueOf<typeof JobType>;
            readonly status: ValueOf<typeof JobStatus>;
            readonly createdAt: Date;
            readonly clientId: number;
            readonly duties: (string)[];
            readonly jobHours: string;
            readonly numberOfRoles: number;
            readonly paymentType: ValueOf<typeof PaymentType>;
            readonly requirements: (string)[];
            readonly published: boolean;
            readonly salaryPerAnnum: number;
            readonly startDate: Date;
            readonly updatedAt: Date;
            readonly assignments: ({
                readonly status: ValueOf<typeof AssignmentStatus>;
                readonly candidate: {
                    readonly id: number;
                    readonly name: string;
                    readonly email: string;
                };
            })[];
        })[] | null;
        /**
         * Information to aid in pagination.
        */
        readonly pageInfo: {
            /**
             * Indicates whether more items exist following the set defined by the clients arguments.
            */
            readonly hasNextPage: boolean;
            /**
             * Indicates whether more items exist prior the set defined by the clients arguments.
            */
            readonly hasPreviousPage: boolean;
        };
    } | null;
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

type ListStringOperationFilterInput = {
    all?: StringOperationFilterInput | null | undefined;
    any?: boolean | null | undefined;
    none?: StringOperationFilterInput | null | undefined;
    some?: StringOperationFilterInput | null | undefined;
};

type BooleanOperationFilterInput = {
    eq?: boolean | null | undefined;
    neq?: boolean | null | undefined;
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

export type GetClientJobs$input = {
    filter: JobFilterInput;
    skip: number;
    take: number;
};

export type GetClientJobs$artifact = {
    "name": "GetClientJobs";
    "kind": "HoudiniQuery";
    "hash": "291953fb58ea59fb29e686acb494269f90b26f883224798e77637e72af08ad68";
    "raw": `query GetClientJobs($filter: JobFilterInput!, $skip: Int!, $take: Int!) {
  jobs(where: $filter, take: $take, skip: $skip, order: [{id: DESC}]) {
    totalCount
    items {
      id
      title
      location
      jobType
      status
      createdAt
      clientId
      duties
      jobHours
      numberOfRoles
      paymentType
      requirements
      published
      salaryPerAnnum
      startDate
      updatedAt
      assignments {
        status
        candidate {
          id
          name
          email
        }
        id
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}
`;
    "rootType": "Query";
    "stripVariables": [];
    "selection": {
        "fields": {
            "jobs": {
                "type": "JobsCollectionSegment";
                "keyRaw": "jobs(order: [{id: DESC}], skip: $skip, take: $take, where: $filter)";
                "nullable": true;
                "selection": {
                    "fields": {
                        "totalCount": {
                            "type": "Int";
                            "keyRaw": "totalCount";
                            "visible": true;
                        };
                        "items": {
                            "type": "Job";
                            "keyRaw": "items";
                            "nullable": true;
                            "selection": {
                                "fields": {
                                    "id": {
                                        "type": "Long";
                                        "keyRaw": "id";
                                        "visible": true;
                                    };
                                    "title": {
                                        "type": "String";
                                        "keyRaw": "title";
                                        "visible": true;
                                    };
                                    "location": {
                                        "type": "String";
                                        "keyRaw": "location";
                                        "visible": true;
                                    };
                                    "jobType": {
                                        "type": "JobType";
                                        "keyRaw": "jobType";
                                        "visible": true;
                                    };
                                    "status": {
                                        "type": "JobStatus";
                                        "keyRaw": "status";
                                        "visible": true;
                                    };
                                    "createdAt": {
                                        "type": "DateTime";
                                        "keyRaw": "createdAt";
                                        "visible": true;
                                    };
                                    "clientId": {
                                        "type": "Long";
                                        "keyRaw": "clientId";
                                        "visible": true;
                                    };
                                    "duties": {
                                        "type": "String";
                                        "keyRaw": "duties";
                                        "visible": true;
                                    };
                                    "jobHours": {
                                        "type": "String";
                                        "keyRaw": "jobHours";
                                        "visible": true;
                                    };
                                    "numberOfRoles": {
                                        "type": "Int";
                                        "keyRaw": "numberOfRoles";
                                        "visible": true;
                                    };
                                    "paymentType": {
                                        "type": "PaymentType";
                                        "keyRaw": "paymentType";
                                        "visible": true;
                                    };
                                    "requirements": {
                                        "type": "String";
                                        "keyRaw": "requirements";
                                        "visible": true;
                                    };
                                    "published": {
                                        "type": "Boolean";
                                        "keyRaw": "published";
                                        "visible": true;
                                    };
                                    "salaryPerAnnum": {
                                        "type": "Decimal";
                                        "keyRaw": "salaryPerAnnum";
                                        "visible": true;
                                    };
                                    "startDate": {
                                        "type": "DateTime";
                                        "keyRaw": "startDate";
                                        "visible": true;
                                    };
                                    "updatedAt": {
                                        "type": "DateTime";
                                        "keyRaw": "updatedAt";
                                        "visible": true;
                                    };
                                    "assignments": {
                                        "type": "JobAssignment";
                                        "keyRaw": "assignments";
                                        "selection": {
                                            "fields": {
                                                "status": {
                                                    "type": "AssignmentStatus";
                                                    "keyRaw": "status";
                                                    "visible": true;
                                                };
                                                "candidate": {
                                                    "type": "Candidate";
                                                    "keyRaw": "candidate";
                                                    "selection": {
                                                        "fields": {
                                                            "id": {
                                                                "type": "Long";
                                                                "keyRaw": "id";
                                                                "visible": true;
                                                            };
                                                            "name": {
                                                                "type": "String";
                                                                "keyRaw": "name";
                                                                "visible": true;
                                                            };
                                                            "email": {
                                                                "type": "String";
                                                                "keyRaw": "email";
                                                                "visible": true;
                                                            };
                                                        };
                                                    };
                                                    "visible": true;
                                                };
                                                "id": {
                                                    "type": "Long";
                                                    "keyRaw": "id";
                                                    "visible": true;
                                                };
                                            };
                                        };
                                        "visible": true;
                                    };
                                };
                            };
                            "visible": true;
                        };
                        "pageInfo": {
                            "type": "CollectionSegmentInfo";
                            "keyRaw": "pageInfo";
                            "selection": {
                                "fields": {
                                    "hasNextPage": {
                                        "type": "Boolean";
                                        "keyRaw": "hasNextPage";
                                        "visible": true;
                                    };
                                    "hasPreviousPage": {
                                        "type": "Boolean";
                                        "keyRaw": "hasPreviousPage";
                                        "visible": true;
                                    };
                                };
                            };
                            "visible": true;
                        };
                    };
                };
                "visible": true;
            };
        };
    };
    "pluginData": {
        "houdini-svelte": {};
    };
    "input": {
        "fields": {
            "filter": "JobFilterInput";
            "skip": "Int";
            "take": "Int";
        };
        "types": {
            "DateTimeOperationFilterInput": {
                "eq": "DateTime";
                "gt": "DateTime";
                "gte": "DateTime";
                "in": "DateTime";
                "lt": "DateTime";
                "lte": "DateTime";
                "neq": "DateTime";
                "ngt": "DateTime";
                "ngte": "DateTime";
                "nin": "DateTime";
                "nlt": "DateTime";
                "nlte": "DateTime";
            };
            "StringOperationFilterInput": {
                "and": "StringOperationFilterInput";
                "contains": "String";
                "endsWith": "String";
                "eq": "String";
                "in": "String";
                "ncontains": "String";
                "nendsWith": "String";
                "neq": "String";
                "nin": "String";
                "nstartsWith": "String";
                "or": "StringOperationFilterInput";
                "startsWith": "String";
            };
            "LongOperationFilterInput": {
                "eq": "Long";
                "gt": "Long";
                "gte": "Long";
                "in": "Long";
                "lt": "Long";
                "lte": "Long";
                "neq": "Long";
                "ngt": "Long";
                "ngte": "Long";
                "nin": "Long";
                "nlt": "Long";
                "nlte": "Long";
            };
            "ListStringOperationFilterInput": {
                "all": "StringOperationFilterInput";
                "any": "Boolean";
                "none": "StringOperationFilterInput";
                "some": "StringOperationFilterInput";
            };
            "BooleanOperationFilterInput": {
                "eq": "Boolean";
                "neq": "Boolean";
            };
            "CandidateFilterInput": {
                "and": "CandidateFilterInput";
                "assignments": "ListFilterInputTypeOfJobAssignmentFilterInput";
                "createdAt": "DateTimeOperationFilterInput";
                "email": "StringOperationFilterInput";
                "experience": "StringOperationFilterInput";
                "id": "LongOperationFilterInput";
                "name": "StringOperationFilterInput";
                "or": "CandidateFilterInput";
                "phone": "StringOperationFilterInput";
                "skills": "ListStringOperationFilterInput";
                "updatedAt": "DateTimeOperationFilterInput";
                "verified": "BooleanOperationFilterInput";
            };
            "AssignmentStatusOperationFilterInput": {
                "eq": "AssignmentStatus";
                "in": "AssignmentStatus";
                "neq": "AssignmentStatus";
                "nin": "AssignmentStatus";
            };
            "JobAssignmentFilterInput": {
                "and": "JobAssignmentFilterInput";
                "assignedAt": "DateTimeOperationFilterInput";
                "candidate": "CandidateFilterInput";
                "candidateId": "LongOperationFilterInput";
                "id": "LongOperationFilterInput";
                "job": "JobFilterInput";
                "jobId": "LongOperationFilterInput";
                "or": "JobAssignmentFilterInput";
                "status": "AssignmentStatusOperationFilterInput";
            };
            "ListFilterInputTypeOfJobAssignmentFilterInput": {
                "all": "JobAssignmentFilterInput";
                "any": "Boolean";
                "none": "JobAssignmentFilterInput";
                "some": "JobAssignmentFilterInput";
            };
            "ListFilterInputTypeOfJobFilterInput": {
                "all": "JobFilterInput";
                "any": "Boolean";
                "none": "JobFilterInput";
                "some": "JobFilterInput";
            };
            "ClientFilterInput": {
                "and": "ClientFilterInput";
                "ceoFirstName": "StringOperationFilterInput";
                "ceoLastName": "StringOperationFilterInput";
                "companyAddress": "StringOperationFilterInput";
                "companyEmail": "StringOperationFilterInput";
                "companyLocation": "StringOperationFilterInput";
                "companyLogo": "StringOperationFilterInput";
                "companyName": "StringOperationFilterInput";
                "companyPhone": "StringOperationFilterInput";
                "createdAt": "DateTimeOperationFilterInput";
                "dateJoined": "DateTimeOperationFilterInput";
                "id": "LongOperationFilterInput";
                "jobTitle": "StringOperationFilterInput";
                "jobs": "ListFilterInputTypeOfJobFilterInput";
                "linkedIn": "StringOperationFilterInput";
                "locationCoordinates": "StringOperationFilterInput";
                "logoBase64": "StringOperationFilterInput";
                "logoMimeType": "StringOperationFilterInput";
                "or": "ClientFilterInput";
                "postalCode": "StringOperationFilterInput";
                "registrationNumber": "StringOperationFilterInput";
                "updatedAt": "DateTimeOperationFilterInput";
                "verificationStatus": "StringOperationFilterInput";
                "website": "StringOperationFilterInput";
            };
            "JobTypeOperationFilterInput": {
                "eq": "JobType";
                "in": "JobType";
                "neq": "JobType";
                "nin": "JobType";
            };
            "IntOperationFilterInput": {
                "eq": "Int";
                "gt": "Int";
                "gte": "Int";
                "in": "Int";
                "lt": "Int";
                "lte": "Int";
                "neq": "Int";
                "ngt": "Int";
                "ngte": "Int";
                "nin": "Int";
                "nlt": "Int";
                "nlte": "Int";
            };
            "PaymentTypeOperationFilterInput": {
                "eq": "PaymentType";
                "in": "PaymentType";
                "neq": "PaymentType";
                "nin": "PaymentType";
            };
            "DecimalOperationFilterInput": {
                "eq": "Decimal";
                "gt": "Decimal";
                "gte": "Decimal";
                "in": "Decimal";
                "lt": "Decimal";
                "lte": "Decimal";
                "neq": "Decimal";
                "ngt": "Decimal";
                "ngte": "Decimal";
                "nin": "Decimal";
                "nlt": "Decimal";
                "nlte": "Decimal";
            };
            "JobStatusOperationFilterInput": {
                "eq": "JobStatus";
                "in": "JobStatus";
                "neq": "JobStatus";
                "nin": "JobStatus";
            };
            "JobFilterInput": {
                "and": "JobFilterInput";
                "assignments": "ListFilterInputTypeOfJobAssignmentFilterInput";
                "client": "ClientFilterInput";
                "clientId": "LongOperationFilterInput";
                "createdAt": "DateTimeOperationFilterInput";
                "duties": "ListStringOperationFilterInput";
                "id": "LongOperationFilterInput";
                "jobHours": "StringOperationFilterInput";
                "jobType": "JobTypeOperationFilterInput";
                "location": "StringOperationFilterInput";
                "numberOfRoles": "IntOperationFilterInput";
                "or": "JobFilterInput";
                "paymentType": "PaymentTypeOperationFilterInput";
                "published": "BooleanOperationFilterInput";
                "requirements": "ListStringOperationFilterInput";
                "salaryPerAnnum": "DecimalOperationFilterInput";
                "startDate": "DateTimeOperationFilterInput";
                "status": "JobStatusOperationFilterInput";
                "title": "StringOperationFilterInput";
                "updatedAt": "DateTimeOperationFilterInput";
            };
        };
        "defaults": {};
        "runtimeScalars": {};
    };
    "policy": "NetworkOnly";
    "partial": false;
};