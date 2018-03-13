import React from 'react'

import { auth } from '../../firebase-db'

const SignOutButton = () => (
  <button type="button" onClick={auth.doSignOut}>
    Sign Out
  </button>
)

export default SignOutButton
