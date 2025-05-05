import artifact from '$houdini/artifacts/AddRole'
import { MutationStore } from '../runtime/stores/mutation'

export class AddRoleStore extends MutationStore {
	constructor() {
		super({
			artifact,
		})
	}
}
