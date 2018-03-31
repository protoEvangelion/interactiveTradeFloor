import { Info, StatusCircle, Tooltip } from 'components/atoms'

import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import styled from 'styled-components'

export const determineColor = (filter, owner, status, colorMap) => {
	if ((filter !== 'None' && filter !== owner) || status === 'open' || status === 'n/a') {
		return 'black'
	}

	if (colorMap[owner]) {
		return colorMap[owner].color
	}

	return 'black'
}

export const determineY = (y, row) => y + row * 3.1

export const determineX = (x, col) => x + col * 3.1

export const determineWidth = (type, dim, spanWidth, borderWidth) => {
	const offset = (spanWidth - 1) * 2 * borderWidth - borderWidth

	if (spanWidth) {
		return `${dim * spanWidth + offset}px`
	} else if (type === 'double') {
		return `${dim * 2 + 3}px`
	}
	return `${dim}px`
}

export const determineHeight = (dim, spanHeight, borderWidth) => {
	const offset = (spanHeight - 1) * 2 * borderWidth - borderWidth

	if (spanHeight) {
		return `${dim * spanHeight + offset}px`
	}
	return `${dim}px`
}

const Wrapper = styled.div`
	display: inline-block;
	cursor: pointer;
	position: absolute;
	background-color: ${props => (props.status === 'open' ? 'yellow' : 'white')};
	width: ${props => determineWidth(props.type, props.dim, props.spanWidth, props.borderWidth)};
	height: ${props => determineHeight(props.dim, props.spanHeight, props.borderWidth)};
	overflow: hidden;
	transform: translate(
		${props => determineX(props.x, props.col)}px,
		${props => determineY(props.y, props.row)}px
	);
	transition: background 0.5s, border 0.5s;
`

const Booth = props => {
	const {
		_id,
		boothClick,
		co,
		col,
		colorMap,
		description,
		dim,
		filter,
		i,
		num,
		owner,
		row,
		spanHeight,
		spanWidth,
		status,
		tip,
		type,
		x,
		y,
	} = props

	const borderWidth = 2

	return (
		<Fragment>
			<Wrapper
				borderWidth={borderWidth}
				className="boothCtn"
				col={col}
				colorMap={colorMap}
				dim={dim}
				filter={filter}
				id={_id}
				onClick={() => boothClick(num, co, description, i, _id, owner, status)}
				owner={owner}
				row={row}
				spanHeight={spanHeight}
				spanWidth={spanWidth}
				status={status}
				style={{
					border: `${borderWidth}px solid ${determineColor(filter, owner, status, colorMap)}`,
				}}
				type={type}
				value={num}
				x={x}
				y={y}
			>
				<Info num={num} co={co} status={status} tip={tip} />

				<StatusCircle filter={filter} owner={owner} status={status} />
			</Wrapper>

			<Tooltip _id={_id} co={co} owner={owner} status={status} description={description} />
		</Fragment>
	)
}

Booth.propTypes = {
	_id: PropTypes.string.isRequired,
	boothClick: PropTypes.func.isRequired,
	co: PropTypes.string,
	col: PropTypes.number.isRequired,
	colorMap: PropTypes.object.isRequired,
	description: PropTypes.string,
	dim: PropTypes.number.isRequired,
	filter: PropTypes.string.isRequired,
	i: PropTypes.number,
	num: PropTypes.number,
	owner: PropTypes.string,
	row: PropTypes.number.isRequired,
	spanHeight: PropTypes.number,
	spanWidth: PropTypes.number,
	status: PropTypes.string,
	tip: PropTypes.string.isRequired,
	type: PropTypes.string,
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
}

export default Booth
