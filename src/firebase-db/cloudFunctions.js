import { functions } from './'
import { isApprovedUser } from './auth'

/*
** Client side validation for google cloud function
** Will prevent the cloud function from being called if the current user
** does not match approved users from the AUTHENTICATED_USER_EMAILS array
*/

async function callEmailTeamCloudFunction(data) {
	const emailTeam = functions.httpsCallable('emailTeam')

	if (isApprovedUser()) {
		const result = await emailTeam(data)
		console.log('is approved =', result)
		return result
	}

	return { data: { status: 'blocked', message: 'You are not an approved user' } }
}

export { callEmailTeamCloudFunction }
