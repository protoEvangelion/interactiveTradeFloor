import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { postCreateRequest } from 'store/actions'
import { createValidator, required } from 'services/validation'

import { BoothForm } from 'components'

const BoothFormContainer = props => <BoothForm {...props} />

const onSubmit = (data, dispatch) =>
  new Promise((resolve, reject) => {
    dispatch(postCreateRequest(data, resolve, reject))
  })

const validate = createValidator({
  title: [required],
  body: [required],
})

const mapStateToProps = (state, ownProps) => ({
  user: state.social.user ? state.social.user.email : null,
  initialValues: {
    company: ownProps.company,
    owner: ownProps.owner,
    status: ownProps.status,
    description: ownProps.description,
  },
})

export const config = {
  form: 'BoothForm',
  fields: ['company', 'owner', 'status', 'description'],
  destroyOnUnmount: true,
  onSubmit,
  validate,
}

export default connect(mapStateToProps)(reduxForm(config)(BoothFormContainer))
