import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'

export default class DateRangePicker extends Component {
  static propTypes = {
    value: PropTypes.instanceOf(String),
  }

  static defaultProps = {
    value: '',
  }

  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }

    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    const value = e.currentTarget.value

    this.setState({ value })
  }
  render() {
    const { value } = this.state
    return (
      <div>
        <Form.Group controlId="daterangepicker">
          <Form.Control
            type="text"
            autoComplete="off"
            value={`${value}`}
            onChange={this.handleChange}
          />
          {/* {responceErrors && (
            <Form.Text className="text-muted">{responceErrors}</Form.Text>
          )} */}
        </Form.Group>
      </div>
    )
  }
}
