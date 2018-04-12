import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Spinner } from 'components/atoms'
import { Header } from 'components/organisms'
import PropTypes from 'prop-types'
import { palette } from 'styled-theme'
import styled from 'styled-components'

import './base.css'

const Nav = styled.nav`
	display: flex;
	list-style: none;
	> :not(:first-child) {
		margin-left: 1rem;
	}
	a {
		font-weight: 300;
		color: ${palette('grayscale', 2)};
		font-size: 1.25rem;
		&.active {
			color: ${palette('grayscale', 0)};
		}
	}
`

const BaseLayout = props => {
	return (
		<Fragment>
			<Nav {...props}>
				<Header />
			</Nav>

			<Spinner
				fullscreen={props.isFormSpinnerVisible}
				visible={props.isFormSpinnerVisible}
			/>

			{props.children()}
		</Fragment>
	)
}

BaseLayout.propTypes = {
	isFormSpinnerVisible: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
	return {
		isFormSpinnerVisible: state.isFormSpinnerVisible,
	}
}

export default connect(mapStateToProps)(BaseLayout)
