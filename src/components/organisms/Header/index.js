import { Block, FilterBtn, PrintBtn } from 'components'

import PropTypes from 'prop-types'
import React from 'react'
import { UserButton } from 'containers'
import styled from 'styled-components'

const Wrapper = styled(Block) `
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;

  & > :not(:first-child) {
    margin-left: 1rem;
  }
`

const Header = (props) => {
  return (
    <Wrapper opaque reverse {...props}>
      {/* <StyledIconLink to="/" icon="arc" height={100} /> */}
      <PrintBtn />
      <FilterBtn filter={props.filter} />
      {/* <StyledPrimaryNavigation reverse /> */}
      <UserButton reverse transparent />
    </Wrapper>
  )
}

Header.propTypes = {
  filter: PropTypes.func,
}

export default Header
