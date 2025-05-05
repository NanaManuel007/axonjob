import artifact from '$houdini/artifacts/AssignPermissionsToRole'
import { MutationStore } from '../runtime/stores/mutation'

export class AssignPermissionsToRoleStore extends MutationStore {
	constructor() {
		super({
			artifact,
		})
	}
}
