import { QueryStore } from '../runtime/stores/query'
import artifact from '$houdini/artifacts/GetClientJobs'
import { initClient } from '$houdini/plugins/houdini-svelte/runtime/client'

export class GetClientJobsStore extends QueryStore {
	constructor() {
		super({
			artifact,
			storeName: "GetClientJobsStore",
			variables: true,
		})
	}
}

export async function load_GetClientJobs(params) {
  await initClient()

	const store = new GetClientJobsStore()

	await store.fetch(params)

	return {
		GetClientJobs: store,
	}
}
