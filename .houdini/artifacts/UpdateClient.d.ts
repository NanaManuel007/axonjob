export type UpdateClient = {
    readonly "input": UpdateClient$input;
    readonly "result": UpdateClient$result;
};

export type UpdateClient$result = {
    readonly updateClient: {
        readonly success: boolean;
        readonly message: string | null;
        readonly result: {
            readonly id: number;
            readonly companyName: string;
            readonly ceoFirstName: string;
            readonly ceoLastName: string;
            readonly jobTitle: string | null;
            readonly companyEmail: string;
            readonly companyPhone: string;
            readonly companyAddress: string;
            readonly postalCode: string;
            readonly registrationNumber: string;
            readonly website: string | null;
            readonly companyLocation: string;
            readonly verificationStatus: string;
            readonly dateJoined: Date;
        } | null;
    } | null;
};

type UpdateClientRequestInput = {
    ceoFirstName?: string | null | undefined;
    ceoLastName?: string | null | undefined;
    companyAddress?: string | null | undefined;
    companyEmail?: string | null | undefined;
    companyLocation?: string | null | undefined;
    companyLogo?: string | null | undefined;
    companyName?: string | null | undefined;
    companyPhone?: string | null | undefined;
    jobTitle?: string | null | undefined;
    linkedIn?: string | null | undefined;
    locationCoordinates?: string | null | undefined;
    logoImg?: any | null | undefined;
    postalCode?: string | null | undefined;
    registrationNumber?: string | null | undefined;
    website?: string | null | undefined;
};

type UpdateClientInput = {
    id: number;
    input: UpdateClientRequestInput;
};

export type UpdateClient$input = {
    input: UpdateClientInput;
};

export type UpdateClient$optimistic = {
    readonly updateClient?: {
        readonly success?: boolean;
        readonly message?: string | null;
        readonly result?: {
            readonly id?: number;
            readonly companyName?: string;
            readonly ceoFirstName?: string;
            readonly ceoLastName?: string;
            readonly jobTitle?: string | null;
            readonly companyEmail?: string;
            readonly companyPhone?: string;
            readonly companyAddress?: string;
            readonly postalCode?: string;
            readonly registrationNumber?: string;
            readonly website?: string | null;
            readonly companyLocation?: string;
            readonly verificationStatus?: string;
            readonly dateJoined?: Date;
        } | null;
    } | null;
};

export type UpdateClient$artifact = {
    "name": "UpdateClient";
    "kind": "HoudiniMutation";
    "hash": "2f382acf08d78ffe6eb395bf1e2bb02c85199d7ede16682aaeea58c13c3951b8";
    "raw": `mutation UpdateClient($input: UpdateClientInput!) {
  updateClient(input: $input) {
    success
    message
    result {
      id
      companyName
      ceoFirstName
      ceoLastName
      jobTitle
      companyEmail
      companyPhone
      companyAddress
      postalCode
      registrationNumber
      website
      companyLocation
      verificationStatus
      dateJoined
    }
  }
}
`;
    "rootType": "Mutation";
    "stripVariables": [];
    "selection": {
        "fields": {
            "updateClient": {
                "type": "CallResultOfClientResponse";
                "keyRaw": "updateClient(input: $input)";
                "nullable": true;
                "selection": {
                    "fields": {
                        "success": {
                            "type": "Boolean";
                            "keyRaw": "success";
                            "visible": true;
                        };
                        "message": {
                            "type": "String";
                            "keyRaw": "message";
                            "nullable": true;
                            "visible": true;
                        };
                        "result": {
                            "type": "ClientResponse";
                            "keyRaw": "result";
                            "nullable": true;
                            "selection": {
                                "fields": {
                                    "id": {
                                        "type": "Long";
                                        "keyRaw": "id";
                                        "visible": true;
                                    };
                                    "companyName": {
                                        "type": "String";
                                        "keyRaw": "companyName";
                                        "visible": true;
                                    };
                                    "ceoFirstName": {
                                        "type": "String";
                                        "keyRaw": "ceoFirstName";
                                        "visible": true;
                                    };
                                    "ceoLastName": {
                                        "type": "String";
                                        "keyRaw": "ceoLastName";
                                        "visible": true;
                                    };
                                    "jobTitle": {
                                        "type": "String";
                                        "keyRaw": "jobTitle";
                                        "nullable": true;
                                        "visible": true;
                                    };
                                    "companyEmail": {
                                        "type": "String";
                                        "keyRaw": "companyEmail";
                                        "visible": true;
                                    };
                                    "companyPhone": {
                                        "type": "String";
                                        "keyRaw": "companyPhone";
                                        "visible": true;
                                    };
                                    "companyAddress": {
                                        "type": "String";
                                        "keyRaw": "companyAddress";
                                        "visible": true;
                                    };
                                    "postalCode": {
                                        "type": "String";
                                        "keyRaw": "postalCode";
                                        "visible": true;
                                    };
                                    "registrationNumber": {
                                        "type": "String";
                                        "keyRaw": "registrationNumber";
                                        "visible": true;
                                    };
                                    "website": {
                                        "type": "String";
                                        "keyRaw": "website";
                                        "nullable": true;
                                        "visible": true;
                                    };
                                    "companyLocation": {
                                        "type": "String";
                                        "keyRaw": "companyLocation";
                                        "visible": true;
                                    };
                                    "verificationStatus": {
                                        "type": "String";
                                        "keyRaw": "verificationStatus";
                                        "visible": true;
                                    };
                                    "dateJoined": {
                                        "type": "DateTime";
                                        "keyRaw": "dateJoined";
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
            "input": "UpdateClientInput";
        };
        "types": {
            "UpdateClientRequestInput": {
                "ceoFirstName": "String";
                "ceoLastName": "String";
                "companyAddress": "String";
                "companyEmail": "String";
                "companyLocation": "String";
                "companyLogo": "String";
                "companyName": "String";
                "companyPhone": "String";
                "jobTitle": "String";
                "linkedIn": "String";
                "locationCoordinates": "String";
                "logoImg": "Upload";
                "postalCode": "String";
                "registrationNumber": "String";
                "website": "String";
            };
            "UpdateClientInput": {
                "id": "Long";
                "input": "UpdateClientRequestInput";
            };
        };
        "defaults": {};
        "runtimeScalars": {};
    };
};