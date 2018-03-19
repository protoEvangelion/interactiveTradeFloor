import { Button } from 'components/atoms'
import { Header } from 'components/organisms'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { palette } from 'styled-theme'
import styled from 'styled-components'
import { doSignIn } from 'firebase-db/auth'

import './base.css'

const Nav = styled.nav`
  display: flex;
  list-style: none;
  > :not(:first-child) {
    margin-left: 1rem;
  }
  a {
    font-weight: 300;
    color: ${palette('grayscale', 2)};
    font-size: 1.25rem;
    &.active {
      color: ${palette('grayscale', 0)};
    }
  }
`

export default props => {
  return (
    <Fragment>
      <Nav {...props}>
        <Header />
      </Nav>

      {props.children()}
    </Fragment>
  )
}
