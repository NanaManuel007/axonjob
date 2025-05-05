export type UpdateUser = {
    readonly "input": UpdateUser$input;
    readonly "result": UpdateUser$result;
};

export type UpdateUser$result = {
    readonly updateUser: {
        readonly code: number;
        readonly message: string | null;
        readonly success: boolean;
        readonly result: {
            readonly createdAt: Date;
            readonly email: string;
            readonly id: number;
            readonly roleId: number;
            readonly roleName: string;
            readonly updatedAt: Date;
        } | null;
    } | null;
};

type UpdateUserRequestInput = {
    email?: string | null | undefined;
    password?: string | null | undefined;
    roleId?: number | null | undefined;
};

export type UpdateUser$input = {
    id: number;
    input: UpdateUserRequestInput;
};

export type UpdateUser$optimistic = {
    readonly updateUser?: {
        readonly code?: number;
        readonly message?: string | null;
        readonly success?: boolean;
        readonly result?: {
            readonly createdAt?: Date;
            readonly email?: string;
            readonly id?: number;
            readonly roleId?: number;
            readonly roleName?: string;
            readonly updatedAt?: Date;
        } | null;
    } | null;
};

export type UpdateUser$artifact = {
    "name": "UpdateUser";
    "kind": "HoudiniMutation";
    "hash": "fc3677db669a8cb13d69c78325aee004f5b3af7d1ec551fee1e856351a5f258d";
    "raw": `mutation UpdateUser($id: Long!, $input: UpdateUserRequestInput!) {
  updateUser(input: {id: $id, input: $input}) {
    code
    message
    success
    result {
      createdAt
      email
      id
      roleId
      roleName
      updatedAt
    }
  }
}
`;
    "rootType": "Mutation";
    "stripVariables": [];
    "selection": {
        "fields": {
            "updateUser": {
                "type": "CallResultOfUserResponse";
                "keyRaw": "updateUser(input: {id: $id, input: $input})";
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
                        "result": {
                            "type": "UserResponse";
                            "keyRaw": "result";
                            "nullable": true;
                            "selection": {
                                "fields": {
                                    "createdAt": {
                                        "type": "DateTime";
                                        "keyRaw": "createdAt";
                                        "visible": true;
                                    };
                                    "email": {
                                        "type": "String";
                                        "keyRaw": "email";
                                        "visible": true;
                                    };
                                    "id": {
                                        "type": "Long";
                                        "keyRaw": "id";
                                        "visible": true;
                                    };
                                    "roleId": {
                                        "type": "Long";
                                        "keyRaw": "roleId";
                                        "visible": true;
                                    };
                                    "roleName": {
                                        "type": "String";
                                        "keyRaw": "roleName";
                                        "visible": true;
                                    };
                                    "updatedAt": {
                                        "type": "DateTime";
                                        "keyRaw": "updatedAt";
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
            "id": "Long";
            "input": "UpdateUserRequestInput";
        };
        "types": {
            "UpdateUserRequestInput": {
                "email": "String";
                "password": "String";
                "roleId": "Long";
            };
        };
        "defaults": {};
        "runtimeScalars": {};
    };
};