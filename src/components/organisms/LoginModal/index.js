import React, { Component } from 'react'

import { IconButton } from 'components'
import { Modal } from 'containers'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    margin-bottom: 0.5rem;
  }
`

class LoginModal extends Component {
  static propTypes = {
    user: PropTypes.object,
    onFacebookLogin: PropTypes.func.isRequired,
    onGoogleLogin: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    this.props.onClose()
  }

  render() {
    const { onFacebookLogin, onGoogleLogin, ...props } = this.props
    return (
      <Modal title="Login" name="login" closeable {...props}>
        <Wrapper>
          <IconButton onClick={onFacebookLogin} icon="facebook">Connect with Facebook</IconButton>
          <IconButton onClick={onGoogleLogin} icon="google">Connect with Google</IconButton>
        </Wrapper>
      </Modal>
    )
  }
}

export default LoginModal
