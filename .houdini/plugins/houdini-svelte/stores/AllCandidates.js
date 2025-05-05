import { QueryStore } from '../runtime/stores/query'
import artifact from '$houdini/artifacts/AllCandidates'
import { initClient } from '$houdini/plugins/houdini-svelte/runtime/client'

export class AllCandidatesStore extends QueryStore {
	constructor() {
		super({
			artifact,
			storeName: "AllCandidatesStore",
			variables: false,
		})
	}
}

export async function load_AllCandidates(params) {
  await initClient()

	const store = new AllCandidatesStore()

	await store.fetch(params)

	return {
		AllCandidates: store,
	}
}
