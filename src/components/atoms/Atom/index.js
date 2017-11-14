import { font, palette } from 'styled-theme'

import PropTypes from 'prop-types'
import styled from 'styled-components'

const Atom = styled.span`
  font-family: ${font('primary')};
  color: ${palette({ grayscale: 0 }, 1)};
`

Atom.propTypes = {
  palette: PropTypes.string,
  reverse: PropTypes.bool,
}

Atom.defaultProps = {
  palette: 'grayscale',
}

export default Atom
