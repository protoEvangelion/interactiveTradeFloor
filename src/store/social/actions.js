export const CHECK_AUTH = 'CHECK_AUTH'
export const SOCIAL_LOGIN = 'SOCIAL_LOGIN'
export const SOCIAL_LOGIN_PREPARE = 'SOCIAL_LOGIN_PREPARE'
export const SOCIAL_LOGIN_REQUEST = 'SOCIAL_LOGIN_REQUEST'
export const SOCIAL_LOGIN_SUCCESS = 'SOCIAL_LOGIN_SUCCESS'
export const SOCIAL_LOGIN_FAILURE = 'SOCIAL_LOGIN_FAILURE'
export const SOCIAL_LOGOUT = 'SOCIAL_LOGOUT'

export const socialLoginPrepare = (service, options) => ({
  type: SOCIAL_LOGIN_PREPARE,
  service,
  options,
})

export const socialLoginRequest = (service, options) => ({
  type: SOCIAL_LOGIN_REQUEST,
  service,
  options,
})

export function storageAvailable(type) {
  try {
    const storage = window[type]
    const x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return false
  }
}

export const checkAuth = () => {
  let authenticated
  if (storageAvailable('localStorage')) {
    if (window.localStorage.getItem('authorized') === 'true') {
      console.log('authththththth')
      authenticated = true
    } else {
      console.log('first return auth')
      authenticated = false
    }
  } else {
    console.log('2nd return auth')
    authenticated = false
  }

  return {
    type: CHECK_AUTH,
    authenticated,
  }
}

export const socialLoginSuccess = user => {
  let authenticated
  const email = user.email
  if (email === process.env.EMAIL1 || email === process.env.EMAIL2 || email === process.env.EMAIL3) {
    authenticated = true
    if (storageAvailable('localStorage')) {
      window.localStorage.setItem('authorized', 'true')
    } else {
      console.log('Local storage is not available')
    }
  } else {
    authenticated = false
  }
  return {
    type: SOCIAL_LOGIN_SUCCESS,
    user,
    authenticated,
  }
}


export const socialLoginFailure = error => ({
  type: SOCIAL_LOGIN_FAILURE,
  error,
})

export const socialLogout = () => ({ type: SOCIAL_LOGOUT })
