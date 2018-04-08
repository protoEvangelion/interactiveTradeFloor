import PropTypes from 'prop-types'
import React from 'react'
import { Floorplan } from 'components/organisms'

const LA = ({ location }) => <Floorplan path={location.pathname.slice(1)} />

LA.propTypes = {
	location: PropTypes.object.isRequired,
}

export default LA
