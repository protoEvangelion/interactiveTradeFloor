import { LOAD_BOOTHS } from 'store/actions'

export default (state = null, action) => {
	if (action.type === LOAD_BOOTHS) {
		return action.data
	}
	return state
}
