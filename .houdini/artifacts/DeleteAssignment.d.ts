export type DeleteAssignment = {
    readonly "input": DeleteAssignment$input;
    readonly "result": DeleteAssignment$result;
};

export type DeleteAssignment$result = {
    readonly deleteAssignment: {
        readonly code: number;
        readonly message: string | null;
        readonly success: boolean;
    } | null;
};

type DeleteAssignmentInput = {
    candidateId: number;
    jobId: number;
};

export type DeleteAssignment$input = {
    input: DeleteAssignmentInput;
};

export type DeleteAssignment$optimistic = {
    readonly deleteAssignment?: {
        readonly code?: number;
        readonly message?: string | null;
        readonly success?: boolean;
    } | null;
};

export type DeleteAssignment$artifact = {
    "name": "DeleteAssignment";
    "kind": "HoudiniMutation";
    "hash": "d49bfc9bb9c204438f1686a079fe3ede9c32fba00e79732b9c699b0eda27acc6";
    "raw": `mutation DeleteAssignment($input: DeleteAssignmentInput!) {
  deleteAssignment(input: $input) {
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
            "deleteAssignment": {
                "type": "CallResult";
                "keyRaw": "deleteAssignment(input: $input)";
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
            "input": "DeleteAssignmentInput";
        };
        "types": {
            "DeleteAssignmentInput": {
                "candidateId": "Long";
                "jobId": "Long";
            };
        };
        "defaults": {};
        "runtimeScalars": {};
    };
};