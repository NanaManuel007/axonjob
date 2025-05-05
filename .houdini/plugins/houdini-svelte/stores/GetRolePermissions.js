import { QueryStore } from '../runtime/stores/query'
import artifact from '$houdini/artifacts/GetRolePermissions'
import { initClient } from '$houdini/plugins/houdini-svelte/runtime/client'

export class GetRolePermissionsStore extends QueryStore {
	constructor() {
		super({
			artifact,
			storeName: "GetRolePermissionsStore",
			variables: true,
		})
	}
}

export async function load_GetRolePermissions(params) {
  await initClient()

	const store = new GetRolePermissionsStore()

	await store.fetch(params)

	return {
		GetRolePermissions: store,
	}
}
