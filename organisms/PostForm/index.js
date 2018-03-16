import { Button, Heading, ReduxField } from 'components'

import { Field } from 'redux-form'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const Form = styled.form`
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
`

const PostForm = ({ handleSubmit, submitting }) => {
  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <Heading level={2}>Create a post</Heading>
      <Field name="_csrf" type="hidden" component="input" />
      <Field name="title" label="Title" component={ReduxField} />
      <Field name="body" label="Body" type="textarea" component={ReduxField} />
      <Button type="submit" disabled={submitting}>Create</Button>
    </Form>
  )
}

PostForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
}

export default PostForm
