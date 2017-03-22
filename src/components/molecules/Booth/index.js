import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { Info } from 'components'

const Wrapper = styled.div`
  display: inline-block;
  position: absolute;
  background-color: ${props => props.status === 'open' ? 'yellow' : 'white'};
  width: ${props => props.type === 'double' ? props.dim * 2 : props.dim}px;
  height: ${props => props.dim}px;
  border: 1px solid black;
  overflow: hidden;
  transform: translate(${props => props.x}px, ${props => props.y}px);
`

const Booth = ({ num, co, type, x, y, dim, status, tip }) => {
  return (
    <Wrapper type={type} status={status} x={x} y={y} dim={dim} >
      <Info num={num} co={co} status={status} tip={tip} />
    </Wrapper>
  )
}

Booth.propTypes = {
  num: PropTypes.number,
  co: PropTypes.string,
  type: PropTypes.string,
  status: PropTypes.string,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  dim: PropTypes.number.isRequired,
  tip: PropTypes.string.isRequired,
}

export default Booth
