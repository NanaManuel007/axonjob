export default {
    "name": "CreateClient",
    "kind": "HoudiniMutation",
    "hash": "b9236f0cd8aea3d8cafd0c303d78cbf91707704a2a0def528c4084095ba30e9c",

    "raw": `mutation CreateClient($input: CreateClientRequestInput!) {
  createClient(input: {input: $input}) {
    code
    message
    success
    result {
      id
      companyName
      companyEmail
      companyPhone
      companyAddress
      companyLocation
      companyLogo
      ceoFirstName
      ceoLastName
      jobTitle
      postalCode
      registrationNumber
      website
      linkedIn
      locationCoordinates
    }
  }
}
`,

    "rootType": "Mutation",
    "stripVariables": [],

    "selection": {
        "fields": {
            "createClient": {
                "type": "CallResultOfClientResponse",
                "keyRaw": "createClient(input: {input: $input})",
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
                            "type": "ClientResponse",
                            "keyRaw": "result",
                            "nullable": true,

                            "selection": {
                                "fields": {
                                    "id": {
                                        "type": "Long",
                                        "keyRaw": "id",
                                        "visible": true
                                    },

                                    "companyName": {
                                        "type": "String",
                                        "keyRaw": "companyName",
                                        "visible": true
                                    },

                                    "companyEmail": {
                                        "type": "String",
                                        "keyRaw": "companyEmail",
                                        "visible": true
                                    },

                                    "companyPhone": {
                                        "type": "String",
                                        "keyRaw": "companyPhone",
                                        "visible": true
                                    },

                                    "companyAddress": {
                                        "type": "String",
                                        "keyRaw": "companyAddress",
                                        "visible": true
                                    },

                                    "companyLocation": {
                                        "type": "String",
                                        "keyRaw": "companyLocation",
                                        "visible": true
                                    },

                                    "companyLogo": {
                                        "type": "String",
                                        "keyRaw": "companyLogo",
                                        "nullable": true,
                                        "visible": true
                                    },

                                    "ceoFirstName": {
                                        "type": "String",
                                        "keyRaw": "ceoFirstName",
                                        "visible": true
                                    },

                                    "ceoLastName": {
                                        "type": "String",
                                        "keyRaw": "ceoLastName",
                                        "visible": true
                                    },

                                    "jobTitle": {
                                        "type": "String",
                                        "keyRaw": "jobTitle",
                                        "nullable": true,
                                        "visible": true
                                    },

                                    "postalCode": {
                                        "type": "String",
                                        "keyRaw": "postalCode",
                                        "visible": true
                                    },

                                    "registrationNumber": {
                                        "type": "String",
                                        "keyRaw": "registrationNumber",
                                        "visible": true
                                    },

                                    "website": {
                                        "type": "String",
                                        "keyRaw": "website",
                                        "nullable": true,
                                        "visible": true
                                    },

                                    "linkedIn": {
                                        "type": "String",
                                        "keyRaw": "linkedIn",
                                        "nullable": true,
                                        "visible": true
                                    },

                                    "locationCoordinates": {
                                        "type": "String",
                                        "keyRaw": "locationCoordinates",
                                        "nullable": true,
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
            "input": "CreateClientRequestInput"
        },

        "types": {
            "CreateClientRequestInput": {
                "ceoFirstName": "String",
                "ceoLastName": "String",
                "companyAddress": "String",
                "companyEmail": "String",
                "companyLocation": "String",
                "companyLogo": "String",
                "companyName": "String",
                "companyPhone": "String",
                "jobTitle": "String",
                "linkedIn": "String",
                "locationCoordinates": "String",
                "logoImg": "Upload",
                "postalCode": "String",
                "registrationNumber": "String",
                "verificationStatus": "VerificationStatus",
                "website": "String"
            }
        },

        "defaults": {},
        "runtimeScalars": {}
    }
};

"HoudiniHash=6ce1b1a6d71d2837dcf23e07fc8653b86401c45348b13da22437ff3aa1c448da";