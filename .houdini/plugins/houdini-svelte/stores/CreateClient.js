import artifact from '$houdini/artifacts/CreateClient'
import { MutationStore } from '../runtime/stores/mutation'

export class CreateClientStore extends MutationStore {
	constructor() {
		super({
			artifact,
		})
	}
}
