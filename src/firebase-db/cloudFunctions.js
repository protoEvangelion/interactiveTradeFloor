import { AUTHENTICATED_USER_EMAILS } from 'appConfig'
import { auth, functions } from './'

/*
Client side validation for google cloud function
*/
async function callEmailTeamCloudFunction(data) {
	const emailTeam = functions.httpsCallable('emailTeam')
	let isApprovedUser = false
	const userEmail = auth.currentUser.email

	AUTHENTICATED_USER_EMAILS.map(email => {
		if (email === userEmail) {
			isApprovedUser = true
		}
	})

	if (isApprovedUser) {
		const result = await emailTeam(data)
		console.log('is approved =', result)
		return result
	}

	return { status: 'blocked', message: 'You are not an approved user' }
}

export { callEmailTeamCloudFunction }
