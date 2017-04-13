import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Hero } from 'components'

const props = {
  checkAuth: () => {},
  authenticated: true,
}

storiesOf('Hero', module)
  .add('default', () => (
    <Hero {...props} />
  ))
