import React, { Component } from 'react'
import { getBooths } from 'firebase-db/db'

export default class extends Component {
  async componentWillMount() {
    const booths = await getBooths('la')
    console.log(booths)
  }
  render() {
    return <div>lb</div>
  }
}
