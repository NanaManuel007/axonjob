export default {
    "name": "DeleteClient",
    "kind": "HoudiniMutation",
    "hash": "eb7bcd6c1c6c3d129af61c36586d5c1b694ed30ae5afa4e877e08f77750b6f85",

    "raw": `mutation DeleteClient($input: DeleteClientInput!) {
  deleteClient(input: $input) {
    success
    message
    code
  }
}
`,

    "rootType": "Mutation",
    "stripVariables": [],

    "selection": {
        "fields": {
            "deleteClient": {
                "type": "CallResult",
                "keyRaw": "deleteClient(input: $input)",
                "nullable": true,

                "selection": {
                    "fields": {
                        "success": {
                            "type": "Boolean",
                            "keyRaw": "success",
                            "visible": true
                        },

                        "message": {
                            "type": "String",
                            "keyRaw": "message",
                            "nullable": true,
                            "visible": true
                        },

                        "code": {
                            "type": "Int",
                            "keyRaw": "code",
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
            "input": "DeleteClientInput"
        },

        "types": {
            "DeleteClientInput": {
                "id": "Long"
            }
        },

        "defaults": {},
        "runtimeScalars": {}
    }
};

"HoudiniHash=04f24a38183dc1f329243fdc336192f2c51aa4dd79de2d00a40a9c6b78297130";