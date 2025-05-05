export default {
    "name": "DeleteJob",
    "kind": "HoudiniMutation",
    "hash": "efb42fcac97f3b53526ebb776002ff5538a957d5c54d87171026b8fb3968c867",

    "raw": `mutation DeleteJob($id: Long!) {
  deleteJob(input: {id: $id}) {
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
            "deleteJob": {
                "type": "CallResult",
                "keyRaw": "deleteJob(input: {id: $id})",
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
            "id": "Long"
        },

        "types": {},
        "defaults": {},
        "runtimeScalars": {}
    }
};

"HoudiniHash=bd1c4a1500161e28291a034520008821b0a5e1082bc112ee51994d78c39e812c";