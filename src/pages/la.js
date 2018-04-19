import PropTypes from 'prop-types'
import React from 'react'
import { Floorplan } from 'components/organisms'

const LA = ({ location, transition }) => (
	<div style={transition && transition.style}>
		<Floorplan path={location.pathname.slice(1)} />
	</div>
)

LA.propTypes = {
	location: PropTypes.object.isRequired,
}

export default LA
