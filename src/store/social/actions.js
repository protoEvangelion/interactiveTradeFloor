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

/* istanbul ignore next */
export function storageAvailable(type) {
  /* istanbul ignore next */
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
  let picture = ''
  let email = ''
  /* istanbul ignore next */
  if (storageAvailable('localStorage')) {
    if (window.localStorage.getItem('authorized') === 'true') {
      authenticated = true
      picture = window.localStorage.getItem('picture')
      email = window.localStorage.getItem('email')
    } else {
      authenticated = false
    }
  } else {
    authenticated = false
  }

  return {
    type: CHECK_AUTH,
    authenticated,
    user: {
      email,
      picture,
    },
  }
}

export const socialLoginSuccess = user => {
  let authenticated
  const email = user.email
  if (email === process.env.EMAIL1 || email === process.env.EMAIL2 || email === process.env.EMAIL3) {
    authenticated = true
    /* istanbul ignore next */
    if (storageAvailable('localStorage')) {
      window.localStorage.setItem('authorized', 'true')
      window.localStorage.setItem('email', email)
      window.localStorage.setItem('picture', user.picture)
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
