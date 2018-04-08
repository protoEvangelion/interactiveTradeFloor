import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { isEqual } from 'lodash'
import {
	// remapMongoData,
	removeBoothListener,
	listenForBoothChanges,
} from 'firebase-db/db'
import preload from 'store/actions/preload'
import loadBooths from 'store/actions/loadBooths'
import { BOOTH_LAYOUT, USER_MAP } from 'appConfig'
import { Spinner } from 'components/atoms'
import { Booth, GridLines } from 'components/molecules'

class Booths extends Component {
	constructor() {
		super()
	}
	componentWillMount() {
		console.log('MOUNTING')
		listenForBoothChanges(this.props.path, this.props.loadBooths)
	}

	componentWillUnmount() {
		console.log('UN---MOUNTIN')
		removeBoothListener(this.props.path)
	}

	shouldComponentUpdate(nextProps) {
		console.log('UPDATING')
		if (!this.props.booths) {
			return true
		}
		if (isEqual(this.props.booths.sort(), nextProps.booths.sort())) {
			console.log('NO UPDATE')
			return false
		}
		// console.log('YES UPDATE')
		return true
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
						borderWidth={BOOTH_LAYOUT.borderWidth}
						co={booth.company}
						col={booth.col}
						colorMap={USER_MAP}
						customSize={booth.size}
						description={booth.description}
						dim={BOOTH_LAYOUT.dimension}
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
						height: BOOTH_LAYOUT.rows * BOOTH_LAYOUT.dimension,
						margin: '3rem 0',
						position: 'relative',
						width: BOOTH_LAYOUT.columns * BOOTH_LAYOUT.dimension,
					}}
				>
					{this.props.booths ? this.renderBooths() : <Spinner />}

					<GridLines />
				</div>
			</div>
		)
	}
}

Booths.propTypes = {
	boothClick: PropTypes.func.isRequired,
	booths: PropTypes.array,
	filter: PropTypes.string.isRequired,
	loadBooths: PropTypes.func.isRequired,
	path: PropTypes.string.isRequired,
	preload: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	booths: state.booths,
	filter: state.filter,
	isPreloading: state.isPreloading,
})

export default connect(mapStateToProps, { preload, loadBooths })(Booths)
