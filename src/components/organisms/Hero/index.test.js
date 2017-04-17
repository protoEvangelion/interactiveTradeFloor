import React from 'react'
import sinon from 'sinon'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import Hero from '.'

const props = {
  filter: 'Ryan',
  checkAuth: () => {},
  authenticated: true,
  booths: [
    {
      env: 'production',
      num: 100,
      _id: '23498sdflkjsd',
      co: 'AOA',
      description: 'Stuff',
      row: 1,
      col: 1,
      status: 'Holding',
      type: 'single',
      owner: 'Ryan',
    },
  ],
}

describe('<Hero /> snapshot', () => {
  // it('tests boothClick function', () => {
  //   const spy = sinon.spy(Hero.prototype, 'boothClick')
  //   const wrapper = mount(<Hero {...props} />)
  //   wrapper.find('Booth').simulate('click')
  //   console.log(spy.called)
  // })
  it('renders snapshot', () => {
    const tree = renderer.create(
      <Hero {...props} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
