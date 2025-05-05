export default {
    "name": "AllJobs",
    "kind": "HoudiniQuery",
    "hash": "9c9816305014e9f6a127d2f19c62284aee2d33ff6b88f34836d90c247dde1221",

    "raw": `query AllJobs {
  jobs(skip: null, take: null, where: null, order: null) {
    totalCount
    items {
      clientId
      createdAt
      duties
      id
      jobHours
      jobType
      location
      numberOfRoles
      paymentType
      published
      requirements
      salaryPerAnnum
      startDate
      status
      title
      updatedAt
      assignments {
        assignedAt
        candidateId
        jobId
        status
        id
      }
      client {
        ceoFirstName
        ceoLastName
        companyAddress
        companyEmail
        companyLocation
        companyLogo
        companyName
        companyPhone
        createdAt
        dateJoined
        id
        jobTitle
        linkedIn
        locationCoordinates
        postalCode
        registrationNumber
        updatedAt
        verificationStatus
        website
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
                "keyRaw": "jobs(order: null, skip: null, take: null, where: null)",
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
                                    "clientId": {
                                        "type": "Long",
                                        "keyRaw": "clientId",
                                        "visible": true
                                    },

                                    "createdAt": {
                                        "type": "DateTime",
                                        "keyRaw": "createdAt",
                                        "visible": true
                                    },

                                    "duties": {
                                        "type": "String",
                                        "keyRaw": "duties",
                                        "visible": true
                                    },

                                    "id": {
                                        "type": "Long",
                                        "keyRaw": "id",
                                        "visible": true
                                    },

                                    "jobHours": {
                                        "type": "String",
                                        "keyRaw": "jobHours",
                                        "visible": true
                                    },

                                    "jobType": {
                                        "type": "JobType",
                                        "keyRaw": "jobType",
                                        "visible": true
                                    },

                                    "location": {
                                        "type": "String",
                                        "keyRaw": "location",
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

                                    "published": {
                                        "type": "Boolean",
                                        "keyRaw": "published",
                                        "visible": true
                                    },

                                    "requirements": {
                                        "type": "String",
                                        "keyRaw": "requirements",
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

                                    "status": {
                                        "type": "JobStatus",
                                        "keyRaw": "status",
                                        "visible": true
                                    },

                                    "title": {
                                        "type": "String",
                                        "keyRaw": "title",
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
                                                "assignedAt": {
                                                    "type": "DateTime",
                                                    "keyRaw": "assignedAt",
                                                    "visible": true
                                                },

                                                "candidateId": {
                                                    "type": "Long",
                                                    "keyRaw": "candidateId",
                                                    "visible": true
                                                },

                                                "jobId": {
                                                    "type": "Long",
                                                    "keyRaw": "jobId",
                                                    "visible": true
                                                },

                                                "status": {
                                                    "type": "AssignmentStatus",
                                                    "keyRaw": "status",
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
                                    },

                                    "client": {
                                        "type": "Client",
                                        "keyRaw": "client",

                                        "selection": {
                                            "fields": {
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

                                                "companyAddress": {
                                                    "type": "String",
                                                    "keyRaw": "companyAddress",
                                                    "visible": true
                                                },

                                                "companyEmail": {
                                                    "type": "String",
                                                    "keyRaw": "companyEmail",
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

                                                "companyName": {
                                                    "type": "String",
                                                    "keyRaw": "companyName",
                                                    "visible": true
                                                },

                                                "companyPhone": {
                                                    "type": "String",
                                                    "keyRaw": "companyPhone",
                                                    "visible": true
                                                },

                                                "createdAt": {
                                                    "type": "DateTime",
                                                    "keyRaw": "createdAt",
                                                    "visible": true
                                                },

                                                "dateJoined": {
                                                    "type": "DateTime",
                                                    "keyRaw": "dateJoined",
                                                    "visible": true
                                                },

                                                "id": {
                                                    "type": "Long",
                                                    "keyRaw": "id",
                                                    "visible": true
                                                },

                                                "jobTitle": {
                                                    "type": "String",
                                                    "keyRaw": "jobTitle",
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

                                                "updatedAt": {
                                                    "type": "DateTime",
                                                    "keyRaw": "updatedAt",
                                                    "visible": true
                                                },

                                                "verificationStatus": {
                                                    "type": "String",
                                                    "keyRaw": "verificationStatus",
                                                    "visible": true
                                                },

                                                "website": {
                                                    "type": "String",
                                                    "keyRaw": "website",
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

    "policy": "NetworkOnly",
    "partial": false
};

"HoudiniHash=e6d2a72d342aa79d96befb7574ae46ae5d7ba74c85776b4fab71d9437d7cf474";