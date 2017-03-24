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
      company: '',
      description: '',
      owner: '',
      status: '',
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
  boothClick(num, i, company, description, owner, status) {
    this.setState({
      activeBooth: num,
      modalOpen: true,
      boothIndex: i,
      company,
      description,
      owner,
      status,
    })
  }
  handleSubmit = (values) => {
    const setCompany = values.status === 'n/a' ? 'N/A' : values.company
    const booths = this.state.booths
    booths[this.state.boothIndex] = Object.assign({}, booths[this.state.boothIndex], {
      company: setCompany,
      description: values.description,
      owner: values.owner,
      status: values.status,
    })
    this.setState({
      modalOpen: false,
      booths,
    })
  }
  render() {
    const dim = this.state.dimension
    const screenWidth = this.state.screenWidth
    const floorPlanWidth = this.state.columns * dim
    const shiftRight = (screenWidth - floorPlanWidth) / 2
    return (
      <Wrapper opaque {...this.props}>
        <Modal
          title={`Editing Booth ${this.state.activeBooth}`}
          isOpen={this.state.modalOpen}
          closeable
          onClose={() => this.setState({ modalOpen: false })}
        >
          <BoothForm
            onSubmit={this.handleSubmit}
            boothNum={this.state.activeBooth}
            company={this.state.company}
            description={this.state.description}
            owner={this.state.owner}
            status={this.state.status}
          />
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
                  co={booth.company}
                  description={booth.description}
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
                  co={booth.company}
                  owner={booth.owner}
                  status={booth.status}
                  description={booth.description}
                />
              </div>
            )
          })}
        </section>
      </Wrapper>
    )
  }
}
