import { functions } from './'

const emailTeam = functions.httpsCallable('emailTeam')

export function emailTeamCloudFunction() {
	emailTeam().then(result => console.log(result))
}
