import React, { PropTypes } from 'react'
import styled from 'styled-components'
// import { font, palette } from 'styled-theme'
import { Info } from 'components'

const Wrapper = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 1px solid black;
  overflow: hidden;
`

const Booth = ({ num, co }) => {
  return (
    <Wrapper>
      <Info num={num} co={co} />
    </Wrapper>
  )
}

Booth.propTypes = {
  num: PropTypes.number,
  co: PropTypes.string,
}

export default Booth
