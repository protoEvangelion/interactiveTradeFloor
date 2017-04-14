import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { Info, StatusCircle } from 'components'

export const determineColor = (filter, owner, status) => {
  if ((filter !== 'None' && filter !== owner) || status === 'open' || status === 'n/a') {
    return 'black'
  } else if (owner === 'Todd') {
    return 'rgb(0, 178, 14)' // green
  } else if (owner === 'Richard') {
    return 'rgb(8, 0, 255)' // blue
  } else if (owner === 'Ryan') {
    return 'rgb(255, 0, 170)' // pink
  }
  return 'black'
}

export const determineY = (y, row) => {
  return y + (row * 3.1)
}

export const determineX = (x, col, type, dim) => {
  switch (type) {
    case 'ptArena1':
      return (x - 5) - (dim * 2)
    default:
      return x + (col * 3.1)
  }
}

export const determineWidth = (type, dim) => {
  switch (type) {
    case 'double':
      return `${(dim * 2) + 3}px`
    case 'AOABooth':
      return `${(dim * 5) + 10}px`
    case 'Seminar':
      return `${(dim * 9) + 25}px`
    case 'ptArena1':
      return `${(dim * 4) + 10}px`
    case 'ptArena2':
      return `${(dim * 4) + 10}px`
    default:
      return `${dim}px`
  }
}

export const determineHeight = (type, dim) => {
  switch (type) {
    case 'AOABooth':
      return `${(dim * 3) + 6}px`
    case 'Seminar':
      return `${(dim * 6) + 15}px`
    case 'ptArena1':
      return `${(dim * 3) + 6}px`
    case 'ptArena2':
      return `${(dim * 3) + 6}px`
    default:
      return `${dim}px`
  }
}

const Wrapper = styled.div`
  display: inline-block;
  cursor: pointer;
  position: absolute;
  background-color: ${props => props.status === 'open' ? 'yellow' : 'white'};
  width: ${props => determineWidth(props.type, props.dim)};
  height: ${props => determineHeight(props.type, props.dim)};
  border: 2px solid ${props => determineColor(props.filter, props.owner, props.status)};
  overflow: hidden;
  transform: translate(${props => determineX(props.x, props.col, props.type, props.dim)}px, ${props => determineY(props.y, props.row)}px);
`

const Booth = ({ onClick, num, filter, i, co, description, type, owner, row, col, x, y, dim, status, tip }) => {
  return (
    <Wrapper
      className="boothCtn"
      onClick={() => onClick(num, i, co, description, owner, status)}
      value={num}
      type={type}
      filter={filter}
      owner={owner}
      status={status}
      row={row}
      col={col}
      x={x}
      y={y}
      dim={dim}
    >
      <Info num={num} co={co} status={status} tip={tip} />
      <StatusCircle filter={filter} owner={owner} status={status} />
    </Wrapper>
  )
}

Booth.propTypes = {
  onClick: PropTypes.func.isRequired,
  num: PropTypes.number,
  filter: PropTypes.string,
  i: PropTypes.number,
  co: PropTypes.string,
  description: PropTypes.string,
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
