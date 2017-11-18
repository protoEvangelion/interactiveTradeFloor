import React, { Component } from 'react'

import PropTypes from 'prop-types'
import onClickOutside from 'react-onclickoutside'
import styled from 'styled-components'

require('dotenv').config()

const Names = styled.div`
  position: absolute;
  background: white;
  border: 1px solid #2196f3;
  color: black;
  width: 69px;
`

const Name = styled.p`
  margin: 0;
  padding: 5px;
  &:hover {
    background: #2196f3;
    cursor: pointer;
    color: white;
  }
`

class FilterNames extends Component {
  handleClickOutside() {
    this.props.toggleFilter()
  }
  render() {
    return (
      <Names>
        <Name onClick={() => this.props.onSelect('None')}>None</Name>
        {process.env.USERNAMES.map(user => {
          const firstName = user[1]
          return <Name key={firstName} onClick={() => this.props.onSelect(firstName)}>{firstName}</Name>
        }
        )}
      </Names>
    )
  }
}

FilterNames.propTypes = {
  onSelect: PropTypes.func,
  toggleFilter: PropTypes.func,
}

export default onClickOutside(FilterNames)
