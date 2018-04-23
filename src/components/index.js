import PropTypes from 'prop-types'
import React from 'react'
import { Floorplan } from 'components/organisms'

const Main = ({ location, pathContext }) => (
	<Floorplan boothLayout={pathContext} path={location.pathname.slice(1)} />
)

Main.propTypes = {
	location: PropTypes.object.isRequired,
	pathContext: PropTypes.object.isRequired,
}

export default Main
