import type { PaymentType } from "$houdini/graphql/enums";
import type { ValueOf } from "$houdini/runtime/lib/types";
import type { JobType } from "$houdini/graphql/enums";

export type UpdateJob = {
    readonly "input": UpdateJob$input;
    readonly "result": UpdateJob$result;
};

export type UpdateJob$result = {
    readonly updateJob: {
        readonly code: number;
        readonly message: string | null;
        readonly success: boolean;
    } | null;
};

type UpdateJobRequestInput = {
    duties?: (string)[] | null | undefined;
    jobHours?: string | null | undefined;
    jobType?: ValueOf<typeof JobType> | null | undefined;
    location?: string | null | undefined;
    numberOfRoles?: number | null | undefined;
    paymentType?: ValueOf<typeof PaymentType> | null | undefined;
    published?: boolean | null | undefined;
    requirements?: (string)[] | null | undefined;
    salaryPerAnnum?: number | null | undefined;
    startDate?: Date | null | undefined;
    title?: string | null | undefined;
};

type UpdateJobInput = {
    id: number;
    input: UpdateJobRequestInput;
};

export type UpdateJob$input = {
    input: UpdateJobInput;
};

export type UpdateJob$optimistic = {
    readonly updateJob?: {
        readonly code?: number;
        readonly message?: string | null;
        readonly success?: boolean;
    } | null;
};

export type UpdateJob$artifact = {
    "name": "UpdateJob";
    "kind": "HoudiniMutation";
    "hash": "a53a13103c6adb25aa2247b952ae1a78ec51851dd407ef5f37a1023227340adf";
    "raw": `mutation UpdateJob($input: UpdateJobInput!) {
  updateJob(input: $input) {
    code
    message
    success
  }
}
`;
    "rootType": "Mutation";
    "stripVariables": [];
    "selection": {
        "fields": {
            "updateJob": {
                "type": "CallResultOfJobResponse";
                "keyRaw": "updateJob(input: $input)";
                "nullable": true;
                "selection": {
                    "fields": {
                        "code": {
                            "type": "Int";
                            "keyRaw": "code";
                            "visible": true;
                        };
                        "message": {
                            "type": "String";
                            "keyRaw": "message";
                            "nullable": true;
                            "visible": true;
                        };
                        "success": {
                            "type": "Boolean";
                            "keyRaw": "success";
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
            "input": "UpdateJobInput";
        };
        "types": {
            "UpdateJobRequestInput": {
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
            "UpdateJobInput": {
                "id": "Long";
                "input": "UpdateJobRequestInput";
            };
        };
        "defaults": {};
        "runtimeScalars": {};
    };
};