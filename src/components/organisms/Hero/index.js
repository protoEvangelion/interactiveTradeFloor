import React, { Component } from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'
// import { IconButton, Tooltip, Booth } from 'components'

const Wrapper = styled.div`
  display: flex;
  margin: 20px;
  justify-content: center;
`

// const StyledIconButton = styled(IconButton)`
//   flex: none;
// `

export default class Hero extends Component {
  constructor(props) {
    super(props)
    this.state = {
      booths: [],
    }
  }
  componentDidMount() {
    const booths = window.__INITIAL_STATE__.booths
    const	boothDimension = 75
    const widthNeeded = boothDimension * 20 // number of columns
    const heightNeeded = boothDimension * 29 // number of rows
    const margin = {
      top: 0,
      right: 20,
      bottom: 60,
      left: 20,
    }
    const	width = widthNeeded + margin.left + margin.right
    const	height = heightNeeded + margin.top + margin.bottom

    const floorPlan = d3.select('#floorPlan').append('svg')
      .style('background-color', 'papayawhip')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('trasform', `translate(${margin.left}, ${margin.top})`)

    floorPlan.selectAll('rect').data(booths)
      .enter().append('rect')
      .style('fill', 'white')
      .attr('stroke-width', 2)
      .attr('stroke', 'black')
      .attr('x', d => {
        if (d.type === 'single' || d.type === 'double' || d.type === 'ptArena2') {
          return boothDimension * d.col
        } else if (d.type === 'ptArena1') {
          return (boothDimension * d.col) - boothDimension
        }
        return boothDimension * d.col
      })
      .attr('y', d => boothDimension * d.row)
      .attr('width', d => {
        if (d.type === 'single') {
          return boothDimension
        } else if (d.type === 'double') {
          return boothDimension * 2
        } else if (d.type === 'ptArena1') {
          return boothDimension * 3
        } else if (d.type === 'ptArena2') {
          return boothDimension * 4
        }
        return boothDimension
      })
      .attr('height', d => {
        if (d.type === 'single' || d.type === 'double') {
          return boothDimension
        } else if (d.type === 'ptArena1' || d.type === 'ptArena2') {
          return boothDimension * 3
        }
        return boothDimension
      })

    // append booth numbers
    const textStart = floorPlan.selectAll('text').data(booths)

    textStart.enter().append('text')
      .attr('x', d => {
        const xPos = (boothDimension * d.col) + 25
        return d.type === 'double' ? xPos + 35 : xPos
      })
      .attr('y', d => (boothDimension * d.row) + 20)
      .text(d => d.num)

    // append descriptions
    textStart.enter().append('text')
      .attr('x', d => {
        const xPos = (boothDimension * d.col) + 5
        if (d.type === 'single') {
          return xPos
        } else if (d.type === 'double') {
          return xPos
        } else if (d.type === 'ptArena1') {
          return xPos
        }
        return xPos
      })
      .attr('y', d => {
        if (d.type === 'single' || d.type === 'double') {
          return (boothDimension * d.row) + (boothDimension / 2)
        } else if (d.type === 'ptArena1' || d.type === 'ptArena2') {
          return (boothDimension * d.row) + (boothDimension / 2)
        }
        return (boothDimension * d.row) + 20
      })
      .text(d => {
        if (d.status === 'open') {
          return d.status
        } else if (d.type === 'single' || d.type === 'double') {
          return d.co
        } else if (d.type === 'ptArena1' || d.type === 'ptArena2') {
          return d.desc
        }
        return d.desc
      })
  }
  render() {
    return (
      <Wrapper opaque {...this.props}>
        {/* { this.state.booths.map((booth) => {
          return <Booth key={booth.num} num={booth.num} co={booth.co} />
        })} */}
        <div id="floorPlan" />
        {/* <Tooltip data-title="Just a fancy tooltip 😊" reverse>
          <StyledIconButton
            icon="github"
            href="https://github.com/diegohaz/arc"
            height={50}
            transparent
            reverse
          >
            View on GitHub
          </StyledIconButton>
        </Tooltip> */}
      </Wrapper>
    )
  }
}
