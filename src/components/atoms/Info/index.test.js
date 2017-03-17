import React from 'react'
import { shallow } from 'enzyme'
import Info from '.'

const wrap = (props = {}) => shallow(<Info {...props} />)

it('renders children when passed in', () => {
  const wrapper = wrap()
  expect(wrapper.children().length === 2)
})
