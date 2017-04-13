import React from 'react'
import renderer from 'react-test-renderer'
import UserButton from '.'

const props = {
  authenticated: false,
  user: { picture: 'test.jpg' },
  onLogin: jest.fn(),
  onLogout: jest.fn(),
}

it('renders User button snapshot', () => {
  const tree = renderer.create(
    <UserButton {...props} />
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
