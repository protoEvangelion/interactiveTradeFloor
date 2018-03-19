import { combineReducers } from 'redux'
import boothReducer from './booth'
import filterReducer from './filter'
import preloadingReducer from './preloading'

export default combineReducers({
  booths: boothReducer,
  filter: filterReducer,
  isPreloading: preloadingReducer,
})
