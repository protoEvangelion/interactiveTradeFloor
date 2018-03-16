import { createStore as reduxCreateStore } from 'redux'
import rootReducer from './reducers'

const createStore = () =>
  reduxCreateStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

export default createStore
