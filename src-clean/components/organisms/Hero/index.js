import React, { Component, PropTypes } from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'
import { IconButton, Tooltip, Booth } from 'components'

const Wrapper = styled.div`
  display: block;
  margin: 20px;
`

const StyledIconButton = styled(IconButton)`
  flex: none;
`

export default class Hero extends Component {
  constructor(props) {
    super(props)
    this.state = {
      booths: [],
    }
  }
  componentWillMount() {
    this.setState({ booths: window.__INITIAL_STATE__.booths })
  }
  render() {
    return (
      <Wrapper opaque {...this.props}>
        { this.state.booths.map((booth) => {
          return <Booth key={booth.num} num={booth.num} co={booth.co} />
        })}
        <Tooltip data-title="Just a fancy tooltip 😊" reverse>
          <StyledIconButton
            icon="github"
            href="https://github.com/diegohaz/arc"
            height={50}
            transparent
            reverse
          >
            View on GitHub
          </StyledIconButton>
        </Tooltip>
      </Wrapper>
    )
  }
}

Hero.propTypes = {
  booths: PropTypes.array,
}
