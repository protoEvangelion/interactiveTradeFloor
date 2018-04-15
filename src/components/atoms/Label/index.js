import { font, palette } from 'styled-theme'

import PropTypes from 'prop-types'
import styled from 'styled-components'

const Label = styled.label`
	font-family: ${font('primary')};
	color: ${palette('grayscale', 4)};
	font-size: 1rem;
	line-height: 2em;
`

Label.propTypes = {
	reverse: PropTypes.bool,
}

export default Label
