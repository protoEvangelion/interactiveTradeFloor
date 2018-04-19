import { isNumber, values } from 'lodash'

import { db } from './'

const capFirstLetter = str => str.charAt(0).toUpperCase() + str.substring(1)

const firstLetterIsUpper = str => /[A-Z]/.test(str)

export function listenForBoothChanges(city = 'la', loadBooths) {
	db.ref(`${city}/`).on('value', snapshot => {
		const booths = snapshot.val()

		const boothsArr = values(booths).map(booth => {
			if (booth.owner && !firstLetterIsUpper(booth.owner)) {
				return { ...booth, owner: capFirstLetter(booth.owner) }
			}
			return booth
		})

		loadBooths(boothsArr)
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
