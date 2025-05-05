import artifact from '$houdini/artifacts/VerifyClient'
import { MutationStore } from '../runtime/stores/mutation'

export class VerifyClientStore extends MutationStore {
	constructor() {
		super({
			artifact,
		})
	}
}
