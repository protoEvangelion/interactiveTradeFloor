import React from 'react'
import { shallow } from 'enzyme'
import StatusCircle, { determineColor } from '.'

const wrap = (props = {}) => shallow(<StatusCircle {...props} />)

describe('<StatusCircle />', () => {
	it('renders children when passed in', () => {
		const wrapper = wrap({ children: 'test' })
		expect(wrapper.contains('test')).toBe(true)
	})

	it('renders props when passed in', () => {
		const wrapper = wrap({ id: 'foo' })
		expect(wrapper.find({ id: 'foo' })).toHaveLength(1)
	})

	it('determines color', () => {
		expect(determineColor('None', 'Jin', 'holding')).toEqual('rgb(255, 216, 0)')
		expect(determineColor('None', 'Jin', 'good')).toEqual('rgb(21, 255, 0)')
		expect(determineColor('None', 'Jin', 'collect')).toEqual('red')
	})
})
