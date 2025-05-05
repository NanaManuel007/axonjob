import { PaymentType } from "$houdini/graphql/enums";
import { JobType } from "$houdini/graphql/enums";
import type { ValueOf } from "$houdini/runtime/lib/types";

export type CreateJob = {
    readonly "input": CreateJob$input;
    readonly "result": CreateJob$result;
};

export type CreateJob$result = {
    readonly createJob: {
        readonly success: boolean;
        readonly message: string | null;
        readonly code: number;
        readonly result: {
            readonly id: number;
            readonly title: string;
            readonly jobType: ValueOf<typeof JobType>;
            readonly paymentType: ValueOf<typeof PaymentType>;
            readonly salaryPerAnnum: number;
            readonly jobHours: string;
            readonly location: string;
            readonly startDate: Date;
            readonly numberOfRoles: number;
            readonly duties: (string)[];
            readonly requirements: (string)[];
            readonly published: boolean;
            readonly clientId: number;
        } | null;
    } | null;
};

type CreateJobRequestInput = {
    clientId: number;
    duties: (string)[];
    jobHours: string;
    jobType: ValueOf<typeof JobType>;
    location: string;
    numberOfRoles: number;
    paymentType: ValueOf<typeof PaymentType>;
    published: boolean;
    requirements: (string)[];
    salaryPerAnnum: number;
    startDate: Date;
    title: string;
};

type CreateJobInput = {
    input: CreateJobRequestInput;
};

export type CreateJob$input = {
    input: CreateJobInput;
};

export type CreateJob$optimistic = {
    readonly createJob?: {
        readonly success?: boolean;
        readonly message?: string | null;
        readonly code?: number;
        readonly result?: {
            readonly id?: number;
            readonly title?: string;
            readonly jobType?: ValueOf<typeof JobType>;
            readonly paymentType?: ValueOf<typeof PaymentType>;
            readonly salaryPerAnnum?: number;
            readonly jobHours?: string;
            readonly location?: string;
            readonly startDate?: Date;
            readonly numberOfRoles?: number;
            readonly duties?: (string)[];
            readonly requirements?: (string)[];
            readonly published?: boolean;
            readonly clientId?: number;
        } | null;
    } | null;
};

export type CreateJob$artifact = {
    "name": "CreateJob";
    "kind": "HoudiniMutation";
    "hash": "df027735bd45bbd58403b90289c1f9f65d5b9b937835271040daf22df5bd8f1f";
    "raw": `mutation CreateJob($input: CreateJobInput!) {
  createJob(input: $input) {
    success
    message
    code
    result {
      id
      title
      jobType
      paymentType
      salaryPerAnnum
      jobHours
      location
      startDate
      numberOfRoles
      duties
      requirements
      published
      clientId
    }
  }
}
`;
    "rootType": "Mutation";
    "stripVariables": [];
    "selection": {
        "fields": {
            "createJob": {
                "type": "CallResultOfJobResponse";
                "keyRaw": "createJob(input: $input)";
                "nullable": true;
                "selection": {
                    "fields": {
                        "success": {
                            "type": "Boolean";
                            "keyRaw": "success";
                            "visible": true;
                        };
                        "message": {
                            "type": "String";
                            "keyRaw": "message";
                            "nullable": true;
                            "visible": true;
                        };
                        "code": {
                            "type": "Int";
                            "keyRaw": "code";
                            "visible": true;
                        };
                        "result": {
                            "type": "JobResponse";
                            "keyRaw": "result";
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
                                    "jobType": {
                                        "type": "JobType";
                                        "keyRaw": "jobType";
                                        "visible": true;
                                    };
                                    "paymentType": {
                                        "type": "PaymentType";
                                        "keyRaw": "paymentType";
                                        "visible": true;
                                    };
                                    "salaryPerAnnum": {
                                        "type": "Decimal";
                                        "keyRaw": "salaryPerAnnum";
                                        "visible": true;
                                    };
                                    "jobHours": {
                                        "type": "String";
                                        "keyRaw": "jobHours";
                                        "visible": true;
                                    };
                                    "location": {
                                        "type": "String";
                                        "keyRaw": "location";
                                        "visible": true;
                                    };
                                    "startDate": {
                                        "type": "DateTime";
                                        "keyRaw": "startDate";
                                        "visible": true;
                                    };
                                    "numberOfRoles": {
                                        "type": "Int";
                                        "keyRaw": "numberOfRoles";
                                        "visible": true;
                                    };
                                    "duties": {
                                        "type": "String";
                                        "keyRaw": "duties";
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
                                    "clientId": {
                                        "type": "Long";
                                        "keyRaw": "clientId";
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
            "input": "CreateJobInput";
        };
        "types": {
            "CreateJobRequestInput": {
                "clientId": "Long";
                "duties": "String";
                "jobHours": "String";
                "jobType": "JobType";
                "location": "String";
                "numberOfRoles": "Int";
                "paymentType": "PaymentType";
                "published": "Boolean";
                "requirements": "String";
                "salaryPerAnnum": "Decimal";
                "startDate": "DateTime";
                "title": "String";
            };
            "CreateJobInput": {
                "input": "CreateJobRequestInput";
            };
        };
        "defaults": {};
        "runtimeScalars": {};
    };
};