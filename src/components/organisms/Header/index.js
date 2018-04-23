import { navigateTo } from 'gatsby-link'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { FLOORPLAN_PAGES, USER_NAMES } from 'appConfig'
import { Block, Button, Link } from 'components/atoms'
import { Modal } from 'components/molecules'
import { doSignIn, doSignOut } from 'firebase-db/auth'
import toggleGrid from 'store/actions/toggleGrid'
import loadBooths from 'store/actions/loadBooths'
import setFilter from 'store/actions/setFilter'

import logo from './logo.png'

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

const Select = styled.select`
	height: 100%;
`

const UserContainer = styled.div`
	align-items: flex-start;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: 10rem;
`

class Header extends Component {
	constructor(props) {
		super(props)

		let activeSelectOption = ''

		FLOORPLAN_PAGES.map(page => {
			if (props.path == page.path) {
				activeSelectOption = page.path
			}
		})

		this.state = {
			modalIsOpen: false,
			activeFilterOption: 'None',
			activeSelectOption,
		}

		this.handleFilterChange = this.handleFilterChange.bind(this)
		this.handleFloorplanChange = this.handleFloorplanChange.bind(this)
		this.toggleModal = this.toggleModal.bind(this)
	}
	handleFilterChange(e) {
		this.props.setFilter(e.target.value)

		this.setState({ activeFilterOption: e.target.value })
	}
	handleFloorplanChange(e) {
		console.log('Select changed', e.target.value)

		// Purge booths before rerouting
		this.props.loadBooths(null)

		navigateTo(e.target.value)

		this.setState({
			activeSelectOption: e.target.value,
		})
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

				<Select
					value={this.state.activeSelectOption}
					onChange={this.handleFloorplanChange}
				>
					{FLOORPLAN_PAGES.map(page => (
						<option key={page.path} value={page.path}>
							{page.name}
						</option>
					))}
				</Select>

				<Select value={this.state.activeFilterOption} onChange={this.handleFilterChange}>
					<option value="None">No Filter</option>

					{USER_NAMES.map(user => (
						<option key={user} value={user}>
							{user}
						</option>
					))}
				</Select>

				<Button onClick={this.props.toggleGrid} palette="primary" transparent>
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
	path: PropTypes.string.isRequired,
	toggleGrid: PropTypes.func.isRequired,
	setFilter: PropTypes.func.isRequired,
	loadBooths: PropTypes.func.isRequired,
	user: PropTypes.object,
}

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps, { loadBooths, setFilter, toggleGrid })(Header)
