import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { BOOTH_LAYOUT } from 'appConfig'

const ColumnGrid = styled.div`
	border-right: 1px solid black;
	border-left: 1px solid black;
	box-sizing: border-box;
	display: inline-block;
	height: 100%;
	width: ${BOOTH_LAYOUT.dimension}px;
`

const RowGrid = styled.div`
	border-bottom: 1px solid black;
	border-top: 1px solid black;
	box-sizing: border-box;
	display: inline-block;
	height: ${BOOTH_LAYOUT.dimension}px;
	left: 0;
	position: absolute;
	top: 0;
	transform: ${props => `translateY(${props.i * BOOTH_LAYOUT.dimension}px)`};
	width: 100%;
`

const Text = styled.span`
	display: inline-block;
	transform: ${props =>
		props.left
			? `translate(-1.5rem, ${BOOTH_LAYOUT.dimension / 2 - 9}px)`
			: 'translateY(-1.5rem)'};
	text-align: ${props => (props.left ? 'left' : 'center')};
	width: 100%;
`

const GridLines = props => {
	function renderColumns() {
		return Array(BOOTH_LAYOUT.columns)
			.fill('')
			.map((empty, i) => (
				<ColumnGrid key={i}>
					<Text>{i + 1}</Text>
				</ColumnGrid>
			))
	}

	function renderRows() {
		return Array(BOOTH_LAYOUT.rows)
			.fill('')
			.map((empty, i) => (
				<RowGrid key={i} i={i}>
					<Text left>{i + 1}</Text>
				</RowGrid>
			))
	}

	return (
		<Fragment>
			{props.isGridVisible ? renderColumns() : ''}
			{props.isGridVisible ? renderRows() : ''}
			{/* {renderColumns()} */}
			{/* {renderRows()} */}
		</Fragment>
	)
}

function mapStateToProps(state) {
	return { isGridVisible: state.isGridVisible }
}

export default connect(mapStateToProps)(GridLines)
