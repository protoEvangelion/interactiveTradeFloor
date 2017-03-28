import React, { Component } from 'react'

import { PageTemplate, Header, Hero } from 'components'

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: 'None',
    }
    this.filterOwner = this.filterOwner.bind(this)
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
