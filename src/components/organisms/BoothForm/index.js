import React, { Component, PropTypes } from 'react'
import styled from 'styled-components'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import Formsy from 'formsy-react'
import { FormsyCheckbox, FormsyRadio, FormsyRadioGroup, FormsyText } from 'formsy-material-ui/lib'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

const FormsyRadioGroupStyled = styled(FormsyRadioGroup)`
  margin: 10px 0px
`

export default class BoothForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      canSubmit: false,
    }
  }
  submitForm(data) {
    alert(JSON.stringify(data, null, 4))
  }
  notifyFormError(data) {
    console.log('Form error', data)
  }
  enableButton() {
    this.setState({ canSubmit: true })
  }
  disableButton() {
    this.setState({ canSubmit: false })
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()} >
        <Paper>
          <Formsy.Form
            onValid={() => this.enableButton}
            onInvalid={() => this.disableButton}
            onValidSubmit={() => this.submitForm}
            onInvalidSubmit={() => this.notifyFormError}
          >
            <FormsyText
              name="BoothNumber"
              validations="isNumeric"
              validationError="Please only use numbers"
              required
              hintText="Booth #"
              floatingLabelText="Booth #"
            />
            <FormsyText
              name="owner"
              validations="isWords"
              validationError="Please only use text"
              hintText="Who owns this booth?"
              floatingLabelText="Booth Owner"
            />
            <FormsyText
              name="company"
              validations="isWords"
              validationError="Please only use text"
              hintText="What is the company's name?"
              floatingLabelText="Company"
            />
            <FormsyText
              name="description"
              validations="isWords"
              validationError="Please only use text"
              hintText="What does the company do?"
              floatingLabelText="Description"
            />
            <FormsyRadioGroupStyled name="status" defaultSelected="open">
              <FormsyRadio
                value="open"
                label="Open"
              />
              <FormsyRadio
                value="holding"
                label="Holding"
              />
              <FormsyRadio
                value="collect"
                label="Need to collect"
              />
              <FormsyRadio
                value="good"
                label="All set"
              />
            </FormsyRadioGroupStyled>
            <FormsyCheckbox
              name="agree"
              label="Do you agree to disagree?"
            />
            <RaisedButton
              type="submit"
              label="Submit"
              disabled={!this.state.canSubmit}
            />
          </Formsy.Form>
        </Paper>
      </MuiThemeProvider>
    )
  }
}

BoothForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
}
