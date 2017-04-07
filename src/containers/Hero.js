import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Hero } from 'components'
import { checkAuth } from '../store/social/actions'

const HeroContainer = props => <Hero {...props} />

const mapStateToProps = (state) => {
  return { authenticated: state.social.authenticated }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ checkAuth }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HeroContainer)
