import { SHOW_FORM_SPINNER } from '../actions'

export default (state = false, action) => {
	if (action.type === SHOW_FORM_SPINNER) {
		return action.value
	}
	return state
}
