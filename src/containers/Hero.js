import React from 'react'
import { connect } from 'react-redux'

import { Hero } from 'components'

const HeroContainer = props => <Hero {...props} />

const mapStateToProps = (state) => {
  return { authenticated: state.social.authenticated }
}

export default connect(mapStateToProps)(HeroContainer)
