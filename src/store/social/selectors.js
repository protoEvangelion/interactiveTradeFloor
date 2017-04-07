import { storageAvailable } from './actions'

const checkAuth = () => {
  if (storageAvailable('localStorage')) {
    if (window.localStorage.getItem('authorized') === 'true') {
      console.log('authththththth')
      return true
    }
    console.log('first return auth')
    return false
  }
  console.log('2nd return auth')
  return false
}


export const initialState = {
  user: null,
  authenticated: checkAuth(),
}

export const getUser = (state = initialState) => state.user
