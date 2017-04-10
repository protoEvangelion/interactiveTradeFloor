import { initialState } from './selectors'
import { CHECK_AUTH, SOCIAL_LOGIN_SUCCESS, SOCIAL_LOGOUT } from './actions'

export default (state = initialState, action) => {
  switch (action.type) {
    case CHECK_AUTH:
      return {
        ...state,
        authenticated: action.authenticated,
        user: action.user,
      }
    case SOCIAL_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        authenticated: action.authenticated,
      }
    case SOCIAL_LOGOUT:
      return {
        ...state,
        user: initialState.user,
        authenticated: false,
      }
    default:
      return state
  }
}
