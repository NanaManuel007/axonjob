export type UpdateRole = {
    readonly "input": UpdateRole$input;
    readonly "result": UpdateRole$result;
};

export type UpdateRole$result = {
    readonly updateRole: {
        readonly code: number;
        readonly message: string | null;
        readonly success: boolean;
    } | null;
};

type CreateRoleRequestInput = {
    description?: string | null | undefined;
    name: string;
    permissions: (string)[];
};

export type UpdateRole$input = {
    input: CreateRoleRequestInput;
    id: number;
};

export type UpdateRole$optimistic = {
    readonly updateRole?: {
        readonly code?: number;
        readonly message?: string | null;
        readonly success?: boolean;
    } | null;
};

export type UpdateRole$artifact = {
    "name": "UpdateRole";
    "kind": "HoudiniMutation";
    "hash": "3d560ae0025f1e8c51a7ebf54b0fc4dae50c3896f6f447d650fb1a5b7b6a102a";
    "raw": `mutation UpdateRole($input: CreateRoleRequestInput!, $id: Long!) {
  updateRole(input: {id: $id, input: $input}) {
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
            "updateRole": {
                "type": "CallResultOfRoleResponse";
                "keyRaw": "updateRole(input: {id: $id, input: $input})";
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
            "input": "CreateRoleRequestInput";
            "id": "Long";
        };
        "types": {
            "CreateRoleRequestInput": {
                "description": "String";
                "name": "String";
                "permissions": "String";
            };
        };
        "defaults": {};
        "runtimeScalars": {};
    };
};