export type DeleteClient = {
    readonly "input": DeleteClient$input;
    readonly "result": DeleteClient$result;
};

export type DeleteClient$result = {
    readonly deleteClient: {
        readonly success: boolean;
        readonly message: string | null;
        readonly code: number;
    } | null;
};

type DeleteClientInput = {
    id: number;
};

export type DeleteClient$input = {
    input: DeleteClientInput;
};

export type DeleteClient$optimistic = {
    readonly deleteClient?: {
        readonly success?: boolean;
        readonly message?: string | null;
        readonly code?: number;
    } | null;
};

export type DeleteClient$artifact = {
    "name": "DeleteClient";
    "kind": "HoudiniMutation";
    "hash": "eb7bcd6c1c6c3d129af61c36586d5c1b694ed30ae5afa4e877e08f77750b6f85";
    "raw": `mutation DeleteClient($input: DeleteClientInput!) {
  deleteClient(input: $input) {
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
            "deleteClient": {
                "type": "CallResult";
                "keyRaw": "deleteClient(input: $input)";
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
            "input": "DeleteClientInput";
        };
        "types": {
            "DeleteClientInput": {
                "id": "Long";
            };
        };
        "defaults": {};
        "runtimeScalars": {};
    };
};