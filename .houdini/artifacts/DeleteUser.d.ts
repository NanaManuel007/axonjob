export type DeleteUser = {
    readonly "input": DeleteUser$input;
    readonly "result": DeleteUser$result;
};

export type DeleteUser$result = {
    readonly deleteUser: {
        readonly code: number;
        readonly message: string | null;
        readonly success: boolean;
    } | null;
};

type DeleteUserInput = {
    id: number;
};

export type DeleteUser$input = {
    input: DeleteUserInput;
};

export type DeleteUser$optimistic = {
    readonly deleteUser?: {
        readonly code?: number;
        readonly message?: string | null;
        readonly success?: boolean;
    } | null;
};

export type DeleteUser$artifact = {
    "name": "DeleteUser";
    "kind": "HoudiniMutation";
    "hash": "0f9a52af058ba69d5f1d8c3c1f314a5a736f42b93a0accfca0965f539438b6d4";
    "raw": `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
            "deleteUser": {
                "type": "CallResult";
                "keyRaw": "deleteUser(input: $input)";
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
            "input": "DeleteUserInput";
        };
        "types": {
            "DeleteUserInput": {
                "id": "Long";
            };
        };
        "defaults": {};
        "runtimeScalars": {};
    };
};