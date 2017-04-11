import React, { Component } from 'react'

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
    const email = window.localStorage.getItem('email')
    if (email === process.env.EMAIL3) {
      this.setState({ filter: 'Todd' })
    } else if (email === process.env.EMAIL2) {
      this.setState({ filter: 'Richard' })
    } else if (email === process.env.EMAIL1) {
      this.setState({ filter: 'Ryan' })
    }
  }
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
