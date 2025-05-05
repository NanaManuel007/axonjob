import artifact from '$houdini/artifacts/DeleteClient'
import { MutationStore } from '../runtime/stores/mutation'

export class DeleteClientStore extends MutationStore {
	constructor() {
		super({
			artifact,
		})
	}
}
