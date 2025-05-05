export type AddNewUser = {
    readonly "input": AddNewUser$input;
    readonly "result": AddNewUser$result;
};

export type AddNewUser$result = {
    readonly createUser: {
        readonly code: number;
        readonly message: string | null;
        readonly success: boolean;
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

export type AddNewUser$input = {
    input: CreateUserInput;
};

export type AddNewUser$optimistic = {
    readonly createUser?: {
        readonly code?: number;
        readonly message?: string | null;
        readonly success?: boolean;
    } | null;
};

export type AddNewUser$artifact = {
    "name": "AddNewUser";
    "kind": "HoudiniMutation";
    "hash": "c2c2b9e06b9e81d296b44423357df1045b0759c45be6cf6ae26619ada7e091e0";
    "raw": `mutation AddNewUser($input: CreateUserInput!) {
  createUser(input: $input) {
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