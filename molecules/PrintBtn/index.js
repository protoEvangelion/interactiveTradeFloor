import React, { Component } from 'react'
import { Button } from 'components'

class FilterBtn extends Component {
  render() {
    return (
      <div>
        <Button palette="secondary" onClick={() => window.print()}>
          Print
        </Button>
      </div>
    )
  }
}

export default FilterBtn
