import { SET_FILTER } from '../actions'

export default (state = 'none', action) => {
  if (action.type === SET_FILTER) {
    return action.name
  }
  return state
}
