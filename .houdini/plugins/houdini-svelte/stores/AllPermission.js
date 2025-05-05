import { QueryStore } from '../runtime/stores/query'
import artifact from '$houdini/artifacts/AllPermission'
import { initClient } from '$houdini/plugins/houdini-svelte/runtime/client'

export class AllPermissionStore extends QueryStore {
	constructor() {
		super({
			artifact,
			storeName: "AllPermissionStore",
			variables: false,
		})
	}
}

export async function load_AllPermission(params) {
  await initClient()

	const store = new AllPermissionStore()

	await store.fetch(params)

	return {
		AllPermission: store,
	}
}
