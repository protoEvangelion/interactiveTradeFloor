import { AUTHENTICATED_USER_EMAILS } from '../../functions/secretVariables'
import { auth, functions } from './'

const emailTeam = functions.httpsCallable('emailTeam')

/*
	Client side validation for google cloud function
*/
export function callEmailTeamCloudFunction(data) {
	let isApprovedUser = false
	const userEmail = auth.currentUser.email

	AUTHENTICATED_USER_EMAILS.map(email => {
		if (email === userEmail) {
			isApprovedUser = true
		}
	})

	if (isApprovedUser) {
		emailTeam(data).then(result => console.log(result))
	}
}
