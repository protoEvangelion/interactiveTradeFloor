import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const CommonGrid = styled.div`
	border: 1px solid grey;
	box-sizing: border-box;
	display: inline-block;
	z-index: 3;
`

const ColumnGrid = styled(CommonGrid)`
	border-top: none;
	border-bottom: none;
	height: 100%;
	position: relative;
	width: ${props => props.dimension}px;
`

const RowGrid = styled(CommonGrid)`
	border-left: none;
	border-right: none;
	height: ${props => props.dimension}px;
	left: 0;
	position: absolute;
	top: 0;
	transform: ${props => `translateY(${props.i * props.dimension}px)`};
	width: 100%;
`

const Text = styled.span`
	display: inline-block;
	transform: ${props =>
		props.left
			? `translate(-1.5rem, ${props.dimension / 2 - 9}px)`
			: 'translateY(-1.5rem)'};
	text-align: ${props => (props.left ? 'left' : 'center')};
	width: 100%;
`

const GridLines = props => {
	const boothLayout = props.boothLayout

	function renderColumns() {
		return Array(boothLayout.columns)
			.fill('')
			.map((empty, i) => (
				<ColumnGrid dimension={boothLayout.dimension} key={i}>
					<Text dimension={boothLayout.dimension}>{i + 1}</Text>
				</ColumnGrid>
			))
	}

	function renderRows() {
		return Array(boothLayout.rows)
			.fill('')
			.map((empty, i) => (
				<RowGrid dimension={boothLayout.dimension} key={i} i={i}>
					<Text dimension={boothLayout.dimension} left>
						{i + 1}
					</Text>
				</RowGrid>
			))
	}

	return (
		<Fragment>
			{props.isGridVisible ? renderColumns() : ''}
			{props.isGridVisible ? renderRows() : ''}
		</Fragment>
	)
}

GridLines.propTypes = {
	boothLayout: PropTypes.object.isRequired,
	isGridVisible: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
	return { isGridVisible: state.isGridVisible }
}

export default connect(mapStateToProps)(GridLines)
