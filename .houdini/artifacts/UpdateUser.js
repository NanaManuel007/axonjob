export default {
    "name": "UpdateUser",
    "kind": "HoudiniMutation",
    "hash": "fc3677db669a8cb13d69c78325aee004f5b3af7d1ec551fee1e856351a5f258d",

    "raw": `mutation UpdateUser($id: Long!, $input: UpdateUserRequestInput!) {
  updateUser(input: {id: $id, input: $input}) {
    code
    message
    success
    result {
      createdAt
      email
      id
      roleId
      roleName
      updatedAt
    }
  }
}
`,

    "rootType": "Mutation",
    "stripVariables": [],

    "selection": {
        "fields": {
            "updateUser": {
                "type": "CallResultOfUserResponse",
                "keyRaw": "updateUser(input: {id: $id, input: $input})",
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
                            "type": "UserResponse",
                            "keyRaw": "result",
                            "nullable": true,

                            "selection": {
                                "fields": {
                                    "createdAt": {
                                        "type": "DateTime",
                                        "keyRaw": "createdAt",
                                        "visible": true
                                    },

                                    "email": {
                                        "type": "String",
                                        "keyRaw": "email",
                                        "visible": true
                                    },

                                    "id": {
                                        "type": "Long",
                                        "keyRaw": "id",
                                        "visible": true
                                    },

                                    "roleId": {
                                        "type": "Long",
                                        "keyRaw": "roleId",
                                        "visible": true
                                    },

                                    "roleName": {
                                        "type": "String",
                                        "keyRaw": "roleName",
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
            "id": "Long",
            "input": "UpdateUserRequestInput"
        },

        "types": {
            "UpdateUserRequestInput": {
                "email": "String",
                "password": "String",
                "roleId": "Long"
            }
        },

        "defaults": {},
        "runtimeScalars": {}
    }
};

"HoudiniHash=32d3857e5ae6b308612ccca2f31724ba866ee62132ae53ef9446a6359d332f36";