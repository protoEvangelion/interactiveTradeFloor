import React from 'react'
import { Header, Floorplan } from 'components/organisms'

const USER_NAMES = ['todd', 'richard', 'jin']
const USER_COLORS = ['#00B20E', '#0800FF', 'red']

export default () => (
  <div>
    <Header />
    <Floorplan colorMap={USER_COLORS} />
  </div>
)
