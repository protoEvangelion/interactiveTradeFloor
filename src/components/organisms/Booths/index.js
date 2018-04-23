import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'

import { USER_MAP } from 'appConfig'
import { Spinner } from 'components/atoms'
import { Booth, GridLines } from 'components/molecules'
import {
	// remapMongoData,
	removeBoothListener,
	listenForBoothChanges,
} from 'firebase-db/db'
import loadBooths from 'store/actions/loadBooths'
import './styles.css'

class Booths extends Component {
	constructor() {
		super()
	}
	componentWillMount() {
		console.log('BOOTHS MOUNTING')
		listenForBoothChanges(this.props.path, this.props.loadBooths)
	}

	componentWillUnmount() {
		console.log('BOOTHS unmounting')
		removeBoothListener(this.props.path)
	}

	renderBooths() {
		// remapMongoData(this.props.booths, this.props.path)
		return this.props.booths.map((booth, i) => {
			return (
				<Fragment key={`ctn_${booth._id}`}>
					<Booth
						_id={booth._id}
						boothClick={() =>
							this.props.boothClick(
								booth.num,
								booth.company,
								booth.description,
								i,
								booth._id,
								booth.owner,
								booth.status
							)
						}
						borderWidth={this.props.boothLayout.borderWidth}
						co={booth.company}
						col={booth.col}
						colorMap={USER_MAP}
						customSize={booth.size}
						description={booth.description}
						dim={this.props.boothLayout.dimension}
						filter={this.props.filter}
						i={i}
						image={booth.image}
						key={booth._id}
						num={booth.num}
						owner={booth.owner}
						row={booth.row}
						spanHeight={booth.spanHeight || null}
						spanWidth={booth.spanWidth || null}
						status={booth.status}
						tip={`tool_${booth._id}`}
						type={booth.type}
					/>
				</Fragment>
			)
		})
	}
	render() {
		console.log('Rerendering booths')

		return (
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<div
					style={{
						height: this.props.boothLayout.rows * this.props.boothLayout.dimension,
						margin: '3rem 0',
						position: 'relative',
						width: this.props.boothLayout.columns * this.props.boothLayout.dimension,
					}}
				>
					<ReactCSSTransitionGroup
						transitionName="boothsAnimate"
						transitionEnterTimeout={500}
						transitionLeaveTimeout={300}
					>
						{this.props.booths ? this.renderBooths() : <Spinner />}
					</ReactCSSTransitionGroup>

					<GridLines boothLayout={this.props.boothLayout} />
				</div>
			</div>
		)
	}
}

Booths.propTypes = {
	boothClick: PropTypes.func.isRequired,
	boothLayout: PropTypes.object.isRequired,
	booths: PropTypes.array,
	filter: PropTypes.string.isRequired,
	loadBooths: PropTypes.func.isRequired,
	path: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
	booths: state.booths,
	filter: state.filter,
})

export default connect(mapStateToProps, { loadBooths })(Booths)
