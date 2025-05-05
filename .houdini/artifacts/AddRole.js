export default {
    "name": "AddRole",
    "kind": "HoudiniMutation",
    "hash": "e70e75173f4d34c94765a8cd5248c8ff4a261327f6aaa1b62cc25728b411f8bb",

    "raw": `mutation AddRole($input: CreateRoleInput!) {
  createRole(input: $input) {
    code
    message
    success
    result {
      id
      name
      description
      permissions
      isActive
      createdAt
      updatedAt
    }
  }
}
`,

    "rootType": "Mutation",
    "stripVariables": [],

    "selection": {
        "fields": {
            "createRole": {
                "type": "CallResultOfRoleResponse",
                "keyRaw": "createRole(input: $input)",
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
                        },

                        "result": {
                            "type": "RoleResponse",
                            "keyRaw": "result",
                            "nullable": true,

                            "selection": {
                                "fields": {
                                    "id": {
                                        "type": "Long",
                                        "keyRaw": "id",
                                        "visible": true
                                    },

                                    "name": {
                                        "type": "String",
                                        "keyRaw": "name",
                                        "visible": true
                                    },

                                    "description": {
                                        "type": "String",
                                        "keyRaw": "description",
                                        "nullable": true,
                                        "visible": true
                                    },

                                    "permissions": {
                                        "type": "String",
                                        "keyRaw": "permissions",
                                        "visible": true
                                    },

                                    "isActive": {
                                        "type": "Boolean",
                                        "keyRaw": "isActive",
                                        "visible": true
                                    },

                                    "createdAt": {
                                        "type": "DateTime",
                                        "keyRaw": "createdAt",
                                        "visible": true
                                    },

                                    "updatedAt": {
                                        "type": "DateTime",
                                        "keyRaw": "updatedAt",
                                        "visible": true
                                    }
                                }
                            },

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
            "input": "CreateRoleInput"
        },

        "types": {
            "CreateRoleRequestInput": {
                "description": "String",
                "name": "String",
                "permissions": "String"
            },

            "CreateRoleInput": {
                "input": "CreateRoleRequestInput"
            }
        },

        "defaults": {},
        "runtimeScalars": {}
    }
};

"HoudiniHash=93ef5a36010cb455bdcf64cc4fe0d85842b67c17718c8155623ec993ca5359d3";