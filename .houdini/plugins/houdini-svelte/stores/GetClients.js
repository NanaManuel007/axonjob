import { QueryStore } from '../runtime/stores/query'
import artifact from '$houdini/artifacts/GetClients'
import { initClient } from '$houdini/plugins/houdini-svelte/runtime/client'

export class GetClientsStore extends QueryStore {
	constructor() {
		super({
			artifact,
			storeName: "GetClientsStore",
			variables: false,
		})
	}
}

export async function load_GetClients(params) {
  await initClient()

	const store = new GetClientsStore()

	await store.fetch(params)

	return {
		GetClients: store,
	}
}
