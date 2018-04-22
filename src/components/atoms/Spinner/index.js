import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { palette } from 'styled-theme'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const StyledSpinner = styled.div`
	position: fixed;
	border: 0.2em solid ${palette('grayscale', 1, true)};
	border-bottom-color: ${palette(1)};
	border-radius: 50%;
	display: ${props => (props.visible ? 'block' : 'none')};
	left: 50%;
	margin: 0 auto;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 5em;
	height: 5em;
	animation: ${spin} 1s linear infinite;
	z-index: ${props => (props.fullscreen ? '1001' : '1')};
`

const ScreenOverlay = styled.div`
	background: rgba(68, 0, 0, 0.7);
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: 1000;
`

const Spinner = props => {
	return props.fullscreen ? (
		<ScreenOverlay>
			<StyledSpinner {...props} />
		</ScreenOverlay>
	) : (
		<StyledSpinner {...props} />
	)
}

Spinner.propTypes = {
	fullscreen: PropTypes.bool,
	palette: PropTypes.string,
	reverse: PropTypes.bool,
	visible: PropTypes.bool,
}

Spinner.defaultProps = {
	palette: 'primary',
	visible: true,
}

export default Spinner
