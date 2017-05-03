import React, { Component } from 'react'
import path from 'path'
import { PageTemplate, Header } from 'components'
import { Hero } from 'containers'

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: 'None',
    }
    this.filterOwner = this.filterOwner.bind(this)
  }
  componentDidMount() {
    const checkEmail = (window) => {
      const email = window.localStorage.getItem('email')

      if (email === process.env.EMAIL3) {
        this.setState({ filter: 'Todd' })
      } else if (email === process.env.EMAIL2) {
        this.setState({ filter: 'Richard' })
      } else if (email === process.env.EMAIL1) {
        this.setState({ filter: 'Jin' })
      } else {
        this.setState({ filter: 'None' })
      }
    }

    /* istanbul ignore else */
    if (process.env.NODE_ENV === 'test') {
      const dotEnvPath = path.resolve('./.env')
      require('dotenv').config({ path: dotEnvPath })

      const mockWindow = {
        localStorage: {
          getItem: () => process.env.EMAIL1,
        },
      }
      checkEmail(mockWindow)
      mockWindow.localStorage.getItem = () => process.env.EMAIL2
      checkEmail(mockWindow)
      mockWindow.localStorage.getItem = () => process.env.EMAIL3
      checkEmail(mockWindow)
      mockWindow.localStorage.getItem = () => 'hellow'
      checkEmail(mockWindow)
    } else {
      checkEmail(window)
    }
  }
  /* istanbul ignore next */
  filterOwner(filter) {
    this.setState({ filter })
  }
  render() {
    return (
      <PageTemplate header={<Header filter={this.filterOwner} />} hero={<Hero filter={this.state.filter} />} />
    )
  }
}

export default HomePage
