import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { Booth } from 'components'

storiesOf('Booth', module)
	.add('default', () => <Booth>Hello</Booth>)
	.add('reverse', () => <Booth reverse>Hello</Booth>)
