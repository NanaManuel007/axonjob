export default {
    "name": "AllUser",
    "kind": "HoudiniQuery",
    "hash": "d38f5545ff9a0e280b0c1f4b4cf5a8ce63c451f6193ba8ba69d1133aae2d9369",

    "raw": `query AllUser {
  users(skip: null, take: null, where: null, order: null) {
    items {
      createdAt
      email
      id
      password
      roleId
      updatedAt
      role {
        createdAt
        description
        id
        isActive
        name
        updatedAt
        rolePermissions {
          permissionName
          roleId
          id
        }
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    totalCount
  }
}
`,

    "rootType": "Query",
    "stripVariables": [],

    "selection": {
        "fields": {
            "users": {
                "type": "UsersCollectionSegment",
                "keyRaw": "users(order: null, skip: null, take: null, where: null)",
                "nullable": true,

                "selection": {
                    "fields": {
                        "items": {
                            "type": "User",
                            "keyRaw": "items",
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

                                    "password": {
                                        "type": "String",
                                        "keyRaw": "password",
                                        "visible": true
                                    },

                                    "roleId": {
                                        "type": "Long",
                                        "keyRaw": "roleId",
                                        "visible": true
                                    },

                                    "updatedAt": {
                                        "type": "DateTime",
                                        "keyRaw": "updatedAt",
                                        "visible": true
                                    },

                                    "role": {
                                        "type": "Role",
                                        "keyRaw": "role",
                                        "nullable": true,

                                        "selection": {
                                            "fields": {
                                                "createdAt": {
                                                    "type": "DateTime",
                                                    "keyRaw": "createdAt",
                                                    "visible": true
                                                },

                                                "description": {
                                                    "type": "String",
                                                    "keyRaw": "description",
                                                    "nullable": true,
                                                    "visible": true
                                                },

                                                "id": {
                                                    "type": "Long",
                                                    "keyRaw": "id",
                                                    "visible": true
                                                },

                                                "isActive": {
                                                    "type": "Boolean",
                                                    "keyRaw": "isActive",
                                                    "visible": true
                                                },

                                                "name": {
                                                    "type": "String",
                                                    "keyRaw": "name",
                                                    "visible": true
                                                },

                                                "updatedAt": {
                                                    "type": "DateTime",
                                                    "keyRaw": "updatedAt",
                                                    "visible": true
                                                },

                                                "rolePermissions": {
                                                    "type": "RolePermission",
                                                    "keyRaw": "rolePermissions",

                                                    "selection": {
                                                        "fields": {
                                                            "permissionName": {
                                                                "type": "String",
                                                                "keyRaw": "permissionName",
                                                                "visible": true
                                                            },

                                                            "roleId": {
                                                                "type": "Long",
                                                                "keyRaw": "roleId",
                                                                "visible": true
                                                            },

                                                            "id": {
                                                                "type": "Long",
                                                                "keyRaw": "id",
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

                            "visible": true
                        },

                        "pageInfo": {
                            "type": "CollectionSegmentInfo",
                            "keyRaw": "pageInfo",

                            "selection": {
                                "fields": {
                                    "hasNextPage": {
                                        "type": "Boolean",
                                        "keyRaw": "hasNextPage",
                                        "visible": true
                                    },

                                    "hasPreviousPage": {
                                        "type": "Boolean",
                                        "keyRaw": "hasPreviousPage",
                                        "visible": true
                                    }
                                }
                            },

                            "visible": true
                        },

                        "totalCount": {
                            "type": "Int",
                            "keyRaw": "totalCount",
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

    "policy": "NetworkOnly",
    "partial": false
};

"HoudiniHash=c9c52dd028e070f294590c0a57029d38c0ed3792f5b56f84dfe54697a06f3c50";