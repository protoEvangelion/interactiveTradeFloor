import { combineReducers } from 'redux'

import boothReducer from './booth'
import filterReducer from './filter'
import gridReducer from './grid'
import userReducer from './user'

export default combineReducers({
	booths: boothReducer,
	filter: filterReducer,
	isGridVisible: gridReducer,
	user: userReducer,
})
