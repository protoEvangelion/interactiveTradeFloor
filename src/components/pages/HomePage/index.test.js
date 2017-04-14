import React from 'react'
import renderer from 'react-test-renderer'
import HomePage from '.'

describe('<HomePage />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <HomePage />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
