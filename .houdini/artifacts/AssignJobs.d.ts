import type { ValueOf } from "$houdini/runtime/lib/types";
import type { AssignmentStatus } from "$houdini/graphql/enums";

export type AssignJobs = {
    readonly "input": AssignJobs$input;
    readonly "result": AssignJobs$result;
};

export type AssignJobs$result = {
    readonly assignJob: {
        readonly success: boolean;
        readonly message: string | null;
        readonly code: number;
    } | null;
};

type AssignJobRequestInput = {
    candidateId: number;
    jobId: number;
    status: ValueOf<typeof AssignmentStatus>;
};

type AssignJobInput = {
    input: AssignJobRequestInput;
};

export type AssignJobs$input = {
    input: AssignJobInput;
};

export type AssignJobs$optimistic = {
    readonly assignJob?: {
        readonly success?: boolean;
        readonly message?: string | null;
        readonly code?: number;
    } | null;
};

export type AssignJobs$artifact = {
    "name": "AssignJobs";
    "kind": "HoudiniMutation";
    "hash": "0873c12ea59ba9eef40e0e8eea87b1976470f337f7ca2320f9501c62075b67de";
    "raw": `mutation AssignJobs($input: AssignJobInput!) {
  assignJob(input: $input) {
    success
    message
    code
  }
}
`;
    "rootType": "Mutation";
    "stripVariables": [];
    "selection": {
        "fields": {
            "assignJob": {
                "type": "CallResult";
                "keyRaw": "assignJob(input: $input)";
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
            "input": "AssignJobInput";
        };
        "types": {
            "AssignJobRequestInput": {
                "candidateId": "Long";
                "jobId": "Long";
                "status": "AssignmentStatus";
            };
            "AssignJobInput": {
                "input": "AssignJobRequestInput";
            };
        };
        "defaults": {};
        "runtimeScalars": {};
    };
};