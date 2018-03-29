import React from 'react'
import renderer from 'react-test-renderer'
import Tooltip from '.'

const props = {
	_id: '2sdf5d2sdf',
	co: 'AOA',
	owner: 'Jin',
	status: 'open',
	description: 'Stuff',
}

describe('<Tooltip /> snapshot', () => {
	it('renders tooltip with open status', () => {
		const tree = renderer.create(<Tooltip {...props} />).toJSON()
		expect(tree).toMatchSnapshot()
	})
	it('renders tooltip with holding status', () => {
		props.status = 'Holding'
		const tree = renderer.create(<Tooltip {...props} />).toJSON()
		expect(tree).toMatchSnapshot()
	})
})
