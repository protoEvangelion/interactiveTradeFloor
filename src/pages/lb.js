import React from 'react'
import { Floorplan } from 'components/organisms'

export default ({ location }) => <Floorplan path={location.pathname.slice(1)} />
