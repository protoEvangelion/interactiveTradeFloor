import PropTypes from 'prop-types'
import React from 'react'
import { Floorplan } from 'components/organisms'

const LB = ({ location }) => <Floorplan path={location.pathname.slice(1)} />

LB.propTypes = {
	location: PropTypes.object.isRequired,
}

export default LB
