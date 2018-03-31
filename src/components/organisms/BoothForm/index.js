import { Button } from 'components/atoms'
import { ReduxField } from 'components/molecules'

import React, { Component } from 'react'

import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { createValidator, required } from 'validation'

import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { USER_NAMES } from 'config'

import { emailTeamCloudFunction } from 'firebase-db/cloudFunctions'

const Form = styled.form`
	width: 100%;
	box-sizing: border-box;
	padding: 1rem;
	margin-top: -20px;
`

const validate = createValidator({
	title: [required],
	body: [required],
})

class BoothForm extends Component {
	constructor() {
		super()
		this.state = { email: 'false' }
	}
	render() {
		const {
			boothNum,
			submitting,
			company,
			description,
			handleSubmit,
			owner,
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
					<Button style={{ marginRight: '10px' }} type="submit">
						Save
					</Button>

					<Button
						type="submit"
						palette="success"
						onClick={() => emailTeamCloudFunction()}
					>
						Save and Email Team
					</Button>
				</div>
			</Form>
		)
	}
}

BoothForm.propTypes = {
	submitting: PropTypes.bool,
	boothNum: PropTypes.number.isRequired,
	company: PropTypes.string.isRequired,
	description: PropTypes.string,
	handleSubmit: PropTypes.func.isRequired,
	owner: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
	initialValues: {
		company: ownProps.company,
		owner: ownProps.owner,
		status: ownProps.status,
		description: ownProps.description,
	},
})

export const config = {
	form: 'BoothForm',
	fields: ['company', 'owner', 'status', 'description'],
	destroyOnUnmount: true,
	validate,
}

export default connect(mapStateToProps)(reduxForm(config)(BoothForm))
