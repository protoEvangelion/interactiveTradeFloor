import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Info from '.'

storiesOf('Info', module)
	.add('default', () => <Info>Hello</Info>)
	.add('reverse', () => <Info reverse>Hello</Info>)
