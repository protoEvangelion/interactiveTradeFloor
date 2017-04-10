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
    if (email === 'toddviani@gmail.com') {
      this.setState({ filter: 'Todd' })
    } else if (email === 'rockswild71@gmail.com') {
      this.setState({ filter: 'Richard' })
    } else if (email === 'ryantgarant@gmail.com') {
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
