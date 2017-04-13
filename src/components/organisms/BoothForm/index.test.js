import React from 'react'
import renderer from 'react-test-renderer'
import { reduxForm } from 'redux-form'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import BoothForm from '.'

const spy = jest.fn()
const store = createStore(() => ({}))

const Decorated = reduxForm({ form: 'testForm' })(BoothForm)

const props = {
  handleSubmit: spy,
  email: () => {},
  submitting: false,
  boothNum: 110,
  company: 'AOA',
  description: 'advertising',
  owner: 'Ryan',
  status: 'Holding',
}

describe('BoothForm snapshot', () => {
  it('should render the snapshot', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <Decorated {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
