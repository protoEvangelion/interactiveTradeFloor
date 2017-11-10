import { Button, FilterNames } from 'components'
import React, { Component } from 'react'

import PropTypes from 'prop-types'

class FilterBtn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showFilter: false,
    }
    this.onSelect = this.onSelect.bind(this)
  }
  onSelect(name) {
    this.props.filter(name)
    this.toggleFilter()
  }
  toggleFilter() {
    this.setState({ showFilter: !this.state.showFilter })
  }
  showFilter() {
    return this.state.showFilter
      ? <FilterNames
        onSelect={this.onSelect}
        toggleFilter={() => this.toggleFilter()}
      />
      : ''
  }
  render() {
    return (
      <div>
        <Button
          onClick={() => this.toggleFilter()}
        >
          Filter
        </Button>
        {this.showFilter()}
      </div>
    )
  }
}

FilterBtn.propTypes = {
  filter: PropTypes.func,
}

export default FilterBtn
