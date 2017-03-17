import camelCase from 'lodash/camelCase'
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

// const boothReducer = (state = {}, action) => {
//   if (action.type === 'FETCH_BOOTHS') {
//     return Object.assign({}, state, {
//       booths: action.payload.data,
//     })
//   }
//   return state
// }

const reducers = {
  routing,
}

const req = require.context('.', true, /\.\/.+\/reducer\.js$/)

req.keys().forEach((key) => {
  const storeName = camelCase(key.replace(/\.\/(.+)\/.+$/, '$1'))
  reducers[storeName] = req(key).default
})

export default combineReducers(reducers)
