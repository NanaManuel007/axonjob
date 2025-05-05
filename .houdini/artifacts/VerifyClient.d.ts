import type { ValueOf } from "$houdini/runtime/lib/types";
import type { VerificationStatus } from "$houdini/graphql/enums";

export type VerifyClient = {
    readonly "input": VerifyClient$input;
    readonly "result": VerifyClient$result;
};

export type VerifyClient$result = {
    readonly clientVStatus: {
        readonly code: number;
        readonly message: string | null;
        readonly success: boolean;
    } | null;
};

type ClientVStatusInput = {
    id: number;
    status: ValueOf<typeof VerificationStatus>;
};

export type VerifyClient$input = {
    input: ClientVStatusInput;
};

export type VerifyClient$optimistic = {
    readonly clientVStatus?: {
        readonly code?: number;
        readonly message?: string | null;
        readonly success?: boolean;
    } | null;
};

export type VerifyClient$artifact = {
    "name": "VerifyClient";
    "kind": "HoudiniMutation";
    "hash": "ad5d811f7dd3602c1ce4904bc25678c831508a7122e8130c41a8552e1f786aab";
    "raw": `mutation VerifyClient($input: ClientVStatusInput!) {
  clientVStatus(input: $input) {
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
            "clientVStatus": {
                "type": "CallResult";
                "keyRaw": "clientVStatus(input: $input)";
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
            "input": "ClientVStatusInput";
        };
        "types": {
            "ClientVStatusInput": {
                "id": "Long";
                "status": "VerificationStatus";
            };
        };
        "defaults": {};
        "runtimeScalars": {};
    };
};