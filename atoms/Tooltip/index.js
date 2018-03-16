import PropTypes from 'prop-types'
import React from 'react'
import ReactTooltip from 'react-tooltip'

const Tooltip = ({ _id, co, owner, status, description }) => {
  const renderText = () => {
    return status === 'open' || status === 'n/a'
      ? (
        <p key={`span_${_id}`} >
          Status: {status}
        </p>
      )
      : (
        <table key={`span_${_id}`}>
          <tbody>
            <tr>
              <td><strong>Co:</strong></td>
              <td style={{ paddingLeft: '10px' }}>{co}</td>
            </tr>
            <tr>
              <td><strong>Owner:</strong></td>
              <td style={{ paddingLeft: '10px' }}>{owner}</td>
            </tr>
            <tr>
              <td><strong>Status:</strong></td>
              <td style={{ paddingLeft: '10px' }}>{status}</td>
            </tr>
            <tr>
              <td><strong>Info:</strong></td>
              <td style={{ paddingLeft: '10px' }}>{description}</td>
            </tr>
          </tbody>
        </table>
      )
  }
  return (
    <ReactTooltip
      id={`tool_${_id}`}
      type="info"
      effect="solid"
      style={{ opacity: 1 }}
    >
      {renderText()}
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
