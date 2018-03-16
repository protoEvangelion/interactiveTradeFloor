import { IS_PRELOADING } from 'store/actions'

export default (state = true, action) => {
  if (action.type === IS_PRELOADING) {
    if (action.data) {
      return true
    }

    return false
  }

  return state
}
