export type DeleteJob = {
    readonly "input": DeleteJob$input;
    readonly "result": DeleteJob$result;
};

export type DeleteJob$result = {
    readonly deleteJob: {
        readonly code: number;
        readonly message: string | null;
        readonly success: boolean;
    } | null;
};

export type DeleteJob$input = {
    id: number;
};

export type DeleteJob$optimistic = {
    readonly deleteJob?: {
        readonly code?: number;
        readonly message?: string | null;
        readonly success?: boolean;
    } | null;
};

export type DeleteJob$artifact = {
    "name": "DeleteJob";
    "kind": "HoudiniMutation";
    "hash": "efb42fcac97f3b53526ebb776002ff5538a957d5c54d87171026b8fb3968c867";
    "raw": `mutation DeleteJob($id: Long!) {
  deleteJob(input: {id: $id}) {
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
            "deleteJob": {
                "type": "CallResult";
                "keyRaw": "deleteJob(input: {id: $id})";
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
            "id": "Long";
        };
        "types": {};
        "defaults": {};
        "runtimeScalars": {};
    };
};