import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { Info, StatusCircle } from 'components'

const determineColor = (owner) => {
  if (owner === 'Todd') {
    return 'rgb(0, 178, 14)' // green
  } else if (owner === 'Richard') {
    return 'rgb(0, 85, 221)' // blue
  } else if (owner === 'Ryan') {
    return 'rgb(221, 0, 0)' // purple
  }
  return 'black'
}

const determineY = (y, row) => {
  return y + (row * 4)
}

const determineX = (x, col) => {
  return x + (col * 3)
}

const Wrapper = styled.div`
  display: inline-block;
  cursor: pointer;
  position: absolute;
  background-color: ${props => props.status === 'open' ? 'yellow' : 'white'};
  width: ${props => props.type === 'double' ? (props.dim * 2) + 3 : props.dim}px;
  height: ${props => props.dim}px;
  border: 2px solid ${props => determineColor(props.owner)};
  overflow: hidden;
  transform: translate(${props => determineX(props.x, props.col)}px, ${props => determineY(props.y, props.row)}px);
`

const Booth = ({ onClick, num, i, co, type, owner, row, col, x, y, dim, status, tip }) => {
  return (
    <Wrapper onClick={() => onClick(num, i)} value={num} type={type} owner={owner} status={status} row={row} col={col} x={x} y={y} dim={dim} >
      <Info num={num} co={co} status={status} tip={tip} />
      <StatusCircle status={status} />
    </Wrapper>
  )
}

Booth.propTypes = {
  onClick: PropTypes.func.isRequired,
  num: PropTypes.number,
  i: PropTypes.number,
  co: PropTypes.string,
  type: PropTypes.string,
  owner: PropTypes.string,
  status: PropTypes.string,
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  dim: PropTypes.number.isRequired,
  tip: PropTypes.string.isRequired,
}

export default Booth
