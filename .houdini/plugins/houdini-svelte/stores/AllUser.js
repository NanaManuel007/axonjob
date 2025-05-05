import { QueryStore } from '../runtime/stores/query'
import artifact from '$houdini/artifacts/AllUser'
import { initClient } from '$houdini/plugins/houdini-svelte/runtime/client'

export class AllUserStore extends QueryStore {
	constructor() {
		super({
			artifact,
			storeName: "AllUserStore",
			variables: false,
		})
	}
}

export async function load_AllUser(params) {
  await initClient()

	const store = new AllUserStore()

	await store.fetch(params)

	return {
		AllUser: store,
	}
}
