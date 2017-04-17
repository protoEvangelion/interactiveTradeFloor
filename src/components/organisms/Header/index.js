import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { FilterBtn, PrintBtn, Block } from 'components'
import { UserButton } from 'containers'

const Wrapper = styled(Block)`
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
