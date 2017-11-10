import { Header, PageTemplate } from 'components'
import React, { Component } from 'react'

import { Hero } from 'containers'
import path from 'path'

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: 'None',
    }
    this.filterOwner = this.filterOwner.bind(this)
  }
  componentDidMount() {
    const users = process.env.USERS

    const checkEmail = (window) => {
      const email = window.localStorage.getItem('email')

      users.map((user) => {
        if (email === user[0]) {
          this.setState({ filter: user[1] })
        }
      })
    }

    /* istanbul ignore else */
    if (process.env.NODE_ENV === 'test') {
      const dotEnvPath = path.resolve('./.env')
      require('dotenv').config({ path: dotEnvPath })

      const mockWindow = {
        localStorage: {
          getItem: () => process.env.USERS[0][0],
        },
      }

      users.map(user => {
        checkEmail(mockWindow)
        mockWindow.localStorage.getItem = () => user[0]
      })

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
