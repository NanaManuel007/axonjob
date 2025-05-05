import artifact from '$houdini/artifacts/UpdateClient'
import { MutationStore } from '../runtime/stores/mutation'

export class UpdateClientStore extends MutationStore {
	constructor() {
		super({
			artifact,
		})
	}
}
