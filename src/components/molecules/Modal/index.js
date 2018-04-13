import React from 'react'
import ReactModal from 'react-modal'
import { Button } from 'components/atoms'
import styled from 'styled-components'

const HeadingWrapper = styled.div`
	align-items: center;
	display: flex;
	justify-content: space-between;
`

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		minWidth: '300px',
		transform: 'translate(-50%, -50%)',
	},
}

const Modal = ({ modalIsOpen, children, closeModal, title }) => (
	<ReactModal
		ariaHideApp={false}
		isOpen={modalIsOpen}
		onRequestClose={closeModal}
		style={customStyles}
	>
		<HeadingWrapper>
			{title && <h3>{title}</h3>}

			<Button onClick={closeModal} palette="white" transparent>
				X
			</Button>
		</HeadingWrapper>

		{children}
	</ReactModal>
)

export default Modal
