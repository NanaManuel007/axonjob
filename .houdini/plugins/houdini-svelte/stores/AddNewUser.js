import artifact from '$houdini/artifacts/AddNewUser'
import { MutationStore } from '../runtime/stores/mutation'

export class AddNewUserStore extends MutationStore {
	constructor() {
		super({
			artifact,
		})
	}
}
