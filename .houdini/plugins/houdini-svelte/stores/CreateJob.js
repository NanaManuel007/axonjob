import artifact from '$houdini/artifacts/CreateJob'
import { MutationStore } from '../runtime/stores/mutation'

export class CreateJobStore extends MutationStore {
	constructor() {
		super({
			artifact,
		})
	}
}
