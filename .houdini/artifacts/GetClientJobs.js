export default {
    "name": "GetClientJobs",
    "kind": "HoudiniQuery",
    "hash": "291953fb58ea59fb29e686acb494269f90b26f883224798e77637e72af08ad68",

    "raw": `query GetClientJobs($filter: JobFilterInput!, $skip: Int!, $take: Int!) {
  jobs(where: $filter, take: $take, skip: $skip, order: [{id: DESC}]) {
    totalCount
    items {
      id
      title
      location
      jobType
      status
      createdAt
      clientId
      duties
      jobHours
      numberOfRoles
      paymentType
      requirements
      published
      salaryPerAnnum
      startDate
      updatedAt
      assignments {
        status
        candidate {
          id
          name
          email
        }
        id
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
  }
}
`,

    "rootType": "Query",
    "stripVariables": [],

    "selection": {
        "fields": {
            "jobs": {
                "type": "JobsCollectionSegment",
                "keyRaw": "jobs(order: [{id: DESC}], skip: $skip, take: $take, where: $filter)",
                "nullable": true,

                "selection": {
                    "fields": {
                        "totalCount": {
                            "type": "Int",
                            "keyRaw": "totalCount",
                            "visible": true
                        },

                        "items": {
                            "type": "Job",
                            "keyRaw": "items",
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

                                    "location": {
                                        "type": "String",
                                        "keyRaw": "location",
                                        "visible": true
                                    },

                                    "jobType": {
                                        "type": "JobType",
                                        "keyRaw": "jobType",
                                        "visible": true
                                    },

                                    "status": {
                                        "type": "JobStatus",
                                        "keyRaw": "status",
                                        "visible": true
                                    },

                                    "createdAt": {
                                        "type": "DateTime",
                                        "keyRaw": "createdAt",
                                        "visible": true
                                    },

                                    "clientId": {
                                        "type": "Long",
                                        "keyRaw": "clientId",
                                        "visible": true
                                    },

                                    "duties": {
                                        "type": "String",
                                        "keyRaw": "duties",
                                        "visible": true
                                    },

                                    "jobHours": {
                                        "type": "String",
                                        "keyRaw": "jobHours",
                                        "visible": true
                                    },

                                    "numberOfRoles": {
                                        "type": "Int",
                                        "keyRaw": "numberOfRoles",
                                        "visible": true
                                    },

                                    "paymentType": {
                                        "type": "PaymentType",
                                        "keyRaw": "paymentType",
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

                                    "salaryPerAnnum": {
                                        "type": "Decimal",
                                        "keyRaw": "salaryPerAnnum",
                                        "visible": true
                                    },

                                    "startDate": {
                                        "type": "DateTime",
                                        "keyRaw": "startDate",
                                        "visible": true
                                    },

                                    "updatedAt": {
                                        "type": "DateTime",
                                        "keyRaw": "updatedAt",
                                        "visible": true
                                    },

                                    "assignments": {
                                        "type": "JobAssignment",
                                        "keyRaw": "assignments",

                                        "selection": {
                                            "fields": {
                                                "status": {
                                                    "type": "AssignmentStatus",
                                                    "keyRaw": "status",
                                                    "visible": true
                                                },

                                                "candidate": {
                                                    "type": "Candidate",
                                                    "keyRaw": "candidate",

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

                                                            "email": {
                                                                "type": "String",
                                                                "keyRaw": "email",
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
                        },

                        "pageInfo": {
                            "type": "CollectionSegmentInfo",
                            "keyRaw": "pageInfo",

                            "selection": {
                                "fields": {
                                    "hasNextPage": {
                                        "type": "Boolean",
                                        "keyRaw": "hasNextPage",
                                        "visible": true
                                    },

                                    "hasPreviousPage": {
                                        "type": "Boolean",
                                        "keyRaw": "hasPreviousPage",
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
            "filter": "JobFilterInput",
            "skip": "Int",
            "take": "Int"
        },

        "types": {
            "DateTimeOperationFilterInput": {
                "eq": "DateTime",
                "gt": "DateTime",
                "gte": "DateTime",
                "in": "DateTime",
                "lt": "DateTime",
                "lte": "DateTime",
                "neq": "DateTime",
                "ngt": "DateTime",
                "ngte": "DateTime",
                "nin": "DateTime",
                "nlt": "DateTime",
                "nlte": "DateTime"
            },

            "StringOperationFilterInput": {
                "and": "StringOperationFilterInput",
                "contains": "String",
                "endsWith": "String",
                "eq": "String",
                "in": "String",
                "ncontains": "String",
                "nendsWith": "String",
                "neq": "String",
                "nin": "String",
                "nstartsWith": "String",
                "or": "StringOperationFilterInput",
                "startsWith": "String"
            },

            "LongOperationFilterInput": {
                "eq": "Long",
                "gt": "Long",
                "gte": "Long",
                "in": "Long",
                "lt": "Long",
                "lte": "Long",
                "neq": "Long",
                "ngt": "Long",
                "ngte": "Long",
                "nin": "Long",
                "nlt": "Long",
                "nlte": "Long"
            },

            "ListStringOperationFilterInput": {
                "all": "StringOperationFilterInput",
                "any": "Boolean",
                "none": "StringOperationFilterInput",
                "some": "StringOperationFilterInput"
            },

            "BooleanOperationFilterInput": {
                "eq": "Boolean",
                "neq": "Boolean"
            },

            "CandidateFilterInput": {
                "and": "CandidateFilterInput",
                "assignments": "ListFilterInputTypeOfJobAssignmentFilterInput",
                "createdAt": "DateTimeOperationFilterInput",
                "email": "StringOperationFilterInput",
                "experience": "StringOperationFilterInput",
                "id": "LongOperationFilterInput",
                "name": "StringOperationFilterInput",
                "or": "CandidateFilterInput",
                "phone": "StringOperationFilterInput",
                "skills": "ListStringOperationFilterInput",
                "updatedAt": "DateTimeOperationFilterInput",
                "verified": "BooleanOperationFilterInput"
            },

            "AssignmentStatusOperationFilterInput": {
                "eq": "AssignmentStatus",
                "in": "AssignmentStatus",
                "neq": "AssignmentStatus",
                "nin": "AssignmentStatus"
            },

            "JobAssignmentFilterInput": {
                "and": "JobAssignmentFilterInput",
                "assignedAt": "DateTimeOperationFilterInput",
                "candidate": "CandidateFilterInput",
                "candidateId": "LongOperationFilterInput",
                "id": "LongOperationFilterInput",
                "job": "JobFilterInput",
                "jobId": "LongOperationFilterInput",
                "or": "JobAssignmentFilterInput",
                "status": "AssignmentStatusOperationFilterInput"
            },

            "ListFilterInputTypeOfJobAssignmentFilterInput": {
                "all": "JobAssignmentFilterInput",
                "any": "Boolean",
                "none": "JobAssignmentFilterInput",
                "some": "JobAssignmentFilterInput"
            },

            "ListFilterInputTypeOfJobFilterInput": {
                "all": "JobFilterInput",
                "any": "Boolean",
                "none": "JobFilterInput",
                "some": "JobFilterInput"
            },

            "ClientFilterInput": {
                "and": "ClientFilterInput",
                "ceoFirstName": "StringOperationFilterInput",
                "ceoLastName": "StringOperationFilterInput",
                "companyAddress": "StringOperationFilterInput",
                "companyEmail": "StringOperationFilterInput",
                "companyLocation": "StringOperationFilterInput",
                "companyLogo": "StringOperationFilterInput",
                "companyName": "StringOperationFilterInput",
                "companyPhone": "StringOperationFilterInput",
                "createdAt": "DateTimeOperationFilterInput",
                "dateJoined": "DateTimeOperationFilterInput",
                "id": "LongOperationFilterInput",
                "jobTitle": "StringOperationFilterInput",
                "jobs": "ListFilterInputTypeOfJobFilterInput",
                "linkedIn": "StringOperationFilterInput",
                "locationCoordinates": "StringOperationFilterInput",
                "logoBase64": "StringOperationFilterInput",
                "logoMimeType": "StringOperationFilterInput",
                "or": "ClientFilterInput",
                "postalCode": "StringOperationFilterInput",
                "registrationNumber": "StringOperationFilterInput",
                "updatedAt": "DateTimeOperationFilterInput",
                "verificationStatus": "StringOperationFilterInput",
                "website": "StringOperationFilterInput"
            },

            "JobTypeOperationFilterInput": {
                "eq": "JobType",
                "in": "JobType",
                "neq": "JobType",
                "nin": "JobType"
            },

            "IntOperationFilterInput": {
                "eq": "Int",
                "gt": "Int",
                "gte": "Int",
                "in": "Int",
                "lt": "Int",
                "lte": "Int",
                "neq": "Int",
                "ngt": "Int",
                "ngte": "Int",
                "nin": "Int",
                "nlt": "Int",
                "nlte": "Int"
            },

            "PaymentTypeOperationFilterInput": {
                "eq": "PaymentType",
                "in": "PaymentType",
                "neq": "PaymentType",
                "nin": "PaymentType"
            },

            "DecimalOperationFilterInput": {
                "eq": "Decimal",
                "gt": "Decimal",
                "gte": "Decimal",
                "in": "Decimal",
                "lt": "Decimal",
                "lte": "Decimal",
                "neq": "Decimal",
                "ngt": "Decimal",
                "ngte": "Decimal",
                "nin": "Decimal",
                "nlt": "Decimal",
                "nlte": "Decimal"
            },

            "JobStatusOperationFilterInput": {
                "eq": "JobStatus",
                "in": "JobStatus",
                "neq": "JobStatus",
                "nin": "JobStatus"
            },

            "JobFilterInput": {
                "and": "JobFilterInput",
                "assignments": "ListFilterInputTypeOfJobAssignmentFilterInput",
                "client": "ClientFilterInput",
                "clientId": "LongOperationFilterInput",
                "createdAt": "DateTimeOperationFilterInput",
                "duties": "ListStringOperationFilterInput",
                "id": "LongOperationFilterInput",
                "jobHours": "StringOperationFilterInput",
                "jobType": "JobTypeOperationFilterInput",
                "location": "StringOperationFilterInput",
                "numberOfRoles": "IntOperationFilterInput",
                "or": "JobFilterInput",
                "paymentType": "PaymentTypeOperationFilterInput",
                "published": "BooleanOperationFilterInput",
                "requirements": "ListStringOperationFilterInput",
                "salaryPerAnnum": "DecimalOperationFilterInput",
                "startDate": "DateTimeOperationFilterInput",
                "status": "JobStatusOperationFilterInput",
                "title": "StringOperationFilterInput",
                "updatedAt": "DateTimeOperationFilterInput"
            }
        },

        "defaults": {},
        "runtimeScalars": {}
    },

    "policy": "NetworkOnly",
    "partial": false
};

"HoudiniHash=ab6151d90ad35c0edc827e12ae5af21355808564a620523bea0e77df9d44f978";