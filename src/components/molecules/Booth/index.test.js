import React from 'react'
import { shallow } from 'enzyme'
import Booth from '.'

it('renders props', () => {
  const booth = shallow(
    <Booth key={1} num={1} co={'Avardi'} />
  )
  expect(booth.text()).toEqual('<styled.div />')
})

// const wrap = (props = {}) => shallow(<Booth {...props} />)
// it('renders children when passed in', () => {
//   const wrapper = wrap({ children: 'test' })
//   expect(wrapper.contains('test')).toBe(true)
// })
// it('renders props when passed in', () => {
//   const wrapper = wrap({ id: 'foo' })
//   expect(wrapper.find({ id: 'foo' })).toHaveLength(1)
// })
