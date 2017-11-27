import { Info, StatusCircle } from 'components'

import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

export const determineColor = (filter, owner, status, colorMap) => {
  if ((filter !== 'None' && filter !== owner) || status === 'open' || status === 'n/a') {
    return 'black'
  }

  if (colorMap[owner]) {
    return colorMap[owner]
  }

  return 'black'
}

export const determineY = (y, row) => y + (row * 3.1)

export const determineX = (x, col) => x + (col * 3.1)

export const determineWidth = (type, dim) => {
  switch (type) {
    case 'double':
      return `${(dim * 2) + 3}px`
    default:
      return `${dim}px`
  }
}

export const determineHeight = (dim) => `${dim}px`

const Wrapper = styled.div`
  display: inline-block;
  cursor: pointer;
  position: absolute;
  background-color: ${props => props.status === 'open' ? 'yellow' : 'white'};
  width: ${props => determineWidth(props.type, props.dim)};
  height: ${props => determineHeight(props.dim)};
  border: 2px solid ${props => determineColor(props.filter, props.owner, props.status, props.colorMap)};
  overflow: hidden;
  transform: translate(${props => determineX(props.x, props.col)}px, ${props => determineY(props.y, props.row)}px);
`

const Booth = ({ boothClick, colorMap, num, filter, i, co, description, type, owner, row, col, x, y, dim, status, tip, path }) => {
  return (
    <Wrapper
      className="boothCtn"
      colorMap={colorMap}
      id={type}
      onClick={() => boothClick(num, i, co, description, owner, status)}
      value={num}
      type={type}
      filter={filter}
      owner={owner}
      path={path}
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
  boothClick: PropTypes.func.isRequired,
  co: PropTypes.string,
  col: PropTypes.number.isRequired,
  colorMap: PropTypes.object.isRequired,
  description: PropTypes.string,
  dim: PropTypes.number.isRequired,
  filter: PropTypes.string,
  i: PropTypes.number,
  num: PropTypes.number,
  owner: PropTypes.string,
  path: PropTypes.string.isRequired,
  row: PropTypes.number.isRequired,
  status: PropTypes.string,
  tip: PropTypes.string.isRequired,
  type: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
}

export default Booth
