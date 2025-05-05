export type AssignPermissionsToRole = {
    readonly "input": AssignPermissionsToRole$input;
    readonly "result": AssignPermissionsToRole$result;
};

export type AssignPermissionsToRole$result = {
    readonly assignPermissions: {
        readonly code: number;
        readonly message: string | null;
        readonly success: boolean;
    } | null;
};

type AssignPermissionsRequestInput = {
    permissionNames: (string)[];
    roleId: number;
};

type AssignPermissionsInput = {
    input: AssignPermissionsRequestInput;
};

export type AssignPermissionsToRole$input = {
    input: AssignPermissionsInput;
};

export type AssignPermissionsToRole$optimistic = {
    readonly assignPermissions?: {
        readonly code?: number;
        readonly message?: string | null;
        readonly success?: boolean;
    } | null;
};

export type AssignPermissionsToRole$artifact = {
    "name": "AssignPermissionsToRole";
    "kind": "HoudiniMutation";
    "hash": "9c6b7564f771783e937f83ef12412f2f4d1e86ccccf9972811ba542493b8ee6f";
    "raw": `mutation AssignPermissionsToRole($input: AssignPermissionsInput!) {
  assignPermissions(input: $input) {
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
            "assignPermissions": {
                "type": "CallResult";
                "keyRaw": "assignPermissions(input: $input)";
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
            "input": "AssignPermissionsInput";
        };
        "types": {
            "AssignPermissionsRequestInput": {
                "permissionNames": "String";
                "roleId": "Long";
            };
            "AssignPermissionsInput": {
                "input": "AssignPermissionsRequestInput";
            };
        };
        "defaults": {};
        "runtimeScalars": {};
    };
};