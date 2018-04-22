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
		console.log('User is signed in')
		store.dispatch(setUser({ displayName, email, photo }))
	} else {
		console.log('No user signed in')
		store.dispatch(setUser(null))
	}
})

export const doSignIn = () =>
	auth
		.signInWithRedirect(provider)
		.then(result => {
			const user = result.user
			console.log('got user from google sign in ====>', user)
		})
		.catch(error => {
			console.log('error during google sign in', error)
		})

export const doSignOut = () =>
	auth
		.signOut()
		.then(() => console.log('Signed out successfully'))
		.catch(err => console.log('Error signing out', err))
