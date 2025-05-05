import artifact from '$houdini/artifacts/DeleteAssignment'
import { MutationStore } from '../runtime/stores/mutation'

export class DeleteAssignmentStore extends MutationStore {
	constructor() {
		super({
			artifact,
		})
	}
}
