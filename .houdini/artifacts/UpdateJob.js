export default {
    "name": "UpdateJob",
    "kind": "HoudiniMutation",
    "hash": "a53a13103c6adb25aa2247b952ae1a78ec51851dd407ef5f37a1023227340adf",

    "raw": `mutation UpdateJob($input: UpdateJobInput!) {
  updateJob(input: $input) {
    code
    message
    success
  }
}
`,

    "rootType": "Mutation",
    "stripVariables": [],

    "selection": {
        "fields": {
            "updateJob": {
                "type": "CallResultOfJobResponse",
                "keyRaw": "updateJob(input: $input)",
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
            "input": "UpdateJobInput"
        },

        "types": {
            "UpdateJobRequestInput": {
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

            "UpdateJobInput": {
                "id": "Long",
                "input": "UpdateJobRequestInput"
            }
        },

        "defaults": {},
        "runtimeScalars": {}
    }
};

"HoudiniHash=9d37391fe4cac35abe81dabc7e71f66c26f3b5581853d92b96075504fda2b38a";