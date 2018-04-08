import { connect } from 'react-redux'
import toggleGrid from 'store/actions/toggleGrid'
import { Block, Button, Link } from 'components/atoms'
import { FilterBtn } from 'components/molecules'

import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { doSignIn } from 'firebase-db/auth'

const Wrapper = styled(Block)`
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 1rem;
	width: 100%;

	& > :not(:first-child) {
		margin-left: 1rem;
	}
`

const Header = props => {
	return (
		<Wrapper opaque reverse {...props}>
			<Link to="/">Home</Link>

			<Link to="/la">LA</Link>

			<Link to="/lb">LB</Link>

			<FilterBtn />

			<Button onClick={props.toggleGrid} palette="success">
				#
			</Button>

			<Button onClick={doSignIn}>Sign In</Button>
		</Wrapper>
	)
}

Header.propTypes = {
	filter: PropTypes.func,
	toggleGrid: PropTypes.func.isRequired,
}

export default connect(null, { toggleGrid })(Header)
