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

const Avatar = styled.img`
	border-radius: 50%;
	cursor: pointer;
	width: 2.5rem;
`

const Header = props => {
	function renderSignInButton() {
		if (props.user) {
			if (props.user.photo) {
				return <Avatar src={props.user.photo} />
			}
		} else {
			return <Button onClick={doSignIn}>Sign In</Button>
		}
	}
	return (
		<Wrapper opaque reverse {...props}>
			<Link to="/">Home</Link>

			<Link to="/la">LA</Link>

			<Link to="/lb">LB</Link>

			<FilterBtn />

			<Button onClick={props.toggleGrid} palette="success">
				#
			</Button>

			{renderSignInButton()}
		</Wrapper>
	)
}

Header.propTypes = {
	filter: PropTypes.func,
	toggleGrid: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps, { toggleGrid })(Header)
