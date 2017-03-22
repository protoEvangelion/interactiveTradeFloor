import React, { Component } from 'react'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'
import { Booth } from 'components'

const Wrapper = styled.div`
  margin-bottom: 1500px;
`

export default class Hero extends Component {
  constructor(props) {
    super(props)
    this.state = {
      booths: [],
      dimension: 55,
      columns: 20,
      screenWidth: 1000,
    }
  }
  componentDidMount() {
    this.setState({
      booths: window.__INITIAL_STATE__.booths,
      screenWidth: window.innerWidth,
    })
    // floorPlan.selectAll('rect').data(booths)
    //   .enter().append('rect')
    //   .style('fill', 'white')
    //   .attr('stroke-width', 2)
    //   .attr('stroke', 'black')
    //   .attr('x', d => {
    //     if (d.type === 'single' || d.type === 'double' || d.type === 'ptArena2') {
    //       return boothDimension * d.col
    //     } else if (d.type === 'ptArena1') {
    //       return (boothDimension * d.col) - boothDimension
    //     return boothDimension * d.col
    //   })
    //   .attr('y', d => boothDimension * d.row)
    //   .attr('width', d => {
    //     if (d.type === 'single') {
    //       return boothDimension
    //     } else if (d.type === 'double') {
    //       return boothDimension * 2
    //     } else if (d.type === 'ptArena1') {
    //       return boothDimension * 3
    //     } else if (d.type === 'ptArena2') {
    //       return boothDimension * 4
    //     }
    //     return boothDimension
    //   })
    //   .attr('height', d => {
    //     if (d.type === 'single' || d.type === 'double') {
    //       return boothDimension
    //     } else if (d.type === 'ptArena1' || d.type === 'ptArena2') {
    //       return boothDimension * 3
    //     }
    //     return boothDimension
    //   })

    // // append booth numbers
    // const textStart = floorPlan.selectAll('text').data(booths)

    // textStart.enter().append('text')
    //   .attr('x', d => {
    //     const xPos = (boothDimension * d.col) + 25
    //     return d.type === 'double' ? xPos + 35 : xPos
    //   })
    //   .attr('y', d => (boothDimension * d.row) + 20)
    //   .text(d => d.num)

    // // append descriptions
    // textStart.enter().append('text')
    //   .attr('class', 'boothText')
    //   .attr('x', d => {
    //     const xPos = (boothDimension * d.col) + 5
    //     if (d.type === 'single') {
    //       return xPos
    //     } else if (d.type === 'double') {
    //       return xPos
    //     } else if (d.type === 'ptArena1') {
    //       return xPos
    //     }
    //     return xPos
    //   })
    //   .attr('y', d => {
    //     if (d.type === 'single' || d.type === 'double') {
    //       return (boothDimension * d.row) + (boothDimension / 2)
    //     } else if (d.type === 'ptArena1' || d.type === 'ptArena2') {
    //       return (boothDimension * d.row) + (boothDimension / 2)
    //     }
    //     return (boothDimension * d.row) + 20
    //   })
    //   .text(d => {
    //     if (d.status === 'open') {
    //       return d.status
    //     } else if (d.type === 'single' || d.type === 'double') {
    //       return d.co
    //     } else if (d.type === 'ptArena1' || d.type === 'ptArena2') {
    //       return d.desc
    //     }
    //     return d.desc
    //   }
  }
  render() {
    const dim = this.state.dimension
    const screenWidth = this.state.screenWidth
    const floorPlanWidth = this.state.columns * dim
    const shiftRight = (screenWidth - floorPlanWidth) / 2
    return (
      <Wrapper opaque {...this.props}>
        <div id="floorPlan" >
          { this.state.booths.map(booth => {
            return (
              <div key={`ctn_${booth._id}`}>
                <Booth
                  tip={`tool_${booth._id}`}
                  key={booth._id}
                  num={booth.num}
                  co={booth.co}
                  x={(booth.col * dim) + shiftRight}
                  y={(booth.row * dim)}
                  dim={dim}
                  status={booth.status}
                  type={booth.type}
                />
                <ReactTooltip id={`tool_${booth._id}`} type="warning" effect="solid" >
                  <span key={`span_${booth._id}`} >
                    {booth.num}
                  </span>
                </ReactTooltip>
              </div>
            )
          })}
        </div>
      </Wrapper>
    )
  }
}
