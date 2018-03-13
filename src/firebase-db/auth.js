import { auth, provider } from './'

auth.onAuthStateChanged(function(user) {
  if (user) {
    var displayName = user.displayName
    var email = user.email
    var photoURL = user.photoURL
    var uid = user.uid
    console.log('User is signed in', displayName, email, photoURL)
  } else {
    console.log('No user signed in')
  }
})

// Sign In
export const doSignIn = () =>
  auth
    .signInWithPopup(provider)
    .then(result => {
      const token = result.credential.accessToken
      const user = result.user
      console.log('got user from google sign in ====>', user)
    })
    .catch(error => {
      console.log('error during google sign in', error)
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.email
      const credential = error.credential
    })

// Sign Out
export const doSignOut = () =>
  auth
    .signOut()
    .then(() => console.log('Signed out successfully'))
    .catch(err => console.log('Error signing out', err))
