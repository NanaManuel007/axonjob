export default {
    "name": "Login",
    "kind": "HoudiniMutation",
    "hash": "349f388b1dac850d4d5caeb39bc92b196bd701e1860a545d9f2ac54ffd1ca161",

    "raw": `mutation Login($input: LoginInput!) {
  login(input: $input) {
    code
    success
    message
    result {
      email
      token
      userId
      role
      permissions
    }
  }
}
`,

    "rootType": "Mutation",
    "stripVariables": [],

    "selection": {
        "fields": {
            "login": {
                "type": "CallResultOfLoginResponse",
                "keyRaw": "login(input: $input)",
                "nullable": true,

                "selection": {
                    "fields": {
                        "code": {
                            "type": "Int",
                            "keyRaw": "code",
                            "visible": true
                        },

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

                        "result": {
                            "type": "LoginResponse",
                            "keyRaw": "result",
                            "nullable": true,

                            "selection": {
                                "fields": {
                                    "email": {
                                        "type": "String",
                                        "keyRaw": "email",
                                        "visible": true
                                    },

                                    "token": {
                                        "type": "String",
                                        "keyRaw": "token",
                                        "visible": true
                                    },

                                    "userId": {
                                        "type": "Long",
                                        "keyRaw": "userId",
                                        "visible": true
                                    },

                                    "role": {
                                        "type": "String",
                                        "keyRaw": "role",
                                        "visible": true
                                    },

                                    "permissions": {
                                        "type": "String",
                                        "keyRaw": "permissions",
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
            "input": "LoginInput"
        },

        "types": {
            "LoginRequestInput": {
                "email": "String",
                "password": "String"
            },

            "LoginInput": {
                "input": "LoginRequestInput"
            }
        },

        "defaults": {},
        "runtimeScalars": {}
    }
};

"HoudiniHash=20197553d5120a7ca559abd8a6fc4c6d98060e357ba9d1ca9dc8e96008b0fa1d";