import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { palette } from 'styled-theme'

const Wrapper = styled.div`
  background-color: ${({ authenticated }) => {
    return palette(authenticated ? 'success' : 'danger', 3)
  }};
  border-width: 2px;
  border-style: solid;
  border-radius: 5px;
  border-color: ${({ authenticated }) => {
    return palette(authenticated ? 'success' : 'danger', 1)
  }};
  height: auto;
  width: auto;
  max-width: 80%;
  text-align: center;
  margin: 50px auto 0 auto;
  padding: 10px;
`

const Message = ({ authenticated }) => {
  const text = authenticated
    ? 'You have been successfully authorized to use this app. Data will be saved 😎'
    : 'You must be signed in AND be an authorized user to save data with this app 🙀.  Although the changes you make will not persist to the database, they will show up temporarily.'

  return (
    <Wrapper authenticated={authenticated} >
      {text}
    </Wrapper>
  )
}

Message.propTypes = {
  authenticated: PropTypes.bool.isRequired,
}

export default Message
