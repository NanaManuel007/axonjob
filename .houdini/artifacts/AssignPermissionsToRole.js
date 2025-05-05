export default {
    "name": "AssignPermissionsToRole",
    "kind": "HoudiniMutation",
    "hash": "9c6b7564f771783e937f83ef12412f2f4d1e86ccccf9972811ba542493b8ee6f",

    "raw": `mutation AssignPermissionsToRole($input: AssignPermissionsInput!) {
  assignPermissions(input: $input) {
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
            "assignPermissions": {
                "type": "CallResult",
                "keyRaw": "assignPermissions(input: $input)",
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
            "input": "AssignPermissionsInput"
        },

        "types": {
            "AssignPermissionsRequestInput": {
                "permissionNames": "String",
                "roleId": "Long"
            },

            "AssignPermissionsInput": {
                "input": "AssignPermissionsRequestInput"
            }
        },

        "defaults": {},
        "runtimeScalars": {}
    }
};

"HoudiniHash=fa35636179e764270094d42a42a045a60d084ca4e1cda501953c56e4aca7f410";