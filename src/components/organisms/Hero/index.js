import React, { Component, PropTypes } from 'react'
import styled from 'styled-components'
import { Booth, Tooltip, Modal } from 'components'
import { BoothForm } from 'containers'
import axios from 'axios'

const logo = require('../../../../public/aoalogo.jpg')
const powertalk = require('../../../../public/powertalk.jpg')

const Logo = styled.img`
  transform: translate(${props => props.dim * 12}px, ${props => props.dim * 9}px);
`

const Powertalk1 = styled.img`
  transform: translate(-140px, ${props => props.dim * 8}px);
  width: 200px;
`

const Powertalk2 = styled.img`
  transform: translate(${props => props.dim * 10.8}px, ${props => props.dim * 8}px);
  width: 200px;
`

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 1600px;
`

export default class Hero extends Component {
  constructor(props) {
    super(props)
    this.state = {
      booths: [],
      email: false,
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
  email() {
    console.log('Emailing Teams')
    this.setState({ email: true })
  }
  handleSubmit = (values) => {
    const setCompany = values.status === 'n/a' ? 'N/A' : values.company
    console.log(values)

    if (this.state.email) {
      axios.get('/email', {
        params: {
          blank: '',
          num: this.state.activeBooth,
          company: values.company,
          owner: values.owner,
          status: values.status,
          description: values.description,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
    }

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
      email: false,
    })

    axios.put('/api/update', {
      data: {
        num: this.state.activeBooth,
        company: setCompany,
        owner: values.owner,
        status: values.status,
        description: values.description,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }
  render() {
    const dim = this.state.dimension
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
            email={() => this.email()}
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
                  filter={this.props.filter}
                  i={i}
                  tip={`tool_${booth._id}`}
                  key={booth._id}
                  num={booth.num}
                  co={booth.company}
                  description={booth.description}
                  row={booth.row}
                  col={booth.col}
                  x={(booth.col * dim) + (dim * 1.5)}
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
          <Logo src={logo} alt="AOA logo" dim={dim} />
          <Powertalk1 src={powertalk} alt="Power Talk 1" dim={dim} />
          <Powertalk2 src={powertalk} alt="Power Talk 2" dim={dim} />
        </section>
      </Wrapper>
    )
  }
}

Hero.propTypes = {
  filter: PropTypes.string,
}
