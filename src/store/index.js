import { createStore as createReduxStore } from 'redux'
import rootReducer from './reducers'

const createStore = () => {
	if (typeof window !== 'undefined') {
		return createReduxStore(
			rootReducer,
			window.__REDUX_DEVTOOLS_EXTENSION__ &&
				window.__REDUX_DEVTOOLS_EXTENSION__()
		)
	}
	return createReduxStore(rootReducer)
}

export default createStore
