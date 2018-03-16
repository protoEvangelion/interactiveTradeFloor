import React, { Component } from 'react'
import Tooltip from 'react-tooltip'
import { getBooths } from 'firebase-db/db'
import { connect } from 'react-redux'

import { Booth } from 'components/molecules'
import preload from 'store/actions/preload'
import loadBooths from 'store/actions/loadBooths'

class Floorplan extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeBooth: 0,
      boothIndex: 0,
      columns: 20,
      company: '',
      description: '',
      dimension: 55,
      email: false,
      leftMargin: 35,
      modalOpen: false,
      owner: '',
      status: '',
    }
  }
  async componentDidMount() {
    console.log('======> DID mount')

    const booths = await getBooths('la')

    this.props.loadBooths(booths)

    this.props.preload(false)
  }

  renderBooths() {
    if (!this.props.isPreloading && this.props.booths) {
      return this.props.booths.map((booth, i) => {
        return (
          <div key={`ctn_${booth._id}`}>
            <Booth
              co={booth.company}
              col={booth.col}
              colorMap={this.props.colorMap}
              description={booth.description}
              dim={this.state.dimension}
              i={i}
              key={booth._id}
              num={booth.num}
              owner={booth.owner}
              row={booth.row}
              status={booth.status}
              tip={`tool_${booth._id}`}
              type={booth.type}
              x={booth.col * this.state.dimension + this.state.leftMargin}
              y={booth.row * this.state.dimension}
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
      })
    }
  }
  render() {
    return <div>{this.renderBooths()}</div>
  }
}

const mapStateToProps = state => ({
  booths: state.booths,
  isPreloading: state.isPreloading,
})

export default connect(mapStateToProps, { preload, loadBooths })(Floorplan)
