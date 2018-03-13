import React from 'react'

import { auth } from '../../firebase-db'

const SignInButton = () => (
  <button type="button" onClick={auth.doSignIn}>
    Sign In
  </button>
)

export default SignInButton
