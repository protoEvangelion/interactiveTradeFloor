import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { Block, Input, Label } from 'components/atoms'

const Error = styled(Block)`
	margin: 0.5rem 0 0;
`

const Wrapper = styled.div`
	margin-bottom: 1rem;
	label {
		vertical-align: middle;
	}
`

const Field = ({ error, component, name, touched, ...props }) => {
	let invalid = false

	if (error) {
		if (error[name]) {
			invalid = true
		}
	}

	const inputProps = {
		id: name,
		invalid,
		component,
		name,
		'aria-describedby': `${name}Error`,
		...props,
	}

	const label = name.slice(0, 1).toUpperCase() + name.slice(1)

	return (
		<Wrapper>
			{<Label htmlFor={inputProps.id}>{label}</Label>}
			{<Input {...inputProps} />}
			{touched[name] &&
				error[name] && (
					<Error id={`${name}Error`} role="alert" palette="danger">
						{error[name]}
					</Error>
				)}
		</Wrapper>
	)
}

Field.propTypes = {
	component: PropTypes.string,
	error: PropTypes.object,
	name: PropTypes.string.isRequired,
	touched: PropTypes.object,
}

Field.defaultProps = {
	type: 'text',
}

export default Field
