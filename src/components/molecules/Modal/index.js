import React from 'react'
import ReactModal from 'react-modal'
import { Button } from 'components/atoms'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

export default ({ modalIsOpen, children, closeModal, title }) => (
  <ReactModal
    ariaHideApp={false}
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    style={customStyles}
  >
    <h3>Editing Booth {title}</h3>

    <Button onClick={closeModal}>close</Button>

    {children}
  </ReactModal>
)
