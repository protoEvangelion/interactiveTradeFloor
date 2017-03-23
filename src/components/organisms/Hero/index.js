import React, { Component } from 'react'
import styled from 'styled-components'
import { Booth, Tooltip, Modal, BoothForm } from 'components'

const Wrapper = styled.div`
  position: relative;
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
  }
  render() {
    const dim = this.state.dimension
    const screenWidth = this.state.screenWidth
    const floorPlanWidth = this.state.columns * dim
    const shiftRight = (screenWidth - floorPlanWidth) / 2
    return (
      <Wrapper opaque {...this.props}>
        <Modal isOpen onClose={() => console.log('hellow')} title="Edit Booth Below" >
          <BoothForm />
        </Modal>
        <div id="floorPlan" >
          { this.state.booths.map(booth => {
            return (
              <div key={`ctn_${booth._id}`}>
                <Booth
                  tip={`tool_${booth._id}`}
                  key={booth._id}
                  num={booth.num}
                  co={booth.co}
                  row={booth.row}
                  col={booth.col}
                  x={(booth.col * dim) + shiftRight}
                  y={(booth.row * dim)}
                  dim={dim}
                  status={booth.status}
                  type={booth.type}
                  owner={booth.owner}
                />
                <Tooltip
                  _id={booth._id}
                  co={booth.co}
                  owner={booth.owner}
                  status={booth.status}
                  description={booth.desc}
                />
              </div>
            )
          })}
        </div>
      </Wrapper>
    )
  }
}
