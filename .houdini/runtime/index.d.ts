import { AddRoleStore } from "../plugins/houdini-svelte/stores/AddRole";
import { AssignJobsStore } from "../plugins/houdini-svelte/stores/AssignJobs";
import { DeleteJobStore } from "../plugins/houdini-svelte/stores/DeleteJob";
import { AddNewUserStore } from "../plugins/houdini-svelte/stores/AddNewUser";
import { CreateJobStore } from "../plugins/houdini-svelte/stores/CreateJob";
import { AddUserStore } from "../plugins/houdini-svelte/stores/AddUser";
import { AssignPermissionsToRoleStore } from "../plugins/houdini-svelte/stores/AssignPermissionsToRole";
import { CreateClientStore } from "../plugins/houdini-svelte/stores/CreateClient";
import { DeleteClientStore } from "../plugins/houdini-svelte/stores/DeleteClient";
import { DeleteAssignmentStore } from "../plugins/houdini-svelte/stores/DeleteAssignment";
import { UpdateJobStore } from "../plugins/houdini-svelte/stores/UpdateJob";
import { UpdateClientStore } from "../plugins/houdini-svelte/stores/UpdateClient";
import { DeleteRoleStore } from "../plugins/houdini-svelte/stores/DeleteRole";
import { UpdateRoleStore } from "../plugins/houdini-svelte/stores/UpdateRole";
import { DeleteUserStore } from "../plugins/houdini-svelte/stores/DeleteUser";
import { UpdateUserStore } from "../plugins/houdini-svelte/stores/UpdateUser";
import { AllUserStore } from "../plugins/houdini-svelte/stores/AllUser";
import { VerifyClientStore } from "../plugins/houdini-svelte/stores/VerifyClient";
import { AllJobsStore } from "../plugins/houdini-svelte/stores/AllJobs";
import { AllPermissionStore } from "../plugins/houdini-svelte/stores/AllPermission";
import { AllCandidatesStore } from "../plugins/houdini-svelte/stores/AllCandidates";
import { AllRolesStore } from "../plugins/houdini-svelte/stores/AllRoles";
import { GetCandidatesStore } from "../plugins/houdini-svelte/stores/GetCandidates";
import { GetClientsStore } from "../plugins/houdini-svelte/stores/GetClients";
import { GetClientJobsStore } from "../plugins/houdini-svelte/stores/GetClientJobs";
import { GetRolePermissionsStore } from "../plugins/houdini-svelte/stores/GetRolePermissions";
import { UserDataAndPermissionsStore } from "../plugins/houdini-svelte/stores/UserDataAndPermissions";
import { LoginStore } from "../plugins/houdini-svelte/stores/Login";
import type { Cache as InternalCache } from "./cache/cache";
import type { CacheTypeDef } from "./generated";
import { Cache } from "./public";
export * from "./client";
export * from "./lib";

export function graphql(
    str: "mutation AddRole($input: CreateRoleInput!) {\n  createRole(input: $input) {\n    code\n    message\n    success\n    result {\n      id\n      name\n      description\n      permissions\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n}"
): AddRoleStore;

export function graphql(
    str: "\nmutation AssignJobs($input: AssignJobInput!)\n {\n  \n  assignJob(input: $input) {\n    success\n    message\n    code\n  }\n}"
): AssignJobsStore;

export function graphql(
    str: "mutation DeleteJob($id: Long!) {\n  deleteJob(input: { id: $id }) {\n    code\n    message\n    success\n  }\n}"
): DeleteJobStore;

export function graphql(
    str: "mutation AddNewUser($input: CreateUserInput!) {\n  createUser(input: $input) {\n    code\n    message\n    success\n  }\n}"
): AddNewUserStore;

export function graphql(
    str: "mutation CreateJob($input: CreateJobInput!) {\n    createJob(input: $input) {\n        success\n        message\n        code\n        result {\n            id\n            title\n            jobType\n            paymentType\n            salaryPerAnnum\n            jobHours\n            location\n            startDate\n            numberOfRoles\n            duties\n            requirements\n            published\n            clientId\n        }\n    }\n}"
): CreateJobStore;

export function graphql(
    str: "mutation AddUser($input: CreateUserInput!) {\n  createUser(input: $input) {\n    code\n    message\n    success\n    result {\n      createdAt\n      email\n      id\n      roleId\n      roleName\n      updatedAt\n    }\n  }\n}"
): AddUserStore;

export function graphql(
    str: "mutation AssignPermissionsToRole($input: AssignPermissionsInput!) {\n  assignPermissions(input: $input) {\n    code\n    message\n    success\n  }\n}"
): AssignPermissionsToRoleStore;

export function graphql(
    str: "mutation CreateClient($input: CreateClientRequestInput!) {\n  createClient(input: { input: $input }) {\n    code\n    message\n    success\n    result {\n      id\n      companyName\n      companyEmail\n      companyPhone\n      companyAddress\n      companyLocation\n      companyLogo\n      ceoFirstName\n      ceoLastName\n      jobTitle\n      postalCode\n      registrationNumber\n      website\n      linkedIn\n      locationCoordinates\n    }\n  }\n}"
): CreateClientStore;

export function graphql(
    str: "mutation DeleteClient($input: DeleteClientInput!) {\n    deleteClient(input: $input) {\n        success\n        message\n        code\n    }\n}"
): DeleteClientStore;

export function graphql(
    str: "mutation DeleteAssignment($input: DeleteAssignmentInput!) {\n  deleteAssignment(input: $input) {\n    code\n    message\n    success\n  }\n}"
): DeleteAssignmentStore;

export function graphql(
    str: "mutation UpdateJob($input: UpdateJobInput!) {\n  updateJob(input:$input) {\n    code\n    message\n    success\n  }\n}"
): UpdateJobStore;

export function graphql(
    str: "mutation UpdateClient($input: UpdateClientInput!) \n{\n  updateClient(input: $input) {\n    success\n    message\n    result {\n      id\n      companyName\n      ceoFirstName\n      ceoLastName\n      jobTitle\n      companyEmail\n      companyPhone\n      companyAddress\n      postalCode\n      registrationNumber\n      website\n      companyLocation\n      verificationStatus\n      dateJoined\n    }\n  }\n}"
): UpdateClientStore;

export function graphql(
    str: "mutation DeleteRole($input: DeleteRoleInput!) {\n  deleteRole(input: $input) {\n    code\n    message\n    success\n  }\n}"
): DeleteRoleStore;

export function graphql(
    str: "mutation UpdateRole($input: CreateRoleRequestInput!, $id: Long!) {\n  updateRole(\n    input: { id: $id, input: $input }\n  ) {\n    code\n    message\n    success\n  }\n}"
): UpdateRoleStore;

export function graphql(
    str: "mutation DeleteUser($input: DeleteUserInput!) {\n  deleteUser(input: $input) {\n    code\n    message\n    success\n  }\n}"
): DeleteUserStore;

export function graphql(
    str: "mutation UpdateUser($id: Long!, $input: UpdateUserRequestInput!) {\n  updateUser(input: { \n    id: $id, \n    input: $input \n  }) {\n    code\n    message\n    success\n    result {\n      createdAt\n      email\n      id\n      roleId\n      roleName\n      updatedAt\n    }\n  }\n}"
): UpdateUserStore;

export function graphql(
    str: "query AllUser {\n  users(skip: null, take: null, where: null, order: null) {\n    items {\n      createdAt\n      email\n      id\n      password\n      roleId\n      updatedAt\n      role {\n        createdAt\n        description\n        id\n        isActive\n        name\n        updatedAt\n        rolePermissions {\n          permissionName\n          roleId\n        }\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n    totalCount\n  }\n}"
): AllUserStore;

export function graphql(
    str: "mutation VerifyClient($input: ClientVStatusInput!) {\n  clientVStatus(input: $input) {\n    code\n    message\n    success\n  }\n}"
): VerifyClientStore;

export function graphql(
    str: "query AllJobs {\n  jobs(skip: null, take: null, where: null, order: null) {\n    totalCount\n    items {\n      clientId\n      createdAt\n      duties\n      id\n      jobHours\n      jobType\n      location\n      numberOfRoles\n      paymentType\n      published\n      requirements\n      salaryPerAnnum\n      startDate\n      status\n      title\n      updatedAt\n      assignments {\n        assignedAt\n        candidateId\n        jobId\n        status\n      }\n      client {\n        ceoFirstName\n        ceoLastName\n        companyAddress\n        companyEmail\n        companyLocation\n        companyLogo\n        companyName\n        companyPhone\n        createdAt\n        dateJoined\n        id\n        jobTitle\n        linkedIn\n        locationCoordinates\n        postalCode\n        registrationNumber\n        updatedAt\n        verificationStatus\n        website\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n  }\n}"
): AllJobsStore;

export function graphql(
    str: "query AllPermission {\n  permissions {\n    totalCount\n    items {\n      description\n      name\n    }\n  }\n}"
): AllPermissionStore;

export function graphql(
    str: "query AllCandidates {\n  candidates(skip: null, take: null, where: null, order: null) {\n    totalCount\n    items {\n      createdAt\n      email\n      experience\n      id\n      name\n      phone\n      skills\n      updatedAt\n      verified\n      assignments {\n        assignedAt\n        candidateId\n        jobId\n        status\n        job {\n          clientId\n          createdAt\n          duties\n          id\n          jobHours\n          jobType\n          location\n          numberOfRoles\n          paymentType\n          published\n          requirements\n          salaryPerAnnum\n          startDate\n          status\n          title\n          updatedAt\n        }\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n  }\n}"
): AllCandidatesStore;

export function graphql(
    str: "query AllRoles {\n  roles {\n    totalCount\n    items {\n      createdAt\n      description\n      id\n      isActive\n      name\n      updatedAt\n      rolePermissions {\n        permissionName\n        roleId\n        permission {\n          description\n          name\n        }\n      }\n    }\n  }\n}"
): AllRolesStore;

export function graphql(
    str: " query GetCandidates {\n  \n  candidates {\n    totalCount\n    items {\n      id\n      name\n      phone\n      skills\n      experience\n      verified\n      email\n    }\n  }\n}"
): GetCandidatesStore;

export function graphql(
    str: "query GetClients {\n  clients(skip: null, take: null, where: null, order: null) {\n    items {\n      ceoFirstName\n      ceoLastName\n      companyAddress\n      companyEmail\n      companyLocation\n      companyLogo\n      logoBase64\n      companyName\n      companyPhone\n      createdAt\n      dateJoined\n      id\n      jobTitle\n      linkedIn\n      locationCoordinates\n      postalCode\n      logoMimeType\n      registrationNumber\n      updatedAt\n      verificationStatus\n      website\n      jobs {\n        clientId\n        createdAt\n        duties\n        id\n        jobHours\n        jobType\n        location\n        numberOfRoles\n        paymentType\n        published\n        requirements\n        salaryPerAnnum\n        startDate\n        status\n        title\n        updatedAt\n        assignments {\n          assignedAt\n          candidateId\n          jobId\n          status\n          candidate {\n            createdAt\n            email\n            experience\n            id\n            name\n            phone\n            skills\n            updatedAt\n            verified\n          }\n          job {\n            clientId\n            createdAt\n            duties\n            id\n            status\n            location\n            jobType\n            jobHours\n            requirements\n          }\n        }\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n    }\n    totalCount\n  }\n}"
): GetClientsStore;

export function graphql(
    str: "query GetClientJobs($filter: JobFilterInput!,$skip: Int!,$take:Int!)\n@cache(policy: NetworkOnly)\n {\n    jobs(where: $filter, take: $take, skip: $skip, order: [ {\n       id: DESC\n    }]) {\n        totalCount\n        items {\n            id\n            title\n            location\n            jobType\n            status\n            createdAt\n            clientId\n            duties\n            jobHours\n            numberOfRoles\n            paymentType\n            requirements\n            published\n            salaryPerAnnum\n            startDate\n            updatedAt\n            assignments {\n                status\n                candidate {\n                    id\n                    name\n                    email\n                }\n            }\n        }\n        pageInfo {\n            hasNextPage\n            hasPreviousPage\n        }\n    }\n}"
): GetClientJobsStore;

export function graphql(
    str: "query GetRolePermissions($roleId: Long!) {\n  roles(where: { id: { eq: $roleId } }) {\n    items {\n      id\n      name\n      rolePermissions {\n        permissionName\n        permission {\n          description\n        }\n      }\n    }\n  }\n}"
): GetRolePermissionsStore;

export function graphql(
    str: "query UserDataAndPermissions($userId: Long!) {\n  users(where: { id: { eq: $userId } }) {\n    items {\n      role {\n        createdAt\n        description\n        isActive\n        id\n        name\n        rolePermissions {\n          permissionName\n          roleId\n        }\n      }\n      createdAt\n      email\n      id\n    }\n  }\n}"
): UserDataAndPermissionsStore;

export function graphql(
    str: "\n        mutation Login($input: LoginInput!) {\n            login(input: $input) {\n                code\n                success\n                message\n                result {\n                    email\n                    token\n                    userId\n                    role\n                    permissions\n                }\n            }\n        }\n    "
): LoginStore;

export declare function graphql<_Payload, _Result = _Payload>(str: TemplateStringsArray): _Result;
export declare const cache: Cache<CacheTypeDef>;
export declare function getCache(): InternalCache;