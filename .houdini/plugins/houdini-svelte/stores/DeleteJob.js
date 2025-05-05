import artifact from '$houdini/artifacts/DeleteJob'
import { MutationStore } from '../runtime/stores/mutation'

export class DeleteJobStore extends MutationStore {
	constructor() {
		super({
			artifact,
		})
	}
}
