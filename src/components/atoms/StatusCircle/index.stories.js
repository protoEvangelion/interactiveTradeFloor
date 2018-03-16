import React from 'react'
import { storiesOf } from '@kadira/storybook'
import StatusCircle from '.'

storiesOf('StatusCircle', module)
  .add('default', () => (
    <StatusCircle />
  ))
