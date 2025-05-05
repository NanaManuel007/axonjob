export default {
    "name": "AllPermission",
    "kind": "HoudiniQuery",
    "hash": "5abdf655f61c9c04aea60439a39e325816e73e670056d317493743b010a90e62",

    "raw": `query AllPermission {
  permissions {
    totalCount
    items {
      description
      name
    }
  }
}
`,

    "rootType": "Query",
    "stripVariables": [],

    "selection": {
        "fields": {
            "permissions": {
                "type": "PermissionsCollectionSegment",
                "keyRaw": "permissions",
                "nullable": true,

                "selection": {
                    "fields": {
                        "totalCount": {
                            "type": "Int",
                            "keyRaw": "totalCount",
                            "visible": true
                        },

                        "items": {
                            "type": "Permission",
                            "keyRaw": "items",
                            "nullable": true,

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

"HoudiniHash=0bef351feb20a8decc7a3032bee16f32826a5f1f3825d38a7979074b5291078d";