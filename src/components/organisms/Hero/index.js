import React, { Component } from 'react'
import styled from 'styled-components'
import { Booth, Tooltip, Modal } from 'components'
import { BoothForm } from 'containers'

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
      activeBooth: 0,
      boothIndex: 0,
      modalOpen: false,
    }
    this.boothClick = this.boothClick.bind(this)
  }
  componentDidMount() {
    this.setState({
      booths: window.__INITIAL_STATE__.booths,
      screenWidth: window.innerWidth,
    })
  }
  boothClick(num, i) {
    console.log('num', num, i)
    this.setState({
      activeBooth: num,
      modalOpen: true,
      boothIndex: i,
    })
  }
  handleSubmit = (values) => {
    const booths = this.state.booths
    booths[this.state.boothIndex] = Object.assign({}, booths[this.state.boothIndex], {
      co: values.company,
      desc: values.description,
      owner: values.owner,
      status: values.status,
    })
    this.setState({
      modalOpen: false,
      booths,
    })
    console.log(values)
  }
  render() {
    const dim = this.state.dimension
    const screenWidth = this.state.screenWidth
    const floorPlanWidth = this.state.columns * dim
    const shiftRight = (screenWidth - floorPlanWidth) / 2
    return (
      <Wrapper opaque {...this.props}>
        <Modal isOpen={this.state.modalOpen} onClose={() => console.log('hellow')}>
          <BoothForm onSubmit={this.handleSubmit} boothNum={this.state.activeBooth} />
        </Modal>
        <section id="floorPlan" >
          { this.state.booths.map((booth, i) => {
            return (
              <div key={`ctn_${booth._id}`}>
                <Booth
                  onClick={this.boothClick}
                  i={i}
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
        </section>
      </Wrapper>
    )
  }
}
