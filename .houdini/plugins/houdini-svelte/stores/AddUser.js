import artifact from '$houdini/artifacts/AddUser'
import { MutationStore } from '../runtime/stores/mutation'

export class AddUserStore extends MutationStore {
	constructor() {
		super({
			artifact,
		})
	}
}
