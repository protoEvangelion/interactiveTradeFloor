import React, { Component, Fragment } from 'react'
import { getBooths } from 'firebase-db/db'
import { connect } from 'react-redux'

import { Booth, Modal } from 'components/molecules'
import preload from 'store/actions/preload'
import loadBooths from 'store/actions/loadBooths'
import { COLOR_MAP } from 'constants'

class Floorplan extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeBooth: 0,
      boothIndex: 0,
      colorMap: COLOR_MAP,
      columns: 20,
      company: '',
      description: '',
      dimension: 55,
      email: false,
      leftMargin: 35,
      modalIsOpen: false,
      owner: '',
      status: '',
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }
  async componentDidMount() {
    console.log('======> DID mount')

    const booths = await getBooths('la')

    this.props.loadBooths(booths)

    this.props.preload(false)
  }

  openModal() {
    this.setState({ modalIsOpen: true })
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  renderBooths() {
    if (!this.props.isPreloading && this.props.booths) {
      return this.props.booths.map((booth, i) => {
        return (
          <Fragment key={`ctn_${booth._id}`}>
            <Booth
              _id={booth._id}
              boothClick={this.openModal}
              co={booth.company}
              col={booth.col}
              colorMap={this.state.colorMap}
              description={booth.description}
              dim={this.state.dimension}
              filter={this.props.filter}
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
          </Fragment>
        )
      })
    }
  }
  render() {
    return (
      <section>
        {this.renderBooths()}

        <Modal
          closeModal={this.closeModal}
          modalIsOpen={this.state.modalIsOpen}
        >
          Hello
        </Modal>
      </section>
    )
  }
}

const mapStateToProps = state => ({
  booths: state.booths,
  filter: state.filter,
  isPreloading: state.isPreloading,
})

export default connect(mapStateToProps, { preload, loadBooths })(Floorplan)
