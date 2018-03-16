// import { Block, Button, FilterBtn, PrintBtn, Modal } from 'components'
import { Button } from 'components/atoms'

import PropTypes from 'prop-types'
import React from 'react'
// import { UserButton } from 'containers'
import styled from 'styled-components'
import { doSignIn } from 'firebase-db/auth'

// const Wrapper = styled(Block)`
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   padding: 1rem;

//   & > :not(:first-child) {
//     margin-left: 1rem;
//   }
// `

// const Header = props => {
//   return (
//     <Wrapper opaque reverse {...props}>
//       <PrintBtn />
//       <FilterBtn filter={props.filter} />
//       {/* <UserButton reverse transparent /> */}
//       <Button onClick={doSignIn}>Sign In</Button>
//     </Wrapper>
//   )
// }

const Header = props => {
  return <Button onClick={doSignIn}>Sign In</Button>
}

Header.propTypes = {
  filter: PropTypes.func,
}

export default Header
