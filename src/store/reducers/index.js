import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import boothReducer from './booth'
import filterReducer from './filter'
import formSpinner from './formSpinner'
import gridReducer from './grid'
import preloadingReducer from './preloading'

export default combineReducers({
	booths: boothReducer,
	filter: filterReducer,
	form: formReducer,
	isFormSpinnerVisible: formSpinner,
	isGridVisible: gridReducer,
	isPreloading: preloadingReducer,
})
