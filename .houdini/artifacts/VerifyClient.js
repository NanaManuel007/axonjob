export default {
    "name": "VerifyClient",
    "kind": "HoudiniMutation",
    "hash": "ad5d811f7dd3602c1ce4904bc25678c831508a7122e8130c41a8552e1f786aab",

    "raw": `mutation VerifyClient($input: ClientVStatusInput!) {
  clientVStatus(input: $input) {
    code
    message
    success
  }
}
`,

    "rootType": "Mutation",
    "stripVariables": [],

    "selection": {
        "fields": {
            "clientVStatus": {
                "type": "CallResult",
                "keyRaw": "clientVStatus(input: $input)",
                "nullable": true,

                "selection": {
                    "fields": {
                        "code": {
                            "type": "Int",
                            "keyRaw": "code",
                            "visible": true
                        },

                        "message": {
                            "type": "String",
                            "keyRaw": "message",
                            "nullable": true,
                            "visible": true
                        },

                        "success": {
                            "type": "Boolean",
                            "keyRaw": "success",
                            "visible": true
                        }
                    }
                },

                "visible": true
            }
        }
    },

    "pluginData": {
        "houdini-svelte": {}
    },

    "input": {
        "fields": {
            "input": "ClientVStatusInput"
        },

        "types": {
            "ClientVStatusInput": {
                "id": "Long",
                "status": "VerificationStatus"
            }
        },

        "defaults": {},
        "runtimeScalars": {}
    }
};

"HoudiniHash=5fbbecf66a46ca3bc5ca9cd670644b5fc046d354f7e7efff00c9ee4c0389fe20";