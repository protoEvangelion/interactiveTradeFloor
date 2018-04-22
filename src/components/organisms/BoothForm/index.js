import { Formik } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import yup from 'yup'

import { USER_NAMES } from 'appConfig'
import { callEmailTeamCloudFunction } from 'firebase-db/cloudFunctions'
import { Button } from 'components/atoms'
import { Field } from 'components/molecules'

const StyledForm = styled.form`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin-top: -20px;
	max-width: 100%;
	min-height: 350px;
	min-width: 320px;
	padding-top: 1rem;
`

const Form = ({ num, company, description, owner, status, submitForm }) => {
	const schema = yup.object().shape({
		company: yup.string().required(),
		description: yup.string(),
		owner: yup.string().required(),
		status: yup.string().required(),
	})

	async function emailTeam(company, description, owner, status) {
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
			toast.error('Failed to send email', {
				position: toast.POSITION.BOTTOM_RIGHT,
			})
		}
	}

	return (
		<Formik
			initialValues={{ company, description, owner, status }}
			validationSchema={schema}
			onSubmit={submitForm}
			render={({ values, errors, touched, handleSubmit, isSubmitting }) => (
				<StyledForm onSubmit={handleSubmit}>
					<Field name="company" touched={touched} error={errors} />

					<Field component="select" name="owner" touched={touched} error={errors}>
						<option value="None">None</option>

						{USER_NAMES.map(user => (
							<option key={user} value={user}>
								{user}
							</option>
						))}
					</Field>

					<Field component="select" name="status" touched={touched} error={errors}>
						<option value="n/a">N/A</option>
						<option value="open">Open</option>
						<option value="holding">Holding</option>
						<option value="collect">Need to Collect</option>
						<option value="good">Good to go</option>
					</Field>

					<Field name="description" touched={touched} error={errors} />

					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							paddingTop: '0.5rem',
						}}
					>
						<Button
							disabled={isSubmitting || Object.keys(errors).length > 0}
							onClick={() => {
								console.log('SHOWING!!!!!!!!!!!!')
							}}
							palette="primary"
							type="submit"
						>
							Save
						</Button>

						<Button
							disabled={isSubmitting || Object.keys(errors).length > 0}
							type="submit"
							palette="success"
							onClick={() =>
								emailTeam(values.company, values.description, values.owner, values.status)
							}
						>
							Save and Email Team
						</Button>
					</div>
				</StyledForm>
			)}
		/>
	)
}

Form.propTypes = {
	num: PropTypes.number.isRequired,
	company: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	owner: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired,
	submitForm: PropTypes.func.isRequired,
}

export default Form
