import { AssignmentStatus } from "$houdini/graphql/enums";
import { JobStatus } from "$houdini/graphql/enums";
import { PaymentType } from "$houdini/graphql/enums";
import { JobType } from "$houdini/graphql/enums";
import type { ValueOf } from "$houdini/runtime/lib/types";

export type GetClients = {
    readonly "input": GetClients$input;
    readonly "result": GetClients$result | undefined;
};

export type GetClients$result = {
    readonly clients: {
        /**
         * A flattened list of the items.
        */
        readonly items: ({
            readonly ceoFirstName: string;
            readonly ceoLastName: string;
            readonly companyAddress: string;
            readonly companyEmail: string;
            readonly companyLocation: string;
            readonly companyLogo: string | null;
            readonly logoBase64: string | null;
            readonly companyName: string;
            readonly companyPhone: string;
            readonly createdAt: Date;
            readonly dateJoined: Date;
            readonly id: number;
            readonly jobTitle: string | null;
            readonly linkedIn: string | null;
            readonly locationCoordinates: string | null;
            readonly postalCode: string;
            readonly logoMimeType: string | null;
            readonly registrationNumber: string;
            readonly updatedAt: Date;
            readonly verificationStatus: string;
            readonly website: string | null;
            readonly jobs: ({
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
                readonly assignments: ({
                    readonly assignedAt: Date;
                    readonly candidateId: number;
                    readonly jobId: number;
                    readonly status: ValueOf<typeof AssignmentStatus>;
                    readonly candidate: {
                        readonly createdAt: Date;
                        readonly email: string;
                        readonly experience: string | null;
                        readonly id: number;
                        readonly name: string;
                        readonly phone: string;
                        readonly skills: (string)[];
                        readonly updatedAt: Date;
                        readonly verified: boolean;
                    };
                    readonly job: {
                        readonly clientId: number;
                        readonly createdAt: Date;
                        readonly duties: (string)[];
                        readonly id: number;
                        readonly status: ValueOf<typeof JobStatus>;
                        readonly location: string;
                        readonly jobType: ValueOf<typeof JobType>;
                        readonly jobHours: string;
                        readonly requirements: (string)[];
                    };
                })[];
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
        readonly totalCount: number;
    } | null;
};

export type GetClients$input = null;

export type GetClients$artifact = {
    "name": "GetClients";
    "kind": "HoudiniQuery";
    "hash": "2929337e88e0389d6336b87f6651aa575591216af361a02131ed323ab94de1b3";
    "raw": `query GetClients {
  clients(skip: null, take: null, where: null, order: null) {
    items {
      ceoFirstName
      ceoLastName
      companyAddress
      companyEmail
      companyLocation
      companyLogo
      logoBase64
      companyName
      companyPhone
      createdAt
      dateJoined
      id
      jobTitle
      linkedIn
      locationCoordinates
      postalCode
      logoMimeType
      registrationNumber
      updatedAt
      verificationStatus
      website
      jobs {
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
        assignments {
          assignedAt
          candidateId
          jobId
          status
          candidate {
            createdAt
            email
            experience
            id
            name
            phone
            skills
            updatedAt
            verified
          }
          job {
            clientId
            createdAt
            duties
            id
            status
            location
            jobType
            jobHours
            requirements
          }
          id
        }
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    totalCount
  }
}
`;
    "rootType": "Query";
    "stripVariables": [];
    "selection": {
        "fields": {
            "clients": {
                "type": "ClientsCollectionSegment";
                "keyRaw": "clients(order: null, skip: null, take: null, where: null)";
                "nullable": true;
                "selection": {
                    "fields": {
                        "items": {
                            "type": "Client";
                            "keyRaw": "items";
                            "nullable": true;
                            "selection": {
                                "fields": {
                                    "ceoFirstName": {
                                        "type": "String";
                                        "keyRaw": "ceoFirstName";
                                        "visible": true;
                                    };
                                    "ceoLastName": {
                                        "type": "String";
                                        "keyRaw": "ceoLastName";
                                        "visible": true;
                                    };
                                    "companyAddress": {
                                        "type": "String";
                                        "keyRaw": "companyAddress";
                                        "visible": true;
                                    };
                                    "companyEmail": {
                                        "type": "String";
                                        "keyRaw": "companyEmail";
                                        "visible": true;
                                    };
                                    "companyLocation": {
                                        "type": "String";
                                        "keyRaw": "companyLocation";
                                        "visible": true;
                                    };
                                    "companyLogo": {
                                        "type": "String";
                                        "keyRaw": "companyLogo";
                                        "nullable": true;
                                        "visible": true;
                                    };
                                    "logoBase64": {
                                        "type": "String";
                                        "keyRaw": "logoBase64";
                                        "nullable": true;
                                        "visible": true;
                                    };
                                    "companyName": {
                                        "type": "String";
                                        "keyRaw": "companyName";
                                        "visible": true;
                                    };
                                    "companyPhone": {
                                        "type": "String";
                                        "keyRaw": "companyPhone";
                                        "visible": true;
                                    };
                                    "createdAt": {
                                        "type": "DateTime";
                                        "keyRaw": "createdAt";
                                        "visible": true;
                                    };
                                    "dateJoined": {
                                        "type": "DateTime";
                                        "keyRaw": "dateJoined";
                                        "visible": true;
                                    };
                                    "id": {
                                        "type": "Long";
                                        "keyRaw": "id";
                                        "visible": true;
                                    };
                                    "jobTitle": {
                                        "type": "String";
                                        "keyRaw": "jobTitle";
                                        "nullable": true;
                                        "visible": true;
                                    };
                                    "linkedIn": {
                                        "type": "String";
                                        "keyRaw": "linkedIn";
                                        "nullable": true;
                                        "visible": true;
                                    };
                                    "locationCoordinates": {
                                        "type": "String";
                                        "keyRaw": "locationCoordinates";
                                        "nullable": true;
                                        "visible": true;
                                    };
                                    "postalCode": {
                                        "type": "String";
                                        "keyRaw": "postalCode";
                                        "visible": true;
                                    };
                                    "logoMimeType": {
                                        "type": "String";
                                        "keyRaw": "logoMimeType";
                                        "nullable": true;
                                        "visible": true;
                                    };
                                    "registrationNumber": {
                                        "type": "String";
                                        "keyRaw": "registrationNumber";
                                        "visible": true;
                                    };
                                    "updatedAt": {
                                        "type": "DateTime";
                                        "keyRaw": "updatedAt";
                                        "visible": true;
                                    };
                                    "verificationStatus": {
                                        "type": "String";
                                        "keyRaw": "verificationStatus";
                                        "visible": true;
                                    };
                                    "website": {
                                        "type": "String";
                                        "keyRaw": "website";
                                        "nullable": true;
                                        "visible": true;
                                    };
                                    "jobs": {
                                        "type": "Job";
                                        "keyRaw": "jobs";
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
                                                            "candidate": {
                                                                "type": "Candidate";
                                                                "keyRaw": "candidate";
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
                                                                    };
                                                                };
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
                                                                        "status": {
                                                                            "type": "JobStatus";
                                                                            "keyRaw": "status";
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
                                                                        "jobHours": {
                                                                            "type": "String";
                                                                            "keyRaw": "jobHours";
                                                                            "visible": true;
                                                                        };
                                                                        "requirements": {
                                                                            "type": "String";
                                                                            "keyRaw": "requirements";
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
                        "totalCount": {
                            "type": "Int";
                            "keyRaw": "totalCount";
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