export type AddUser = {
    readonly "input": AddUser$input;
    readonly "result": AddUser$result;
};

export type AddUser$result = {
    readonly createUser: {
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

type CreateUserRequestInput = {
    email: string;
    password: string;
    roleId: number;
};

type CreateUserInput = {
    input: CreateUserRequestInput;
};

export type AddUser$input = {
    input: CreateUserInput;
};

export type AddUser$optimistic = {
    readonly createUser?: {
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

export type AddUser$artifact = {
    "name": "AddUser";
    "kind": "HoudiniMutation";
    "hash": "e9d11bc520bafb5a86865c016b7d44a21ee16fa9107ddcc2274ff46fe6a4b919";
    "raw": `mutation AddUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
            "createUser": {
                "type": "CallResultOfUserResponse";
                "keyRaw": "createUser(input: $input)";
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
            "input": "CreateUserInput";
        };
        "types": {
            "CreateUserRequestInput": {
                "email": "String";
                "password": "String";
                "roleId": "Long";
            };
            "CreateUserInput": {
                "input": "CreateUserRequestInput";
            };
        };
        "defaults": {};
        "runtimeScalars": {};
    };
};