import { db, storage } from './'

const uploadBooths = (snapshot, location) => {
	const booths = snapshot.val()

	const today = new Date(Date.now()).toDateString().replace(/\/| |,/g, '-')

	const file = `${location}__${today}.json`

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

export const backupBooths = () => {
	db
		.ref('la/')
		.once('value')
		.then(snapshot => uploadBooths(snapshot, 'la'))

	db
		.ref('lb/')
		.once('value')
		.then(snapshot => uploadBooths(snapshot, 'lb'))
}
