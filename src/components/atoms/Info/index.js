import React, { PropTypes } from 'react'
import styled from 'styled-components'

const BoothNum = styled.h3`
  color: black;
  font-size: 1em;
  margin: 0;
`

const BoothCo = styled.p`
  color: black;
  font-size: .8em;
  margin: 0;
`

const Info = ({ num, co }) => {
  return (
    <div>
      <BoothNum>{ num }</BoothNum>
      <BoothCo>{ co }</BoothCo>
    </div>
  )
}

Info.propTypes = {
  num: PropTypes.number,
  co: PropTypes.string,
}

export default Info
