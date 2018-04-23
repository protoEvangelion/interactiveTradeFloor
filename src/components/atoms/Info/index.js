import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const BoothNum = styled.span`
	color: black;
	display: block;
	font-size: 1em;
	font-weight: 600;
	margin: 0;
	text-align: center;
`

const BoothCo = styled.p`
	color: black;
	font-size: 0.68em;
	margin: 0;
	text-align: center;
	padding: 4px 2px 0 2px;
	overflow-wrap: break-word;
	line-height: 1.3em;
`

const Info = ({ num, co, status, tip }) => {
	return (
		<div data-tip data-for={tip}>
			<BoothNum>{num}</BoothNum>
			<BoothCo>{status === 'open' ? status : co}</BoothCo>
		</div>
	)
}

Info.propTypes = {
	num: PropTypes.number,
	co: PropTypes.string,
	status: PropTypes.string,
	tip: PropTypes.string.isRequired,
}

export default Info
