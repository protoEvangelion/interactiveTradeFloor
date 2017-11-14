import { Booth, Message, Modal, Spinner, Tooltip } from 'components'
import React, { Component } from 'react'

import { BoothForm } from 'containers'
import PropTypes from 'prop-types'
import axios from 'axios'
import io from 'socket.io-client'
import styled from 'styled-components'

const logo = require('../../../../public/pictures/aoalogo.jpg')
const powertalk1 = require('../../../../public/pictures/arena1.jpg')
const powertalk2 = require('../../../../public/pictures/arena2.jpg')

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1600px;
`

const FloorplanCtn = styled.div`
  width: 1060px;
  margin-left: ${(props) => props.path === 'lb' ? -100 : 0}px;
`

const Logo = styled.img`
  transform: translate(${props => props.path === 'la' ? 440 : 610}px, ${props => props.dim * 9}px);
`

const Powertalk1 = styled.img`
  transform: translate(${props => props.path === 'la' ? -190 : -135}px, 500px);
  width: 100px;
`

const Powertalk2 = styled.img`
  transform: translate(${(props) => props.path === 'la' ? 695 : 700}px, 500px);
  width: 100px;
`

const StyledSpinner = styled(Spinner) `
  marginTop: 200px;
`

export default class Hero extends Component {
  static getBooths(w) {
    /* istanbul ignore else */
    if (w) {
      return w
    }
    /* istanbul ignore next */
    return window.__INITIAL_STATE__.booths
  }
  constructor(props) {
    super(props)

    this.state = {
      booths: [],
      email: false,
      leftMargin: 35,
      dimension: 55,
      columns: 20,
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
  componentWillMount() /* istanbul ignore next */ {
    const url = process.env.NODE_ENV
      ? 'https://aoatradeshow.herokuapp.com/'
      : 'https://localhost:3000'
    this.socket = io(url)
    this.socket.on('connect', () => {
      this.socket.on('save', (data) => {
        const booths = this.state.booths
        booths[data.index] = Object.assign({}, booths[data.index], data)

        this.setState({ booths })
      })
    })
  }
  componentDidMount() {
    this.props.checkAuth()
    const booths = process.env.NODE_ENV === 'test'
      ? Hero.getBooths(this.props.booths)
      : /* istanbul ignore next */ Hero.getBooths()
    this.setState({
      booths,
      path: this.props.path,
    })
  }
  /* istanbul ignore next */
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
  /* istanbul ignore next */
  email() {
    this.setState({ email: true })
  }
  handleSubmit /* istanbul ignore next */ = (values) => {
    const setCompany = values.status === 'n/a' ? 'N/A' : values.company
    const booths = this.state.booths

    const data = {
      num: this.state.activeBooth,
      company: setCompany,
      owner: values.owner,
      status: values.status,
      description: values.description,
      path: window.location.pathname,
    }

    booths[this.state.boothIndex] = Object.assign({}, booths[this.state.boothIndex], data)

    if (this.props.authenticated) {
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

      this.setState({
        modalOpen: false,
        booths,
        email: false,
      })

      axios.put('/api/update', { data })
        .then((res) => {
          data.index = this.state.boothIndex
          this.socket.emit('save', data)
          console.log(res)
        })
        .catch((err) => console.log(err))
    } else {
      this.setState({
        modalOpen: false,
        booths,
      })
    }
  }
  render() {
    const dim = this.state.dimension
    return (
      this.state.path
        ? (
          <Wrapper opaque {...this.props}>
            <Message authenticated={this.props.authenticated} />
            <Modal
              title={`Editing Booth ${this.state.activeBooth}`}
              isOpen={this.state.modalOpen}
              closeable
              onClose={/* istanbul ignore next */ () => this.setState({ modalOpen: false })}
            >
              <BoothForm
                onSubmit={this.handleSubmit}
                email={/* istanbul ignore next */ () => this.email()}
                boothNum={this.state.activeBooth}
                company={this.state.company}
                description={this.state.description}
                owner={this.state.owner}
                status={this.state.status}
              />
            </Modal>
            <FloorplanCtn id="floorPlan" path={this.state.path}>
              {this.state.booths.map((booth, i) => {
                return (
                  <div key={`ctn_${booth._id}`}>
                    <Booth
                      boothClick={this.boothClick}
                      filter={this.props.filter}
                      i={i}
                      tip={`tool_${booth._id}`}
                      key={booth._id}
                      num={booth.num}
                      co={booth.company}
                      description={booth.description}
                      row={booth.row}
                      col={booth.col}
                      x={(booth.col * dim) + this.state.leftMargin}
                      y={(booth.row * dim)}
                      dim={dim}
                      status={booth.status}
                      type={booth.type}
                      owner={booth.owner}
                      path={this.state.path}
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
              <Logo className="logo" src={logo} alt="AOA logo" dim={dim} path={this.state.path} />
              <Powertalk1 src={powertalk1} alt="Power Talk 1" dim={dim} path={this.state.path} />
              <Powertalk2 src={powertalk2} alt="Power Talk 2" dim={dim} path={this.state.path} />
            </FloorplanCtn>
          </Wrapper>
        )
        : <StyledSpinner />
    )
  }
}

Hero.propTypes = {
  filter: PropTypes.string,
  checkAuth: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  env: PropTypes.string,
  booths: PropTypes.array,
}
