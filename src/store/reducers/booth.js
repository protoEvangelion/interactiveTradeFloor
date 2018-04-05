import { LOAD_BOOTHS, UPDATE_BOOTHS } from 'store/actions'

export default (state = null, action) => {
	if (action.type === LOAD_BOOTHS) {
		return action.data
	} else if (action.type === UPDATE_BOOTHS) {
		const { company, owner, status, description } = action.data

		const boothsArr = [...state]
		console.log('BEFORE', action.boothIndex, boothsArr[action.boothIndex])

		boothsArr[action.boothIndex] = Object.assign({}, boothsArr[action.boothIndex], {
			company,
			owner,
			status,
			description,
		})

		console.log('AFTER', boothsArr[action.boothIndex])

		return boothsArr
	}
	return state
}
