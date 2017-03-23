import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { BoothForm } from 'containers'

storiesOf('BoothForm', module)
  .add('default', () => (
    <BoothForm />
  ))
