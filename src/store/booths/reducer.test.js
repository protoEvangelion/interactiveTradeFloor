import reducer from './reducer'

it('returns the initial state', () => {
  expect(reducer(undefined, {})).toEqual([])
})
