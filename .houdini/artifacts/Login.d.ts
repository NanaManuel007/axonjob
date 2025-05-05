export type Login = {
    readonly "input": Login$input;
    readonly "result": Login$result;
};

export type Login$result = {
    readonly login: {
        readonly code: number;
        readonly success: boolean;
        readonly message: string | null;
        readonly result: {
            readonly email: string;
            readonly token: string;
            readonly userId: number;
            readonly role: string;
            readonly permissions: (string)[];
        } | null;
    } | null;
};

type LoginRequestInput = {
    email: string;
    password: string;
};

type LoginInput = {
    input: LoginRequestInput;
};

export type Login$input = {
    input: LoginInput;
};

export type Login$optimistic = {
    readonly login?: {
        readonly code?: number;
        readonly success?: boolean;
        readonly message?: string | null;
        readonly result?: {
            readonly email?: string;
            readonly token?: string;
            readonly userId?: number;
            readonly role?: string;
            readonly permissions?: (string)[];
        } | null;
    } | null;
};

export type Login$artifact = {
    "name": "Login";
    "kind": "HoudiniMutation";
    "hash": "349f388b1dac850d4d5caeb39bc92b196bd701e1860a545d9f2ac54ffd1ca161";
    "raw": `mutation Login($input: LoginInput!) {
  login(input: $input) {
    code
    success
    message
    result {
      email
      token
      userId
      role
      permissions
    }
  }
}
`;
    "rootType": "Mutation";
    "stripVariables": [];
    "selection": {
        "fields": {
            "login": {
                "type": "CallResultOfLoginResponse";
                "keyRaw": "login(input: $input)";
                "nullable": true;
                "selection": {
                    "fields": {
                        "code": {
                            "type": "Int";
                            "keyRaw": "code";
                            "visible": true;
                        };
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
                        "result": {
                            "type": "LoginResponse";
                            "keyRaw": "result";
                            "nullable": true;
                            "selection": {
                                "fields": {
                                    "email": {
                                        "type": "String";
                                        "keyRaw": "email";
                                        "visible": true;
                                    };
                                    "token": {
                                        "type": "String";
                                        "keyRaw": "token";
                                        "visible": true;
                                    };
                                    "userId": {
                                        "type": "Long";
                                        "keyRaw": "userId";
                                        "visible": true;
                                    };
                                    "role": {
                                        "type": "String";
                                        "keyRaw": "role";
                                        "visible": true;
                                    };
                                    "permissions": {
                                        "type": "String";
                                        "keyRaw": "permissions";
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
            "input": "LoginInput";
        };
        "types": {
            "LoginRequestInput": {
                "email": "String";
                "password": "String";
            };
            "LoginInput": {
                "input": "LoginRequestInput";
            };
        };
        "defaults": {};
        "runtimeScalars": {};
    };
};