import { Button } from 'components'
import { LoginModal } from 'containers'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const InnerButton = styled.div`
  display: flex;
  align-items: center;
`

const Image = styled.img`
  margin-right: 0.5rem;
  border-radius: 50%;
`

const UserButton = ({ authenticated, user, onLogin, onLogout, ...props }) => {
  return (
    <div>
      {authenticated &&
        <Button {...props} onClick={onLogout}>
          <InnerButton>
            <Image src={user.picture} width={25} height={25} />
            Sign out
          </InnerButton>
        </Button>
      }
      {/* istanbul ignore next */ !authenticated && <Button {...props} onClick={onLogin}>Sign in</Button>}
      <LoginModal />
    </div>
  )
}

UserButton.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    picture: PropTypes.string.isRequired,
  }),
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
}

export default UserButton
