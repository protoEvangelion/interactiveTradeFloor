import { createStore as reduxCreateStore } from 'redux'
import boothsReducer from './booths/reducer'

const createStore = () =>
  reduxCreateStore(
    boothsReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

export default createStore
