import React, { PropTypes } from 'react'
import { Field } from 'redux-form'
import styled from 'styled-components'

import { ReduxField, Button } from 'components'

const Form = styled.form`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  margin-top: -20px;
`

const BoothForm = ({ handleSubmit, submitting, company, description, owner, status }) => {
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <Field name="_csrf" type="hidden" component="input" />
      <Field name="company" label="Company Name" defaultValue={company} component={ReduxField} />
      <Field name="owner" label="Owner" component={ReduxField} type="select" value={owner}>
        <option value="None">None</option>
        <option value="Todd">Todd</option>
        <option value="Richard">Richard</option>
        <option value="Ryan">Ryan</option>
      </Field>
      <Field name="status" label="Status" component={ReduxField} type="select" value={status}>
        <option value="n/a">N/A</option>
        <option value="open">Open</option>
        <option value="holding">Holding</option>
        <option value="collect">Need to Collect</option>
        <option value="good">Good to go</option>
      </Field>
      <Field name="description" label="Description" component={ReduxField} defaultValue={description} />
      <br />
      <Button type="submit" disabled={submitting}>Save</Button>
    </Form>
  )
}

BoothForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  boothNum: PropTypes.number.isRequired,
  company: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
}

export default BoothForm
