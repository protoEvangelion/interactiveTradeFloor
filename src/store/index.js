import { createStore as createReduxStore } from 'redux'
import rootReducer from './reducers'

let store

if (typeof window !== 'undefined') {
	store = createReduxStore(
		rootReducer,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
} else {
	store = createReduxStore(rootReducer)
}

export default store
