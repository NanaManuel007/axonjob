export default {
    "name": "CreateJob",
    "kind": "HoudiniMutation",
    "hash": "df027735bd45bbd58403b90289c1f9f65d5b9b937835271040daf22df5bd8f1f",

    "raw": `mutation CreateJob($input: CreateJobInput!) {
  createJob(input: $input) {
    success
    message
    code
    result {
      id
      title
      jobType
      paymentType
      salaryPerAnnum
      jobHours
      location
      startDate
      numberOfRoles
      duties
      requirements
      published
      clientId
    }
  }
}
`,

    "rootType": "Mutation",
    "stripVariables": [],

    "selection": {
        "fields": {
            "createJob": {
                "type": "CallResultOfJobResponse",
                "keyRaw": "createJob(input: $input)",
                "nullable": true,

                "selection": {
                    "fields": {
                        "success": {
                            "type": "Boolean",
                            "keyRaw": "success",
                            "visible": true
                        },

                        "message": {
                            "type": "String",
                            "keyRaw": "message",
                            "nullable": true,
                            "visible": true
                        },

                        "code": {
                            "type": "Int",
                            "keyRaw": "code",
                            "visible": true
                        },

                        "result": {
                            "type": "JobResponse",
                            "keyRaw": "result",
                            "nullable": true,

                            "selection": {
                                "fields": {
                                    "id": {
                                        "type": "Long",
                                        "keyRaw": "id",
                                        "visible": true
                                    },

                                    "title": {
                                        "type": "String",
                                        "keyRaw": "title",
                                        "visible": true
                                    },

                                    "jobType": {
                                        "type": "JobType",
                                        "keyRaw": "jobType",
                                        "visible": true
                                    },

                                    "paymentType": {
                                        "type": "PaymentType",
                                        "keyRaw": "paymentType",
                                        "visible": true
                                    },

                                    "salaryPerAnnum": {
                                        "type": "Decimal",
                                        "keyRaw": "salaryPerAnnum",
                                        "visible": true
                                    },

                                    "jobHours": {
                                        "type": "String",
                                        "keyRaw": "jobHours",
                                        "visible": true
                                    },

                                    "location": {
                                        "type": "String",
                                        "keyRaw": "location",
                                        "visible": true
                                    },

                                    "startDate": {
                                        "type": "DateTime",
                                        "keyRaw": "startDate",
                                        "visible": true
                                    },

                                    "numberOfRoles": {
                                        "type": "Int",
                                        "keyRaw": "numberOfRoles",
                                        "visible": true
                                    },

                                    "duties": {
                                        "type": "String",
                                        "keyRaw": "duties",
                                        "visible": true
                                    },

                                    "requirements": {
                                        "type": "String",
                                        "keyRaw": "requirements",
                                        "visible": true
                                    },

                                    "published": {
                                        "type": "Boolean",
                                        "keyRaw": "published",
                                        "visible": true
                                    },

                                    "clientId": {
                                        "type": "Long",
                                        "keyRaw": "clientId",
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
            "input": "CreateJobInput"
        },

        "types": {
            "CreateJobRequestInput": {
                "clientId": "Long",
                "duties": "String",
                "jobHours": "String",
                "jobType": "JobType",
                "location": "String",
                "numberOfRoles": "Int",
                "paymentType": "PaymentType",
                "published": "Boolean",
                "requirements": "String",
                "salaryPerAnnum": "Decimal",
                "startDate": "DateTime",
                "title": "String"
            },

            "CreateJobInput": {
                "input": "CreateJobRequestInput"
            }
        },

        "defaults": {},
        "runtimeScalars": {}
    }
};

"HoudiniHash=c088242ce051779e7f18c32801913a3b395a96207bbb0ace0f855b90af79848d";