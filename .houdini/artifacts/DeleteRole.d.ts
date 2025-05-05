export type DeleteRole = {
    readonly "input": DeleteRole$input;
    readonly "result": DeleteRole$result;
};

export type DeleteRole$result = {
    readonly deleteRole: {
        readonly code: number;
        readonly message: string | null;
        readonly success: boolean;
    } | null;
};

type DeleteRoleInput = {
    id: number;
};

export type DeleteRole$input = {
    input: DeleteRoleInput;
};

export type DeleteRole$optimistic = {
    readonly deleteRole?: {
        readonly code?: number;
        readonly message?: string | null;
        readonly success?: boolean;
    } | null;
};

export type DeleteRole$artifact = {
    "name": "DeleteRole";
    "kind": "HoudiniMutation";
    "hash": "0842226c67a6566ab926110410ef174cae94d4e889935fac8179c7489701f4d5";
    "raw": `mutation DeleteRole($input: DeleteRoleInput!) {
  deleteRole(input: $input) {
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
            "deleteRole": {
                "type": "CallResult";
                "keyRaw": "deleteRole(input: $input)";
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
            "input": "DeleteRoleInput";
        };
        "types": {
            "DeleteRoleInput": {
                "id": "Long";
            };
        };
        "defaults": {};
        "runtimeScalars": {};
    };
};