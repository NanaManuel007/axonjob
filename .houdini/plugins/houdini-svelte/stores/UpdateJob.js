import artifact from '$houdini/artifacts/UpdateJob'
import { MutationStore } from '../runtime/stores/mutation'

export class UpdateJobStore extends MutationStore {
	constructor() {
		super({
			artifact,
		})
	}
}
