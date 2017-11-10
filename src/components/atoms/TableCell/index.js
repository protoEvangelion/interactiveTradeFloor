import styled, { css } from 'styled-components'

import PropTypes from 'prop-types'
import React from 'react'

const styles = css`
  text-align: left;
  padding: 0.75em;
`

const Th = styled.th`${styles}`
const Td = styled.td`${styles}`

const TableCell = ({ heading, children, ...props }) => {
  return React.createElement(heading ? Th : Td, props, children)
}

TableCell.propTypes = {
  heading: PropTypes.bool,
  children: PropTypes.any,
}

export default TableCell
