import { font, palette } from 'styled-theme'

import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

const Organism = (props) => {
  return (
    <Wrapper {...props}>content</Wrapper>
  )
}

Organism.propTypes = {
  reverse: PropTypes.bool,
}

export default Organism
