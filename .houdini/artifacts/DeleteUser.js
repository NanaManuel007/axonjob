export default {
    "name": "DeleteUser",
    "kind": "HoudiniMutation",
    "hash": "0f9a52af058ba69d5f1d8c3c1f314a5a736f42b93a0accfca0965f539438b6d4",

    "raw": `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
            "deleteUser": {
                "type": "CallResult",
                "keyRaw": "deleteUser(input: $input)",
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
            "input": "DeleteUserInput"
        },

        "types": {
            "DeleteUserInput": {
                "id": "Long"
            }
        },

        "defaults": {},
        "runtimeScalars": {}
    }
};

"HoudiniHash=8036542158c0a88ae782901d0eae667447fb8736f140b38114aed954a981eff1";