import { AUTHENTICATED_USER_EMAILS } from '../../secretVariables'
import { auth, functions } from './'

const emailTeam = functions.httpsCallable('emailTeam')

export function emailTeamCloudFunction() {
	let isApprovedUser = false
	const userEmail = auth.currentUser.email

	AUTHENTICATED_USER_EMAILS.map(email => {
		if (email === userEmail) {
			isApprovedUser = true
		}
	})

	if (isApprovedUser) {
		emailTeam().then(result => console.log(result))
	}
}
