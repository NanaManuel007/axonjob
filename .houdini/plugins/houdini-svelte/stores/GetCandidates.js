import { QueryStore } from '../runtime/stores/query'
import artifact from '$houdini/artifacts/GetCandidates'
import { initClient } from '$houdini/plugins/houdini-svelte/runtime/client'

export class GetCandidatesStore extends QueryStore {
	constructor() {
		super({
			artifact,
			storeName: "GetCandidatesStore",
			variables: false,
		})
	}
}

export async function load_GetCandidates(params) {
  await initClient()

	const store = new GetCandidatesStore()

	await store.fetch(params)

	return {
		GetCandidates: store,
	}
}
