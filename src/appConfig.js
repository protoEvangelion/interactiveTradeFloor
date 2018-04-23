/**
 * You shouldn't have to edit this file as it is an import convenience wrapper
 * For easier imports within this app
 * That pulls what you add to config.js in the root of this repo
 */

const { keys } = require('lodash')

const {
	AUTHENTICATED_USER_EMAILS,
	FIREBASE_CONFIG,
	FLOORPLAN_PAGES,
	USER_MAP,
} = require('../config')

const USER_NAMES = keys(USER_MAP)

module.exports = {
	AUTHENTICATED_USER_EMAILS,
	FIREBASE_CONFIG,
	FLOORPLAN_PAGES,
	USER_MAP,
	USER_NAMES,
}
