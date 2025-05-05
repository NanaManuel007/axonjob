export default {
    "name": "DeleteRole",
    "kind": "HoudiniMutation",
    "hash": "0842226c67a6566ab926110410ef174cae94d4e889935fac8179c7489701f4d5",

    "raw": `mutation DeleteRole($input: DeleteRoleInput!) {
  deleteRole(input: $input) {
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
            "deleteRole": {
                "type": "CallResult",
                "keyRaw": "deleteRole(input: $input)",
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
            "input": "DeleteRoleInput"
        },

        "types": {
            "DeleteRoleInput": {
                "id": "Long"
            }
        },

        "defaults": {},
        "runtimeScalars": {}
    }
};

"HoudiniHash=ba61309cc8fac9dfcbf1b02f7dea1b2e787a648de367a7fdcc0c9a6ffd9b0433";