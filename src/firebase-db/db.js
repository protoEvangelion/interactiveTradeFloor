import { isNumber, values } from 'lodash'

import { db } from './'

export function listenForBoothChanges(city = 'la', loadBooths) {
	db.ref(`${city}/`).on('value', snapshot => {
		loadBooths(values(snapshot.val()))
	})
}

export function removeBoothListener(city = 'la') {
	db.ref(`${city}/`).off()
}

export function saveBoothData(route, values) {
	let path = route
	const firstChar = route.slice(0, 1)

	if (firstChar === '/') {
		path = route.slice(1)
	}
	console.log('PATH =========>', path, values)
	return db.ref(path).update(values)
}

export function remapMongoData(booths, path) {
	if (isNumber(booths[0]._id)) {
		console.log('BOOTH ID IS STRING ===> REMAPPING')

		booths.map((booth, i) => {
			const newBooth = Object.assign({}, booth)
			newBooth._id = i
			saveBoothData(`${path}/${booth.num}`, newBooth)
		})
	}
}
