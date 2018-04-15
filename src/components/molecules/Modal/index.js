import React from 'react'
import ReactModal from 'react-modal'
import { Block, Button } from 'components/atoms'

import styled from 'styled-components'

const HeadingWrapper = styled.div`
	align-items: center;
	display: flex;
	justify-content: space-between;
`

const customStyles = {
	content: {
		backgroundColor: '#212121',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		minWidth: '300px',
		padding: '2rem',
		transform: 'translate(-50%, -50%)',
	},
}

const Modal = ({ opaque, reverse, modalIsOpen, children, closeModal, title }) => (
	<ReactModal
		ariaHideApp={false}
		isOpen={modalIsOpen}
		onRequestClose={closeModal}
		style={customStyles}
	>
		<Block opaque reverse>
			<HeadingWrapper>
				{title && <h3>{title}</h3>}

				<Button onClick={closeModal} palette="grayscale">
					X
				</Button>
			</HeadingWrapper>

			{children}
		</Block>
	</ReactModal>
)

export default Modal
