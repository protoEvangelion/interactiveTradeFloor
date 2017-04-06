import React from 'react'
import { connect } from 'react-redux'

import { Hero } from 'components'

const HeroContainer = props => <Hero {...props} />

const mapStateToProps = (state) => {
  return {
    user: state.social.user,
  }
}

export default connect(mapStateToProps)(HeroContainer)
