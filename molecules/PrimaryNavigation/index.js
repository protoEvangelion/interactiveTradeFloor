import { Link } from 'components'
import PropTypes from 'prop-types'
import React from 'react'
import { palette } from 'styled-theme'
import styled from 'styled-components'

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

const PrimaryNavigation = (props) => {
  return (
    <Nav {...props}>
      <li><Link to="/" onlyActiveOnIndex activeClassName="active">Home</Link></li>
      <li><Link to="/sample-page" activeClassName="active">Sample page</Link></li>
    </Nav>
  )
}

PrimaryNavigation.propTypes = {
  reverse: PropTypes.bool,
}

export default PrimaryNavigation
