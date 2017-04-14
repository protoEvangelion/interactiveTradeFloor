import React from 'react'
import sinon from 'sinon'
import { mount } from 'enzyme'
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
