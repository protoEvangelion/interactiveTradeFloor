import { Button, FilterNames } from 'components/atoms'
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import setFilter from 'store/actions/setFilter'
import PropTypes from 'prop-types'

class FilterBtn extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showFilter: false,
		}
		this.onSelect = this.onSelect.bind(this)
	}
	onSelect(name) {
		this.props.setFilter(name)
		this.toggleFilter()
	}
	toggleFilter() {
		this.setState({ showFilter: !this.state.showFilter })
	}
	showFilter() {
		return this.state.showFilter ? (
			<FilterNames
				onSelect={this.onSelect}
				toggleFilter={() => this.toggleFilter()}
			/>
		) : (
			''
		)
	}
	render() {
		return (
			<div>
				<Button onClick={() => this.toggleFilter()}>Filter</Button>

				{this.showFilter()}
			</div>
		)
	}
}

FilterBtn.propTypes = {
	setFilter: PropTypes.func.isRequired,
}

export default connect(null, { setFilter })(FilterBtn)
