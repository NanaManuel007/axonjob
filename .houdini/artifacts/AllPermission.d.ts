export type AllPermission = {
    readonly "input": AllPermission$input;
    readonly "result": AllPermission$result | undefined;
};

export type AllPermission$result = {
    readonly permissions: {
        readonly totalCount: number;
        /**
         * A flattened list of the items.
        */
        readonly items: ({
            readonly description: string | null;
            readonly name: string;
        })[] | null;
    } | null;
};

export type AllPermission$input = null;

export type AllPermission$artifact = {
    "name": "AllPermission";
    "kind": "HoudiniQuery";
    "hash": "5abdf655f61c9c04aea60439a39e325816e73e670056d317493743b010a90e62";
    "raw": `query AllPermission {
  permissions {
    totalCount
    items {
      description
      name
    }
  }
}
`;
    "rootType": "Query";
    "stripVariables": [];
    "selection": {
        "fields": {
            "permissions": {
                "type": "PermissionsCollectionSegment";
                "keyRaw": "permissions";
                "nullable": true;
                "selection": {
                    "fields": {
                        "totalCount": {
                            "type": "Int";
                            "keyRaw": "totalCount";
                            "visible": true;
                        };
                        "items": {
                            "type": "Permission";
                            "keyRaw": "items";
                            "nullable": true;
                            "selection": {
                                "fields": {
                                    "description": {
                                        "type": "String";
                                        "keyRaw": "description";
                                        "nullable": true;
                                        "visible": true;
                                    };
                                    "name": {
                                        "type": "String";
                                        "keyRaw": "name";
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
    "policy": "NetworkOnly";
    "partial": false;
};