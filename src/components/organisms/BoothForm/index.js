import React, { PropTypes } from 'react'
import { Field } from 'redux-form'
import styled from 'styled-components'

import { ReduxField, Heading, Button } from 'components'

const Form = styled.form`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
`

const Label = styled.label`
  margin: 10px auto;
`

const BoothForm = ({ handleSubmit, submitting, boothNum }) => {
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <Heading level={2}>Editing Booth # {boothNum}</Heading>
      <Field name="_csrf" type="hidden" component="input" />
      <Field name="company" label="Company Name" component={ReduxField} />
      <div>
        <Label>Owner:</Label>
        <div>
          <label htmlFor="open"><Field name="owner" component="input" type="radio" value="open" /> Open</label>
          <label htmlFor="Todd"><Field name="owner" component="input" type="radio" value="Todd" /> Todd</label>
          <label htmlFor="Richard"><Field name="owner" component="input" type="radio" value="Richard" /> Richard</label>
          <label htmlFor="Ryan"><Field name="owner" component="input" type="radio" value="Ryan" /> Ryan</label>
        </div>
      </div>
      <div>
        <Label>Status:</Label>
        <Field name="status" component="select">
          <option value="" />
          <option value="holding">Holding</option>
          <option value="collect">Need to Collect</option>
          <option value="good">Good to go</option>
        </Field>
      </div>
      <Field name="description" label="Description" component={ReduxField} />
      <br />
      <Button type="submit" disabled={submitting}>Save</Button>
    </Form>
  )
}

BoothForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  boothNum: PropTypes.number.isRequired,
}

export default BoothForm
