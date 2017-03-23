import { PropTypes } from 'react'
import styled from 'styled-components'

const determineColor = (status) => {
  if (status === 'open') {
    return 'red'
  }
  return ''
}

const StatusCircle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  top: 5px;
  left: 2px;
  position: absolute;
  background-color: ${props => determineColor(props.status)};
`

StatusCircle.propTypes = {
  status: PropTypes.string,
}

export default StatusCircle
