import { db, storage } from './'
import { isApprovedUser } from './auth'

/*
** Ondemand client side db backup max 1 backup per day
*/
const uploadBooths = snapshot => {
	if (isApprovedUser()) {
		const booths = snapshot.val()

		const today = new Date().toISOString().slice(0, 10)

		const file = `${today}.json`

		const fileRef = storage.ref().child(file)

		fileRef.getDownloadURL().then(
			() => {
				// Backup already exists so do nothing
			},
			() => {
				// File does not exist so proceed with backup
				fileRef
					.putString(JSON.stringify(booths))
					.then(() => console.log('Successfully backed up booths for the day!'))
					.catch(err => console.log('Error backing up booths', err))
			}
		)
	}
}

export const backupBooths = () => {
	db
		.ref('/')
		.once('value')
		.then(snapshot => uploadBooths(snapshot))
}
