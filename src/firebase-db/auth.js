import { auth, provider } from './'
import { AUTHENTICATED_USER_EMAILS } from 'appConfig'
import store from 'store'
import setUser from 'store/actions/setUser'

export function isApprovedUser() {
	let isApprovedUser = false

	AUTHENTICATED_USER_EMAILS.map(email => {
		const currentUser = auth.currentUser

		if (currentUser) {
			if (email === currentUser.email) {
				isApprovedUser = true
			}
		}
	})

	return isApprovedUser
}

auth.onAuthStateChanged(function(user) {
	if (user) {
		const displayName = user.displayName
		const email = user.email
		const photo = user.photoURL
		// const uid = user.uid
		console.log('User is signed in')
		store.dispatch(setUser({ displayName, email, photo }))
	} else {
		console.log('No user signed in')
		store.dispatch(setUser(null))
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
