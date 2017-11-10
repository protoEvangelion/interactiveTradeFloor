import { ConfirmModal } from 'components'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { modalHide } from 'store/actions'

const ConfirmModalContainer = props => <ConfirmModal {...props} />

ConfirmModalContainer.propTypes = {
  name: PropTypes.string.isRequired,
}

const mapDispatchToProps = (dispatch, { name }) => ({
  onClose: () => dispatch(modalHide(name)),
})

export default connect(undefined, mapDispatchToProps)(ConfirmModalContainer)
