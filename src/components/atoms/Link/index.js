import { font, palette } from 'styled-theme'
import styled, { css } from 'styled-components'

import PropTypes from 'prop-types'
import React from 'react'
import RouterLink from 'gatsby-link'

const styles = css`
	color: white;
	font-family: ${font('primary')};
	font-weight: 500;
	text-decoration: none;
	transition: color 0.5s;

	&:hover {
		color: ${palette({ grayscale: 0 }, 1)};
		transition: color 0.5s;
	}
`

const StyledLink = styled(({ theme, reverse, palette, ...props }) => (
	<RouterLink {...props} />
))`
	${styles};
`
const Anchor = styled.a`
	${styles};
`

const Link = ({ ...props }) => {
	if (props.to) {
		return <StyledLink {...props} />
	}
	return <Anchor {...props} />
}

Link.propTypes = {
	palette: PropTypes.string,
	reverse: PropTypes.bool,
	to: PropTypes.string,
}

Link.defaultProps = {
	palette: 'white',
}

export default Link
