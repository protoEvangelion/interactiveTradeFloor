import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
	saveBoothData,
	// remapMongoData,
	removeBoothListener,
	listenForBoothChanges,
} from 'firebase-db/db'
import preload from 'store/actions/preload'
import loadBooths from 'store/actions/loadBooths'
import updateBooths from 'store/actions/updateBooths'
import { USER_MAP } from 'appConfig'
import { isApprovedUser } from 'firebase-db/auth'
updateBooths
import { Spinner } from 'components/atoms'
import { BoothForm } from 'components/organisms'
import { Booth, Modal } from 'components/molecules'
import { ToastContainer, toast } from 'react-toastify'

class Floorplan extends Component {
	constructor(props) {
		super(props)

		this.state = {
			activeBooth: 0,
			boothIndex: 0,
			colorMap: USER_MAP,
			columns: 20,
			company: '',
			description: '',
			dimension: 55,
			email: false,
			leftMargin: 20,
			modalIsOpen: false,
			owner: '',
			status: '',
		}

		this.boothClick = this.boothClick.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.submitForms = this.submitForms.bind(this)
	}

	componentWillMount() {
		console.log('MOUNTING')
		listenForBoothChanges(this.props.path, this.props.loadBooths)
	}

	componentWillUnmount() {
		console.log('UN---MOUNTIN')
		removeBoothListener(this.props.path)
	}

	boothClick(activeBooth, company, description, i, _id, owner, status) {
		this.setState({
			activeBooth,
			company,
			description,
			i,
			_id,
			owner,
			status,
			modalIsOpen: true,
		})
	}

	closeModal() {
		this.setState({ modalIsOpen: false })
	}

	// shouldComponentUpdate(nextProps) {
	//   if (!this.props.booths) {
	//     return true
	//   }
	//   if (isEqual(this.props.booths.sort(), nextProps.booths.sort())) {
	//     console.log('NO UPDATE')
	//     return false
	//   }
	//   console.log('YES UPDATE')
	//   return true
	// }

	submitForms(values) {
		console.log('values ===>', values)

		this.setState({ modalIsOpen: false })

		this.props.updateBooths(this.state.i, values)

		if (isApprovedUser()) {
			saveBoothData(`${this.props.path}/${this.state.activeBooth}`, values)
				.then(() =>
					toast.success('Booth saved successfully!', {
						position: toast.POSITION.BOTTOM_RIGHT,
					})
				)
				.catch(err => {
					console.log('Error saving booth ===> ', err)
					const { company, owner, status, description } = this.state

					this.props.updateBooths(this.state.i, { company, owner, status, description })

					toast.error('Failed to save booth. Reverting now.', {
						position: toast.POSITION.BOTTOM_RIGHT,
					})
				})
		} else {
			toast.error('You are not an approved user. Booth saves will be temporary.', {
				position: toast.POSITION.BOTTOM_RIGHT,
			})
		}
	}

	renderBooths() {
		// remapMongoData(this.props.booths, this.props.path)

		return this.props.booths.map((booth, i) => {
			return (
				<Fragment key={`ctn_${booth._id}`}>
					<Booth
						_id={booth._id}
						boothClick={this.boothClick}
						co={booth.company}
						col={booth.col}
						colorMap={this.state.colorMap}
						description={booth.description}
						dim={this.state.dimension}
						filter={this.props.filter}
						i={i}
						key={booth._id}
						num={booth.num}
						owner={booth.owner}
						row={booth.row}
						spanHeight={booth.spanHeight || null}
						spanWidth={booth.spanWidth || null}
						status={booth.status}
						tip={`tool_${booth._id}`}
						type={booth.type}
						x={booth.col * this.state.dimension + this.state.leftMargin}
						y={booth.row * this.state.dimension}
					/>
				</Fragment>
			)
		})
	}
	render() {
		console.log('Rerendering booths')

		return (
			<section>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<div style={{ width: this.state.columns * this.state.dimension }}>
						{this.props.booths ? this.renderBooths() : <Spinner />}
					</div>
				</div>

				<ToastContainer />

				<Modal
					closeModal={this.closeModal}
					modalIsOpen={this.state.modalIsOpen}
					title={this.state.activeBooth}
				>
					<BoothForm
						onSubmit={this.submitForms}
						num={this.state.activeBooth}
						company={this.state.company}
						description={this.state.description}
						owner={this.state.owner}
						status={this.state.status}
					/>
				</Modal>
			</section>
		)
	}
}

const mapStateToProps = state => ({
	booths: state.booths,
	filter: state.filter,
	isPreloading: state.isPreloading,
})

export default connect(mapStateToProps, { preload, loadBooths, updateBooths })(Floorplan)
