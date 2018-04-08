import { TOGGLE_GRID } from '../actions'

export default (state = false, action) => {
	if (action.type === TOGGLE_GRID) {
		return !state
	}
	return state
}
