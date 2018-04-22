import React, { Fragment } from 'react'
import { Header } from 'components/organisms'
import PropTypes from 'prop-types'
import { palette } from 'styled-theme'
import styled from 'styled-components'
import Helmet from 'react-helmet'

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
			<Helmet
				title="Gatsby Default Starter"
				meta={[
					{ name: `description`, content: `Sample` },
					{ name: `keywords`, content: `sample, something` },
				]}
			/>

			<Nav {...props}>
				<Header path={props.location.pathname} />
			</Nav>

			{props.children()}
		</Fragment>
	)
}

export default BaseLayout
