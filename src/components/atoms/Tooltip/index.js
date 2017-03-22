import React, { PropTypes } from 'react'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'

const TooltipText = styled.p`
`

const Tooltip = ({ _id, co, owner, status, description }) => {
  return (
    <ReactTooltip id={`tool_${_id}`} type="info" effect="solid" >
      <TooltipText key={`span_${_id}`} >
        Co: {status === 'open' ? 'open' : co}<br />
        {status === 'open' ? '' : `Owner: ${owner}`}<br />
        {status === 'open' ? '' : `Info: ${description}`}
      </TooltipText>
    </ReactTooltip>
  )
}

Tooltip.propTypes = {
  _id: PropTypes.string,
  co: PropTypes.string,
  owner: PropTypes.string,
  status: PropTypes.string,
  description: PropTypes.string,
}

export default Tooltip
