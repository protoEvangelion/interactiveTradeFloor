import { connect } from 'react-redux'
import logo from './logo.png'

import toggleGrid from 'store/actions/toggleGrid'
import { Block, Button, Link } from 'components/atoms'
import { FilterBtn, Modal } from 'components/molecules'

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import { doSignIn, doSignOut } from 'firebase-db/auth'

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
	flex-grow: 0;
	margin-right: 0.5rem;
	height: 2.5rem;
	width: 2.5rem;
`

const Img = styled.img`
	height: 2.5rem;
	width: 2.5rem;
`

const UserContainer = styled.div`
	align-items: flex-start;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: 10rem;
`

class Header extends Component {
	constructor() {
		super()

		this.state = { modalIsOpen: false }

		this.toggleModal = this.toggleModal.bind(this)
	}
	toggleModal() {
		this.setState({ modalIsOpen: !this.state.modalIsOpen })
	}
	render() {
		const user = this.props.user

		if (user) {
			var { displayName, email, photo } = user
		}

		return (
			<Wrapper opaque reverse {...this.props}>
				<Link to="/">
					<Img alt="logo" src={logo} />
				</Link>

				<Link to="/la">LA</Link>

				<Link to="/lb">LB</Link>

				<FilterBtn />

				<Button onClick={this.props.toggleGrid} palette="success">
					#
				</Button>

				{user ? (
					<Avatar onClick={this.toggleModal} src={photo} />
				) : (
					<Button onClick={doSignIn}>Sign In</Button>
				)}

				{user && (
					<Modal
						closeModal={this.toggleModal}
						modalIsOpen={this.state.modalIsOpen}
						title="User Info:"
						opaque
						reverse
					>
						<UserContainer>
							<div style={{ alignItems: 'center', display: 'flex', margin: '1rem 0' }}>
								<Avatar src={photo} />
								<span>{displayName}</span>
							</div>

							<span style={{ marginBottom: '1rem' }}>{email}</span>

							<Button onClick={() => doSignOut()}>Sign Out</Button>
						</UserContainer>
					</Modal>
				)}
			</Wrapper>
		)
	}
}

Header.propTypes = {
	filter: PropTypes.func,
	toggleGrid: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps, { toggleGrid })(Header)
