import type { DataSource } from '$houdini/runtime'

export type Result<DataType> = {
	isFetching: boolean
	partial: boolean
	source?: DataSource | null
	data?: DataType | null
	error?: Error | null
}
export * from './AddNewUser'
export * from './AddRole'
export * from './AddUser'
export * from './AllCandidates'
export * from './AllJobs'
export * from './AllPermission'
export * from './AllRoles'
export * from './AllUser'
export * from './AssignJobs'
export * from './AssignPermissionsToRole'
export * from './CreateClient'
export * from './CreateJob'
export * from './DeleteAssignment'
export * from './DeleteClient'
export * from './DeleteJob'
export * from './DeleteRole'
export * from './DeleteUser'
export * from './GetCandidates'
export * from './GetClientJobs'
export * from './GetClients'
export * from './GetRolePermissions'
export * from './Login'
export * from './UpdateClient'
export * from './UpdateJob'
export * from './UpdateRole'
export * from './UpdateUser'
export * from './UserDataAndPermissions'
export * from './VerifyClient'