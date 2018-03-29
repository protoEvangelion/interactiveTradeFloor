import React from 'react'
import renderer from 'react-test-renderer'
import Info from '.'

describe('<Info /> snapshot', () => {
	it('renders with open status', () => {
		const tree = renderer.create(<Info tip="Hello" status="open" />).toJSON()
		expect(tree).toMatchSnapshot()
	})
	it('renders with holding status', () => {
		const tree = renderer.create(<Info tip="Hello" status="Holding" />).toJSON()
		expect(tree).toMatchSnapshot()
	})
})
