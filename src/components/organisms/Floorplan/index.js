import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ToastContainer, toast } from 'react-toastify'

import { Modal } from 'components/molecules'
import { BoothForm, Booths } from 'components/organisms'
import { isApprovedUser } from 'firebase-db/auth'
import { saveBoothData } from 'firebase-db/db'
import updateBooths from 'store/actions/updateBooths'

class Floorplan extends Component {
	constructor() {
		super()

		this.state = {
			activeBooth: 0,
			boothIndex: 0,
			company: '',
			description: '',
			email: false,
			modalIsOpen: false,
			owner: '',
			status: '',
		}

		this.boothClick = this.boothClick.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.submitForms = this.submitForms.bind(this)
	}

	boothClick(activeBooth, company, description, i, _id, owner, status) {
		console.log('BOOTH CLICK', this.state)

		this.setState({
			activeBooth,
			company,
			description,
			i,
			_id,
			modalIsOpen: true,
			owner,
			status,
		})
	}

	closeModal() {
		this.setState({ modalIsOpen: false })
	}

	submitForms(values) {
		console.log('values ===>', values)

		this.closeModal()

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

	render() {
		return (
			<section>
				<Booths boothClick={this.boothClick} path={this.props.path} />

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

				<ToastContainer />
			</section>
		)
	}
}

Floorplan.propTypes = {
	path: PropTypes.string.isRequired,
	updateBooths: PropTypes.func.isRequired,
}

export default connect(null, { updateBooths })(Floorplan)
