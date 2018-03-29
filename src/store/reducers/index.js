import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import boothReducer from './booth'
import filterReducer from './filter'
import preloadingReducer from './preloading'

export default combineReducers({
	booths: boothReducer,
	filter: filterReducer,
	form: formReducer,
	isPreloading: preloadingReducer,
})
