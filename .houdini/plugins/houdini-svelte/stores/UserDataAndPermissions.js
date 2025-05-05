import { QueryStore } from '../runtime/stores/query'
import artifact from '$houdini/artifacts/UserDataAndPermissions'
import { initClient } from '$houdini/plugins/houdini-svelte/runtime/client'

export class UserDataAndPermissionsStore extends QueryStore {
	constructor() {
		super({
			artifact,
			storeName: "UserDataAndPermissionsStore",
			variables: true,
		})
	}
}

export async function load_UserDataAndPermissions(params) {
  await initClient()

	const store = new UserDataAndPermissionsStore()

	await store.fetch(params)

	return {
		UserDataAndPermissions: store,
	}
}
