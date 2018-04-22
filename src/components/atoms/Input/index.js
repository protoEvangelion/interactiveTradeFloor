import { Field as FormikField } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { ifProp } from 'styled-tools'
import { font, palette } from 'styled-theme'

export const fontSize = ({ height }) => `${height / 35.5555555556}rem`

const Input = styled(FormikField)`
	font-family: ${font('primary')};
	display: block;
	width: 100%;
	margin: 0;
	box-sizing: border-box;
	font-size: ${fontSize};
	padding: 0 0.4444444444em;
	height: ${props => `${props.height}px`};
	color: ${palette('grayscale', 0)};
	background-color: ${palette('grayscale', 0, true)};
	border: 1px solid ${ifProp('invalid', palette('danger', 2), palette('grayscale', 3))};
	border-radius: 2px;
`.withComponent((
	{ error, touched, invalid, height, reverse, ...rest } // eslint-disable-line
) => <FormikField {...rest} />)

Input.propTypes = {
	reverse: PropTypes.bool,
	height: PropTypes.number,
	invalid: PropTypes.bool,
}

Input.defaultProps = {
	height: 40,
}

export default Input
