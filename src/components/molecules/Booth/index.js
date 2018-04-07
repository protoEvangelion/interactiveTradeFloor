import { Info, StatusCircle, Tooltip } from 'components/atoms'

import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import styled, { css } from 'styled-components'
import { ifProp } from 'styled-tools'

export const determineColor = (filter, owner, status, colorMap) => {
	if ((filter !== 'None' && filter !== owner) || status === 'open' || status === 'n/a') {
		return 'black'
	}

	if (colorMap[owner]) {
		return colorMap[owner].color
	}

	return 'black'
}

export const determineWidth = (type, dim, customSize) => {
	if (customSize) {
		const width = customSize.slice(0, customSize.indexOf('x'))

		return `${dim * width}px`
	}

	return `${dim}px`
}

export const determineHeight = (dim, customSize) => {
	if (customSize) {
		const height = customSize.slice(customSize.indexOf('x') + 1, customSize.length)

		return `${dim * height}px`
	}
	return `${dim}px`
}

const Wrapper = styled.div`
	background-color: ${props => (props.status === 'open' ? 'yellow' : 'white')};
	box-sizing: border-box;
	cursor: ${props => (props.noClick ? 'auto' : 'pointer')};
	display: inline-block;
	height: ${props => determineHeight(props.dim, props.customSize)};
	overflow: hidden;
	position: absolute;
	transform: translate(
		${props => (props.col - 1) * props.dim}px,
		${props => (props.row - 1) * props.dim}px
	);
	transition: background 0.5s, border 0.5s;
	width: ${props => determineWidth(props.type, props.dim, props.customSize)};

	${(ifProp('image'),
	css`
		background-image: ${props => `url(${props.image})`};
		background-position: center;
		background-repeat: no-repeat;
	`)};
`

const Booth = props => {
	const {
		_id,
		boothClick,
		borderWidth,
		co,
		col,
		colorMap,
		customSize,
		description,
		dim,
		filter,
		i,
		image,
		num,
		owner,
		row,
		status,
		tip,
		type,
	} = props

	let click

	if (num) {
		click = { onClick: () => boothClick(num, co, description, i, _id, owner, status) }
	} else {
		click = { noClick: true }
	}

	return (
		<Fragment>
			<Wrapper
				{...click}
				className="boothCtn"
				col={col}
				colorMap={colorMap}
				customSize={customSize}
				dim={dim}
				filter={filter}
				id={_id}
				image={image}
				owner={owner}
				row={row}
				status={status}
				style={{
					border: `${borderWidth}px solid ${determineColor(
						filter,
						owner,
						status,
						colorMap
					)}`,
				}}
				type={type}
				value={num}
			>
				<Info num={num} co={co} status={status} tip={tip} />

				<StatusCircle filter={filter} owner={owner} status={status} />
			</Wrapper>

			{num && (
				<Tooltip
					_id={_id}
					co={co}
					owner={owner}
					status={status}
					description={description}
				/>
			)}
		</Fragment>
	)
}

Booth.propTypes = {
	_id: PropTypes.string.isRequired,
	boothClick: PropTypes.func.isRequired,
	borderWidth: PropTypes.number.isRequired,
	co: PropTypes.string,
	col: PropTypes.number.isRequired,
	colorMap: PropTypes.object.isRequired,
	customSize: PropTypes.string,
	description: PropTypes.string,
	dim: PropTypes.number.isRequired,
	filter: PropTypes.string,
	i: PropTypes.number,
	image: PropTypes.string,
	num: PropTypes.number,
	owner: PropTypes.string,
	row: PropTypes.number.isRequired,
	status: PropTypes.string,
	tip: PropTypes.string.isRequired,
	type: PropTypes.string,
}

export default Booth
