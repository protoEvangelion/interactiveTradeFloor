// import { Block, Button, FilterBtn, PrintBtn, Modal } from 'components'
import { Block, Button, Link } from 'components/atoms'
import { FilterBtn } from 'components/molecules'

import PropTypes from 'prop-types'
import React from 'react'
// import { UserButton } from 'containers'
import styled from 'styled-components'
import { doSignIn } from 'firebase-db/auth'

const Wrapper = styled(Block)`
	display: flex;
	justify-content: space-around;
	align-items: center;
	padding: 1rem;
	width: 100%;

	& > :not(:first-child) {
		margin-left: 1rem;
	}
`

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
	return (
		<Wrapper opaque reverse {...props}>
			<Link to="/">Home</Link>
			<Link to="/la">LA</Link>
			<Link to="/lb">LB</Link>
			<FilterBtn />
			<Button onClick={doSignIn}>Sign In</Button>
		</Wrapper>
	)
}

Header.propTypes = {
	filter: PropTypes.func,
}

export default Header
