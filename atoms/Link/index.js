import { font, palette } from 'styled-theme'
import styled, { css } from 'styled-components'

import PropTypes from 'prop-types'
import React from 'react'
import { Link as RouterLink } from 'react-router'

const styles = css`
  font-family: ${font('primary')};
  text-decoration: none;
  font-weight: 500;
  color: ${palette({ grayscale: 0 }, 1)};

  &:hover {
    text-decoration: underline;
  }
`

const StyledLink = styled(({ theme, reverse, palette, ...props }) =>
  <RouterLink {...props} />
) `${styles}`
const Anchor = styled.a`${styles}`

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
  palette: 'primary',
}

export default Link
