export default {
    "name": "GetCandidates",
    "kind": "HoudiniQuery",
    "hash": "8a86d1ec67e68ad60a15bd63fcd221c3583ecb7769ab2f237c821280b7765b4e",

    "raw": `query GetCandidates {
  candidates {
    totalCount
    items {
      id
      name
      phone
      skills
      experience
      verified
      email
    }
  }
}
`,

    "rootType": "Query",
    "stripVariables": [],

    "selection": {
        "fields": {
            "candidates": {
                "type": "CandidatesCollectionSegment",
                "keyRaw": "candidates",
                "nullable": true,

                "selection": {
                    "fields": {
                        "totalCount": {
                            "type": "Int",
                            "keyRaw": "totalCount",
                            "visible": true
                        },

                        "items": {
                            "type": "Candidate",
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

                                    "phone": {
                                        "type": "String",
                                        "keyRaw": "phone",
                                        "visible": true
                                    },

                                    "skills": {
                                        "type": "String",
                                        "keyRaw": "skills",
                                        "visible": true
                                    },

                                    "experience": {
                                        "type": "String",
                                        "keyRaw": "experience",
                                        "nullable": true,
                                        "visible": true
                                    },

                                    "verified": {
                                        "type": "Boolean",
                                        "keyRaw": "verified",
                                        "visible": true
                                    },

                                    "email": {
                                        "type": "String",
                                        "keyRaw": "email",
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

"HoudiniHash=c1bc038b42704dd3a049054ffc9fe29e88d6aa546c713a145493547d8e26cd6b";