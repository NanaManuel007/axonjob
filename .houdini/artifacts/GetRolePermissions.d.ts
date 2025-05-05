export type GetRolePermissions = {
    readonly "input": GetRolePermissions$input;
    readonly "result": GetRolePermissions$result | undefined;
};

export type GetRolePermissions$result = {
    readonly roles: {
        /**
         * A flattened list of the items.
        */
        readonly items: ({
            readonly id: number;
            readonly name: string;
            readonly rolePermissions: ({
                readonly permissionName: string;
                readonly permission: {
                    readonly description: string | null;
                };
            })[];
        })[] | null;
    } | null;
};

export type GetRolePermissions$input = {
    roleId: number;
};

export type GetRolePermissions$artifact = {
    "name": "GetRolePermissions";
    "kind": "HoudiniQuery";
    "hash": "f1bd1f357388be2a98ef213de2af5c4b76dadd01248cf619562f0717ba84d473";
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
`;
    "rootType": "Query";
    "stripVariables": [];
    "selection": {
        "fields": {
            "roles": {
                "type": "RolesCollectionSegment";
                "keyRaw": "roles(where: {id: {eq: $roleId}})";
                "nullable": true;
                "selection": {
                    "fields": {
                        "items": {
                            "type": "Role";
                            "keyRaw": "items";
                            "nullable": true;
                            "selection": {
                                "fields": {
                                    "id": {
                                        "type": "Long";
                                        "keyRaw": "id";
                                        "visible": true;
                                    };
                                    "name": {
                                        "type": "String";
                                        "keyRaw": "name";
                                        "visible": true;
                                    };
                                    "rolePermissions": {
                                        "type": "RolePermission";
                                        "keyRaw": "rolePermissions";
                                        "selection": {
                                            "fields": {
                                                "permissionName": {
                                                    "type": "String";
                                                    "keyRaw": "permissionName";
                                                    "visible": true;
                                                };
                                                "permission": {
                                                    "type": "Permission";
                                                    "keyRaw": "permission";
                                                    "selection": {
                                                        "fields": {
                                                            "description": {
                                                                "type": "String";
                                                                "keyRaw": "description";
                                                                "nullable": true;
                                                                "visible": true;
                                                            };
                                                        };
                                                    };
                                                    "visible": true;
                                                };
                                                "id": {
                                                    "type": "Long";
                                                    "keyRaw": "id";
                                                    "visible": true;
                                                };
                                            };
                                        };
                                        "visible": true;
                                    };
                                };
                            };
                            "visible": true;
                        };
                    };
                };
                "visible": true;
            };
        };
    };
    "pluginData": {
        "houdini-svelte": {};
    };
    "input": {
        "fields": {
            "roleId": "Long";
        };
        "types": {};
        "defaults": {};
        "runtimeScalars": {};
    };
    "policy": "NetworkOnly";
    "partial": false;
};