import axios from 'axios'
import React, { Component } from 'react'
import styled from 'styled-components'

import { Block, IconButton, Tooltip, Booth } from 'components'

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
    axios.get('/api/read')
      .then(res => this.setState({ booths: res.data }))
      .catch(err => console.log(err))
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
