import artifact from '$houdini/artifacts/UpdateRole'
import { MutationStore } from '../runtime/stores/mutation'

export class UpdateRoleStore extends MutationStore {
	constructor() {
		super({
			artifact,
		})
	}
}
