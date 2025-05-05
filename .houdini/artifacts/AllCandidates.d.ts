import { JobStatus } from "$houdini/graphql/enums";
import { PaymentType } from "$houdini/graphql/enums";
import { JobType } from "$houdini/graphql/enums";
import { AssignmentStatus } from "$houdini/graphql/enums";
import type { ValueOf } from "$houdini/runtime/lib/types";

export type AllCandidates = {
    readonly "input": AllCandidates$input;
    readonly "result": AllCandidates$result | undefined;
};

export type AllCandidates$result = {
    readonly candidates: {
        readonly totalCount: number;
        /**
         * A flattened list of the items.
        */
        readonly items: ({
            readonly createdAt: Date;
            readonly email: string;
            readonly experience: string | null;
            readonly id: number;
            readonly name: string;
            readonly phone: string;
            readonly skills: (string)[];
            readonly updatedAt: Date;
            readonly verified: boolean;
            readonly assignments: ({
                readonly assignedAt: Date;
                readonly candidateId: number;
                readonly jobId: number;
                readonly status: ValueOf<typeof AssignmentStatus>;
                readonly job: {
                    readonly clientId: number;
                    readonly createdAt: Date;
                    readonly duties: (string)[];
                    readonly id: number;
                    readonly jobHours: string;
                    readonly jobType: ValueOf<typeof JobType>;
                    readonly location: string;
                    readonly numberOfRoles: number;
                    readonly paymentType: ValueOf<typeof PaymentType>;
                    readonly published: boolean;
                    readonly requirements: (string)[];
                    readonly salaryPerAnnum: number;
                    readonly startDate: Date;
                    readonly status: ValueOf<typeof JobStatus>;
                    readonly title: string;
                    readonly updatedAt: Date;
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

export type AllCandidates$input = null;

export type AllCandidates$artifact = {
    "name": "AllCandidates";
    "kind": "HoudiniQuery";
    "hash": "f89ec43f03a45a7478c145c6afe14804e0dc2f4b74f9500db0ca2d6bbebf1d29";
    "raw": `query AllCandidates {
  candidates(skip: null, take: null, where: null, order: null) {
    totalCount
    items {
      createdAt
      email
      experience
      id
      name
      phone
      skills
      updatedAt
      verified
      assignments {
        assignedAt
        candidateId
        jobId
        status
        job {
          clientId
          createdAt
          duties
          id
          jobHours
          jobType
          location
          numberOfRoles
          paymentType
          published
          requirements
          salaryPerAnnum
          startDate
          status
          title
          updatedAt
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
            "candidates": {
                "type": "CandidatesCollectionSegment";
                "keyRaw": "candidates(order: null, skip: null, take: null, where: null)";
                "nullable": true;
                "selection": {
                    "fields": {
                        "totalCount": {
                            "type": "Int";
                            "keyRaw": "totalCount";
                            "visible": true;
                        };
                        "items": {
                            "type": "Candidate";
                            "keyRaw": "items";
                            "nullable": true;
                            "selection": {
                                "fields": {
                                    "createdAt": {
                                        "type": "DateTime";
                                        "keyRaw": "createdAt";
                                        "visible": true;
                                    };
                                    "email": {
                                        "type": "String";
                                        "keyRaw": "email";
                                        "visible": true;
                                    };
                                    "experience": {
                                        "type": "String";
                                        "keyRaw": "experience";
                                        "nullable": true;
                                        "visible": true;
                                    };
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
                                    "phone": {
                                        "type": "String";
                                        "keyRaw": "phone";
                                        "visible": true;
                                    };
                                    "skills": {
                                        "type": "String";
                                        "keyRaw": "skills";
                                        "visible": true;
                                    };
                                    "updatedAt": {
                                        "type": "DateTime";
                                        "keyRaw": "updatedAt";
                                        "visible": true;
                                    };
                                    "verified": {
                                        "type": "Boolean";
                                        "keyRaw": "verified";
                                        "visible": true;
                                    };
                                    "assignments": {
                                        "type": "JobAssignment";
                                        "keyRaw": "assignments";
                                        "selection": {
                                            "fields": {
                                                "assignedAt": {
                                                    "type": "DateTime";
                                                    "keyRaw": "assignedAt";
                                                    "visible": true;
                                                };
                                                "candidateId": {
                                                    "type": "Long";
                                                    "keyRaw": "candidateId";
                                                    "visible": true;
                                                };
                                                "jobId": {
                                                    "type": "Long";
                                                    "keyRaw": "jobId";
                                                    "visible": true;
                                                };
                                                "status": {
                                                    "type": "AssignmentStatus";
                                                    "keyRaw": "status";
                                                    "visible": true;
                                                };
                                                "job": {
                                                    "type": "Job";
                                                    "keyRaw": "job";
                                                    "selection": {
                                                        "fields": {
                                                            "clientId": {
                                                                "type": "Long";
                                                                "keyRaw": "clientId";
                                                                "visible": true;
                                                            };
                                                            "createdAt": {
                                                                "type": "DateTime";
                                                                "keyRaw": "createdAt";
                                                                "visible": true;
                                                            };
                                                            "duties": {
                                                                "type": "String";
                                                                "keyRaw": "duties";
                                                                "visible": true;
                                                            };
                                                            "id": {
                                                                "type": "Long";
                                                                "keyRaw": "id";
                                                                "visible": true;
                                                            };
                                                            "jobHours": {
                                                                "type": "String";
                                                                "keyRaw": "jobHours";
                                                                "visible": true;
                                                            };
                                                            "jobType": {
                                                                "type": "JobType";
                                                                "keyRaw": "jobType";
                                                                "visible": true;
                                                            };
                                                            "location": {
                                                                "type": "String";
                                                                "keyRaw": "location";
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
                                                            "published": {
                                                                "type": "Boolean";
                                                                "keyRaw": "published";
                                                                "visible": true;
                                                            };
                                                            "requirements": {
                                                                "type": "String";
                                                                "keyRaw": "requirements";
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
                                                            "status": {
                                                                "type": "JobStatus";
                                                                "keyRaw": "status";
                                                                "visible": true;
                                                            };
                                                            "title": {
                                                                "type": "String";
                                                                "keyRaw": "title";
                                                                "visible": true;
                                                            };
                                                            "updatedAt": {
                                                                "type": "DateTime";
                                                                "keyRaw": "updatedAt";
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
    "policy": "NetworkOnly";
    "partial": false;
};