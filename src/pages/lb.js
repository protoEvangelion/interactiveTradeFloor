import PropTypes from 'prop-types'
import React from 'react'
import { Floorplan } from 'components/organisms'

const LB = ({ location, transition }) => (
	<div style={transition && transition.style}>
		<Floorplan path={location.pathname.slice(1)} />
	</div>
)

LB.propTypes = {
	location: PropTypes.object.isRequired,
}

export default LB
