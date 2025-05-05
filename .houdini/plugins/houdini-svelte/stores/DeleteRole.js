import artifact from '$houdini/artifacts/DeleteRole'
import { MutationStore } from '../runtime/stores/mutation'

export class DeleteRoleStore extends MutationStore {
	constructor() {
		super({
			artifact,
		})
	}
}
