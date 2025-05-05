export default {
    "name": "GetRolePermissions",
    "kind": "HoudiniQuery",
    "hash": "f1bd1f357388be2a98ef213de2af5c4b76dadd01248cf619562f0717ba84d473",

    "raw": `query GetRolePermissions($roleId: Long!) {
  roles(where: {id: {eq: $roleId}}) {
    items {
      id
      name
      rolePermissions {
        permissionName
        permission {
          description
        }
        id
      }
    }
  }
}
`,

    "rootType": "Query",
    "stripVariables": [],

    "selection": {
        "fields": {
            "roles": {
                "type": "RolesCollectionSegment",
                "keyRaw": "roles(where: {id: {eq: $roleId}})",
                "nullable": true,

                "selection": {
                    "fields": {
                        "items": {
                            "type": "Role",
                            "keyRaw": "items",
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

                                                "permission": {
                                                    "type": "Permission",
                                                    "keyRaw": "permission",

                                                    "selection": {
                                                        "fields": {
                                                            "description": {
                                                                "type": "String",
                                                                "keyRaw": "description",
                                                                "nullable": true,
                                                                "visible": true
                                                            }
                                                        }
                                                    },

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
            }
        }
    },

    "pluginData": {
        "houdini-svelte": {}
    },

    "input": {
        "fields": {
            "roleId": "Long"
        },

        "types": {},
        "defaults": {},
        "runtimeScalars": {}
    },

    "policy": "NetworkOnly",
    "partial": false
};

"HoudiniHash=a0484a3fd2ceecbe89e67a9aad3b0cb51ff04c9cd3d0358b72b140c4157ac193";