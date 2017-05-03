import { initialState } from './selectors'
import * as actions from './actions'
import reducer from './reducer'

const altState = {
  ...initialState,
  user: 5,
}

it('returns the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState)
})

it('checks auth', () => {
  const action = { type: actions.CHECK_AUTH, authenticated: true, user: 'Jin' }
  expect(reducer(initialState, action)).toEqual({
    ...initialState, authenticated: true, user: 'Jin',
  })
})

it('handles SOCIAL_LOGIN_SUCCESS', () => {
  const action = { type: actions.SOCIAL_LOGIN_SUCCESS, authenticated: true, user: 1 }
  expect(reducer(initialState, action)).toEqual({ ...initialState, authenticated: true, user: 1 })
  expect(reducer(altState, action)).toEqual({ ...altState, authenticated: true, user: 1 })
})

it('handles SOCIAL_LOGOUT', () => {
  const action = { type: actions.SOCIAL_LOGOUT }
  expect(reducer(initialState, action)).toEqual(initialState)
  expect(reducer(altState, action)).toEqual({ ...altState, user: initialState.user })
})
