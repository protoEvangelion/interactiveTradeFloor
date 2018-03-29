import { isString } from 'lodash'

import { db } from './'

const capFirstLetter = str => str.charAt(0).toUpperCase() + str.substring(1)

const firstLetterIsUpper = str => /[A-Z]/.test(str)

export default function listenForBoothChanges(city = 'la', loadBooths) {
	db.ref(`${city}/`).on('value', snapshot => {
		const boothsArr = snapshot.val().map(booth => {
			if (booth.owner && !firstLetterIsUpper(booth.owner)) {
				return { ...booth, owner: capFirstLetter(booth.owner) }
			}
			return booth
		})

		loadBooths(boothsArr)
	})
}

export function saveBoothData(route, values) {
	let path = route
	const firstChar = route.slice(0, 1)

	if (firstChar === '/') {
		path = route.slice(1)
	}
	console.log(path, values)
	db.ref(path).update(values)
}

export function remapMongoData(booths, path) {
	if (isString(booths[0]._id)) {
		console.log('BOOTH ID IS STRING ===> REMAPPING')

		booths.map((booth, i) => {
			const newBooth = Object.assign({}, booth)
			newBooth._id = i
			saveBoothData(`${path}/${i}`, newBooth)
		})
	}
}
