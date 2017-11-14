import PropTypes from 'prop-types'
import React from 'react'

module.exports = new Proxy({}, {
  get: (target, property) => {
    const Mock = (props) => <span>{props.children}</span>

    Mock.displayName = property
    Mock.propTypes = {
      children: PropTypes.any
    }

    return Mock
  }
})
