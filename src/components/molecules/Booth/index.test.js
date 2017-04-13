import React from 'react'
import { shallow } from 'enzyme'
import Booth from '.'

const props = {
  key: 1,
  num: 1,
  onClick: () => {},
  filter: 'Ryan',
  i: 1,
  co: 'AOA',
  description: 'Stuff',
  type: 'single',
  owner: 'Ryan',
  status: 'Holding',
  row: 1,
  col: 1,
  x: 1,
  y: 1,
  dim: 1,
  tip: 'AOA cool co',
}

it('renders props', () => {
  const booth = shallow(
    <Booth {...props} />
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
