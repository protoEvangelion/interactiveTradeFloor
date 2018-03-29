import { SET_FILTER } from '../actions'

export default (state = 'None', action) => {
	if (action.type === SET_FILTER) {
		return action.name
	}
	return state
}
