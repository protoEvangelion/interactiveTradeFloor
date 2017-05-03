import React from 'react'
import { mount, shallow } from 'enzyme'
import sinon from 'sinon'
import Booth, { determineColor, determineX, determineWidth, determineHeight } from '.'

const wrap = (props = {}) => shallow(<Booth {...props} />).dive()

const onClick = sinon.spy()

const props = {
  key: 1,
  num: 1,
  onClick,
  filter: 'Jin',
  i: 1,
  co: 'AOA',
  description: 'Stuff',
  type: 'single',
  owner: 'Jin',
  status: 'Holding',
  row: 1,
  col: 1,
  x: 1,
  y: 1,
  dim: 1,
  tip: 'AOA cool co',
}

describe('<Booth />', () => {
  it('renders props', () => {
    let wrapper = wrap({ ...props })
    expect(wrapper.find('.boothCtn')).toHaveLength(1)
    props.status = 'open'
    wrapper = wrap({ ...props })
    expect(wrapper.find('.boothCtn')).toHaveLength(1)
  })

  it('determines color function', () => {
    expect(determineColor('jin', 'jin', 'open')).toEqual('black')
    expect(determineColor('None', 'jin', 'holding')).toEqual('black')
    expect(determineColor('jin', 'jin', 'n/a')).toEqual('black')
    expect(determineColor('Todd', 'Todd', 'holding')).toEqual('rgb(0, 178, 14)')
    expect(determineColor('Richard', 'Richard', 'holding')).toEqual('rgb(8, 0, 255)')
    expect(determineColor('Jin', 'Jin', 'holding')).toEqual('rgb(255, 0, 170)')
  })

  it('determines X coord', () => {
    expect(determineX(1, 1, 'ptArena1', 1)).toEqual(-6)
  })

  it('determines Width', () => {
    expect(determineWidth('double', 1)).toEqual('5px')
    expect(determineWidth('AOABooth', 1)).toEqual('15px')
    expect(determineWidth('Seminar', 1)).toEqual('34px')
    expect(determineWidth('ptArena1', 1)).toEqual('14px')
    expect(determineWidth('ptArena2', 1)).toEqual('14px')
  })

  it('determines Height', () => {
    expect(determineHeight('AOABooth', 1)).toEqual('9px')
    expect(determineHeight('Seminar', 1)).toEqual('21px')
    expect(determineHeight('ptArena1', 1)).toEqual('9px')
    expect(determineHeight('ptArena2', 1)).toEqual('9px')
  })
})
