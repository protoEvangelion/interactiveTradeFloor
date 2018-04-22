import { font, palette } from 'styled-theme'
import styled, { css } from 'styled-components'

import { Link } from 'react-router'
import PropTypes from 'prop-types'
import React from 'react'
import { ifProp } from 'styled-tools'

const fontSize = ({ height }) => `${height / 40}rem`

const backgroundColor = ({ transparent, disabled }) =>
	transparent ? 'transparent' : palette(disabled ? 2 : 1)

const foregroundColor = ({ transparent, disabled }) =>
	transparent ? palette(disabled ? 2 : 1) : palette('grayscale', 0, true)

const hoverBackgroundColor = ({ disabled, transparent }) =>
	!disabled && !transparent && palette(0)
const hoverForegroundColor = ({ disabled, transparent }) =>
	!disabled && transparent && palette(0)

const styles = css`
	align-items: center;
	background-color: ${backgroundColor};
	border-radius: 0.125em;
	border: 0.0625em solid ${ifProp('transparent', 'currentcolor', 'transparent')};
	box-sizing: border-box;
	color: ${foregroundColor};
	cursor: ${ifProp('disabled', 'default', 'pointer')};
	display: inline-flex;
	font-family: ${font('primary')};
	font-size: ${fontSize};
	height: 2.5em;
	justify-content: center;
	padding: 0 1em;
	pointer-events: ${ifProp('disabled', 'none', 'auto')};
	text-decoration: none;
	transition: background-color 250ms ease-out, color 250ms ease-out,
		border-color 250ms ease-out;
	white-space: nowrap;

	&:hover,
	&:focus,
	&:active {
		background-color: ${hoverBackgroundColor};
		color: ${hoverForegroundColor};
	}

	&:focus {
		outline: none;
	}
`

const StyledLink = styled(
	// eslint-disable-next-line
	({ disabled, transparent, reverse, palette, height, theme, ...props }) => (
		<Link {...props} />
	)
)`
	${styles};
`
const Anchor = styled.a`
	${styles};
`
const StyledButton = styled.button`
	${styles};
`

const Button = ({ type, ...props }) => {
	if (props.to) {
		return <StyledLink {...props} />
	} else if (props.href) {
		return <Anchor {...props} />
	}
	return <StyledButton {...props} type={type} />
}

Button.propTypes = {
	disabled: PropTypes.bool,
	palette: PropTypes.string,
	transparent: PropTypes.bool,
	reverse: PropTypes.bool,
	height: PropTypes.number,
	type: PropTypes.string,
	to: PropTypes.string,
	href: PropTypes.string,
}

Button.defaultProps = {
	palette: 'primary',
	type: 'button',
	height: 40,
}

export default Button
