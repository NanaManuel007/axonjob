export type UserDataAndPermissions = {
    readonly "input": UserDataAndPermissions$input;
    readonly "result": UserDataAndPermissions$result | undefined;
};

export type UserDataAndPermissions$result = {
    readonly users: {
        /**
         * A flattened list of the items.
        */
        readonly items: ({
            readonly role: {
                readonly createdAt: Date;
                readonly description: string | null;
                readonly isActive: boolean;
                readonly id: number;
                readonly name: string;
                readonly rolePermissions: ({
                    readonly permissionName: string;
                    readonly roleId: number;
                })[];
            } | null;
            readonly createdAt: Date;
            readonly email: string;
            readonly id: number;
        })[] | null;
    } | null;
};

export type UserDataAndPermissions$input = {
    userId: number;
};

export type UserDataAndPermissions$artifact = {
    "name": "UserDataAndPermissions";
    "kind": "HoudiniQuery";
    "hash": "76e942f03e7d41077cbc5bb3e0f08019a8f3310fbadb18e0b95efb6e993352d7";
    "raw": `query UserDataAndPermissions($userId: Long!) {
  users(where: {id: {eq: $userId}}) {
    items {
      role {
        createdAt
        description
        isActive
        id
        name
        rolePermissions {
          permissionName
          roleId
          id
        }
      }
      createdAt
      email
      id
    }
  }
}
`;
    "rootType": "Query";
    "stripVariables": [];
    "selection": {
        "fields": {
            "users": {
                "type": "UsersCollectionSegment";
                "keyRaw": "users(where: {id: {eq: $userId}})";
                "nullable": true;
                "selection": {
                    "fields": {
                        "items": {
                            "type": "User";
                            "keyRaw": "items";
                            "nullable": true;
                            "selection": {
                                "fields": {
                                    "role": {
                                        "type": "Role";
                                        "keyRaw": "role";
                                        "nullable": true;
                                        "selection": {
                                            "fields": {
                                                "createdAt": {
                                                    "type": "DateTime";
                                                    "keyRaw": "createdAt";
                                                    "visible": true;
                                                };
                                                "description": {
                                                    "type": "String";
                                                    "keyRaw": "description";
                                                    "nullable": true;
                                                    "visible": true;
                                                };
                                                "isActive": {
                                                    "type": "Boolean";
                                                    "keyRaw": "isActive";
                                                    "visible": true;
                                                };
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
                                                            "roleId": {
                                                                "type": "Long";
                                                                "keyRaw": "roleId";
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
                                    "createdAt": {
                                        "type": "DateTime";
                                        "keyRaw": "createdAt";
                                        "visible": true;
                                    };
                                    "email": {
                                        "type": "String";
                                        "keyRaw": "email";
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
    "pluginData": {
        "houdini-svelte": {};
    };
    "input": {
        "fields": {
            "userId": "Long";
        };
        "types": {};
        "defaults": {};
        "runtimeScalars": {};
    };
    "policy": "NetworkOnly";
    "partial": false;
};