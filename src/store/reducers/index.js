import { combineReducers } from 'redux'
import boothReducer from './booth'
import preloadingReducer from './preloading'

export default combineReducers({
  booths: boothReducer,
  isPreloading: preloadingReducer,
})
