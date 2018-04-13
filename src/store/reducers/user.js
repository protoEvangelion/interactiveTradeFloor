import { SET_USER } from '../actions'

export default (state = null, action) => {
	if (action.type == SET_USER) {
		return Object.assign({}, state, action.data)
	}
	return state
}
