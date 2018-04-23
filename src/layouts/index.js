import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import { palette } from 'styled-theme'
import styled from 'styled-components'

import { Header } from 'components/organisms'

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
				title="Interactive Floor Plan"
				meta={[
					{
						name: 'description',
						content:
							'Interactive floorplan built with modern tools to maximize speed and ease of use',
					},
					{
						name: 'keywords',
						content:
							'gatsby, firebase, react, redux, floorplan, dynamic, interactive, es6, serverless',
					},
				]}
			>
				<link
					href="https://fonts.googleapis.com/css?family=Open+Sans:400,600"
					rel="stylesheet"
				/>
			</Helmet>

			<Nav {...props}>
				<Header path={props.location.pathname} />
			</Nav>

			{props.children()}
		</Fragment>
	)
}

BaseLayout.propTypes = {
	location: PropTypes.object,
	children: PropTypes.any,
}

export default BaseLayout
