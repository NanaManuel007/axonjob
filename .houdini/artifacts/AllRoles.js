export default {
    "name": "AllRoles",
    "kind": "HoudiniQuery",
    "hash": "28d8d620ad181bfa8150b4ec159a208c9cdd63a87441b9a7782b9e7c340d2539",

    "raw": `query AllRoles {
  roles {
    totalCount
    items {
      createdAt
      description
      id
      isActive
      name
      updatedAt
      rolePermissions {
        permissionName
        roleId
        permission {
          description
          name
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
                "keyRaw": "roles",
                "nullable": true,

                "selection": {
                    "fields": {
                        "totalCount": {
                            "type": "Int",
                            "keyRaw": "totalCount",
                            "visible": true
                        },

                        "items": {
                            "type": "Role",
                            "keyRaw": "items",
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
                                                            },

                                                            "name": {
                                                                "type": "String",
                                                                "keyRaw": "name",
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

    "policy": "NetworkOnly",
    "partial": false
};

"HoudiniHash=42a5662b8df80f02c7f0db481e1cc33740aea53bc69e24bd2624f5955861674d";