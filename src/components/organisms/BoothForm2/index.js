import { Button } from 'components/atoms'
import { ReduxField } from 'components/molecules'

import React, { Component } from 'react'

import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import showFormSpinner from 'store/actions/showFormSpinner'

import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { USER_NAMES } from 'appConfig'

import { callEmailTeamCloudFunction } from 'firebase-db/cloudFunctions'

import { toast } from 'react-toastify'

const Form = styled.form`
	box-sizing: border-box;
	margin-top: -20px;
	padding: 1rem;
	width: 100%;
`

class BoothForm extends Component {
	async emailTeam(company, description, num, owner, status) {
		const response = await callEmailTeamCloudFunction({
			company,
			description,
			num,
			owner,
			status,
		})

		if (response.data.status == 'success') {
			toast.success('Sent email successfully', {
				position: toast.POSITION.BOTTOM_RIGHT,
			})
		} else {
			console.log(`Failed to send email ==> ${JSON.stringify(response)}`)

			toast.error('Failed to send email', {
				position: toast.POSITION.BOTTOM_RIGHT,
			})
		}
	}
	render() {
		const {
			company,
			description,
			handleSubmit,
			isFormSpinnerVisible,
			num,
			owner,
			showFormSpinner,
			status,
		} = this.props
		return (
			<Form method="POST" onSubmit={handleSubmit}>
				<Field
					name="company"
					label="Company Name"
					defaultValue={company}
					component={ReduxField}
				/>

				<Field
					name="owner"
					label="Owner"
					component={ReduxField}
					type="select"
					value={owner}
				>
					<option value="None">None</option>

					{USER_NAMES.map(user => (
						<option key={user} value={user}>
							{user}
						</option>
					))}
				</Field>

				<Field
					name="status"
					label="Status"
					component={ReduxField}
					type="select"
					value={status}
				>
					<option value="n/a">N/A</option>
					<option value="open">Open</option>
					<option value="holding">Holding</option>
					<option value="collect">Need to Collect</option>
					<option value="good">Good to go</option>
				</Field>

				<Field
					name="description"
					label="Description"
					component={ReduxField}
					defaultValue={description}
				/>

				<br />

				<div>
					<Button
						onClick={() => {
							console.log('SHOWING!!!!!!!!!!!!')
							showFormSpinner()
						}}
						palette="primary"
						style={{
							marginRight: '10px',
						}}
						type="submit"
					>
						Save
					</Button>

					<Button
						type="submit"
						palette="success"
						onClick={() => this.emailTeam(company, description, num, owner, status)}
					>
						Save and Email Team
					</Button>
				</div>
			</Form>
		)
	}
}

BoothForm.propTypes = {
	company: PropTypes.string.isRequired,
	description: PropTypes.string,
	handleSubmit: PropTypes.func.isRequired,
	num: PropTypes.number.isRequired,
	owner: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired,
	submitting: PropTypes.bool,
}

const mapStateToProps = (state, ownProps) => ({
	initialValues: {
		company: ownProps.company,
		owner: ownProps.owner,
		status: ownProps.status,
		description: ownProps.description,
	},
})

export const formConfig = {
	form: 'BoothForm',
	fields: ['company', 'owner', 'status', 'description'],
	destroyOnUnmount: true,
	// validate,
}

export default connect(mapStateToProps, { showFormSpinner })(
	reduxForm(formConfig)(BoothForm)
)
