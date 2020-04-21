import React, { Component } from 'react'
import { Form } from 'react-bootstrap'

export default class Input extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (label === '') {
      label = id
    }
  }

  render() {
    const { id, type, error, value, handleChange } = props

    return (
      <Form.Group controlId={id}>
        <Form.Label>{label}</Form.Label>
        <Form.Control type={type} value={value} onChange={handleChange()} />
        {error && <Form.Text className="text-muted">{error}</Form.Text>}
      </Form.Group>
    )
  }
}
