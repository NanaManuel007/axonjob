export default {
    "name": "DeleteAssignment",
    "kind": "HoudiniMutation",
    "hash": "d49bfc9bb9c204438f1686a079fe3ede9c32fba00e79732b9c699b0eda27acc6",

    "raw": `mutation DeleteAssignment($input: DeleteAssignmentInput!) {
  deleteAssignment(input: $input) {
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
            "deleteAssignment": {
                "type": "CallResult",
                "keyRaw": "deleteAssignment(input: $input)",
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
            "input": "DeleteAssignmentInput"
        },

        "types": {
            "DeleteAssignmentInput": {
                "candidateId": "Long",
                "jobId": "Long"
            }
        },

        "defaults": {},
        "runtimeScalars": {}
    }
};

"HoudiniHash=2bb289b3b370ca6ff31483a5aedd6d2a5cde8aab5b7084c9da413aaa41b8e252";