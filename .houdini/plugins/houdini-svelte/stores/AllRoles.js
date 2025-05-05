import { QueryStore } from '../runtime/stores/query'
import artifact from '$houdini/artifacts/AllRoles'
import { initClient } from '$houdini/plugins/houdini-svelte/runtime/client'

export class AllRolesStore extends QueryStore {
	constructor() {
		super({
			artifact,
			storeName: "AllRolesStore",
			variables: false,
		})
	}
}

export async function load_AllRoles(params) {
  await initClient()

	const store = new AllRolesStore()

	await store.fetch(params)

	return {
		AllRoles: store,
	}
}
