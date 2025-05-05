import artifact from '$houdini/artifacts/DeleteUser'
import { MutationStore } from '../runtime/stores/mutation'

export class DeleteUserStore extends MutationStore {
	constructor() {
		super({
			artifact,
		})
	}
}
