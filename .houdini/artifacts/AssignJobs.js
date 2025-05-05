export default {
    "name": "AssignJobs",
    "kind": "HoudiniMutation",
    "hash": "0873c12ea59ba9eef40e0e8eea87b1976470f337f7ca2320f9501c62075b67de",

    "raw": `mutation AssignJobs($input: AssignJobInput!) {
  assignJob(input: $input) {
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
            "assignJob": {
                "type": "CallResult",
                "keyRaw": "assignJob(input: $input)",
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
            "input": "AssignJobInput"
        },

        "types": {
            "AssignJobRequestInput": {
                "candidateId": "Long",
                "jobId": "Long",
                "status": "AssignmentStatus"
            },

            "AssignJobInput": {
                "input": "AssignJobRequestInput"
            }
        },

        "defaults": {},
        "runtimeScalars": {}
    }
};

"HoudiniHash=d39614bef77981e3989acd4e8d3ab1eb67a79cdb85d68ddca14525ab5dfeb07d";