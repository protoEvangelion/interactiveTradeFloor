import { font, palette } from 'styled-theme'

import PropTypes from 'prop-types'
import { ifProp } from 'styled-tools'
import styled from 'styled-components'

const Block = styled.div`
	font-family: ${font('primary')};
	background-color: ${ifProp('opaque', palette(0, true), 'transparent')};
	color: ${palette({ grayscale: 0 }, 1)};
`

Block.propTypes = {
	palette: PropTypes.string,
	reverse: PropTypes.bool,
	opaque: PropTypes.bool,
}

Block.defaultProps = {
	palette: 'grayscale',
}

export default Block
