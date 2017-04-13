import React from 'react'
import renderer from 'react-test-renderer'
import Tooltip from '.'

const props = {
  _id: '2sdf5d2sdf',
  co: 'AOA',
  owner: 'Ryan',
  status: 'Holding',
  description: 'Stuff',
}

describe('Tooltip snapshot', () => {
  it('renders tooltip', () => {
    const tree = renderer.create(
      <Tooltip {...props} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
