import { SET_USER } from '../actions'

export default (state = null, action) => {
	if (action.type == SET_USER) {
		return action.data ? Object.assign({}, state, action.data) : null
	}
	return state
}
