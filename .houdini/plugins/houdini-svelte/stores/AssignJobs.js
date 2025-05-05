import artifact from '$houdini/artifacts/AssignJobs'
import { MutationStore } from '../runtime/stores/mutation'

export class AssignJobsStore extends MutationStore {
	constructor() {
		super({
			artifact,
		})
	}
}
