import React, { Component } from 'react'
import { fbAppId, googleClientId } from 'config'
import { modalHide, socialLoginPrepare, socialLoginRequest } from 'store/actions'

import { LoginModal } from 'components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fromSocial } from 'store/selectors'

class LoginModalContainer extends Component {
  static propTypes = {
    prepareGoogle: PropTypes.func.isRequired,
    prepareFacebook: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.prepareGoogle()
    this.props.prepareFacebook()
  }

  render() {
    return <LoginModal {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  user: fromSocial.getUser(state),
})

const mapDispatchToProps = (dispatch) => ({
  prepareGoogle: () => dispatch(socialLoginPrepare('google', { client_id: googleClientId })),
  prepareFacebook: () => dispatch(socialLoginPrepare('facebook', { appId: fbAppId })),
  onFacebookLogin: () => dispatch(socialLoginRequest('facebook')),
  onGoogleLogin: () => dispatch(socialLoginRequest('google')),
  onClose: () => dispatch(modalHide('login')),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginModalContainer)
