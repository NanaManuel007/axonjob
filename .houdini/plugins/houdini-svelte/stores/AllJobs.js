import { QueryStore } from '../runtime/stores/query'
import artifact from '$houdini/artifacts/AllJobs'
import { initClient } from '$houdini/plugins/houdini-svelte/runtime/client'

export class AllJobsStore extends QueryStore {
	constructor() {
		super({
			artifact,
			storeName: "AllJobsStore",
			variables: false,
		})
	}
}

export async function load_AllJobs(params) {
  await initClient()

	const store = new AllJobsStore()

	await store.fetch(params)

	return {
		AllJobs: store,
	}
}
