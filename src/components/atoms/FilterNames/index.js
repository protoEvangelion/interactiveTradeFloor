import React, { Component } from 'react'

import PropTypes from 'prop-types'
import onClickOutside from 'react-onclickoutside'
import styled from 'styled-components'
import { USER_NAMES } from 'constants'

const Names = styled.div`
  position: absolute;
  background: white;
  border: 1px solid #2196f3;
  color: black;
  width: 67px;
  z-index: 3;
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

        {USER_NAMES.map(user => {
          return (
            <Name key={user} onClick={() => this.props.onSelect(user)}>
              {user}
            </Name>
          )
        })}
      </Names>
    )
  }
}

FilterNames.propTypes = {
  onSelect: PropTypes.func,
  toggleFilter: PropTypes.func,
}

export default onClickOutside(FilterNames)
