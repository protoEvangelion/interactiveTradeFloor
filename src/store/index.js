import { createStore as createReduxStore } from 'redux'
import rootReducer from './reducers'

const createStore = () =>
	createReduxStore(
		rootReducer,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)

export default createStore
