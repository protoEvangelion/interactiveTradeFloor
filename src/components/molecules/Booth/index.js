import { Info, StatusCircle, Tooltip } from 'components/atoms'

import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import styled from 'styled-components'

export const determineColor = (filter, owner, status, colorMap) => {
	if (
		(filter !== 'None' && filter !== owner) ||
		status === 'open' ||
		status === 'n/a'
	) {
		return 'black'
	}

	if (colorMap[owner]) {
		return colorMap[owner]
	}

	return 'black'
}

export const determineY = (y, row) => y + row * 3.1

export const determineX = (x, col) => x + col * 3.1

export const determineWidth = (type, dim) => {
	switch (type) {
		case 'double':
			return `${dim * 2 + 3}px`
		default:
			return `${dim}px`
	}
}

export const determineHeight = dim => `${dim}px`

const Wrapper = styled.div`
	display: inline-block;
	cursor: pointer;
	position: absolute;
	background-color: ${props => (props.status === 'open' ? 'yellow' : 'white')};
	width: ${props => determineWidth(props.type, props.dim)};
	height: ${props => determineHeight(props.dim)};
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
		colorMap,
		filter,
		num,
		i,
		co,
		description,
		type,
		owner,
		row,
		col,
		x,
		y,
		dim,
		status,
		tip,
	} = props

	return (
		<Fragment>
			<Wrapper
				className="boothCtn"
				col={col}
				colorMap={colorMap}
				dim={dim}
				filter={filter}
				id={type}
				onClick={() => boothClick(num, co, description, i, _id, owner, status)}
				owner={owner}
				row={row}
				status={status}
				style={{
					border: `2px solid ${determineColor(
						filter,
						owner,
						status,
						colorMap
					)}`,
				}}
				type={type}
				value={num}
				x={x}
				y={y}
			>
				<Info num={num} co={co} status={status} tip={tip} />

				<StatusCircle filter={filter} owner={owner} status={status} />
			</Wrapper>

			<Tooltip
				_id={_id}
				co={co}
				owner={owner}
				status={status}
				description={description}
			/>
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
	status: PropTypes.string,
	tip: PropTypes.string.isRequired,
	type: PropTypes.string,
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
}

export default Booth
