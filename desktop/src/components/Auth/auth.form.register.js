import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

export default class FormRegister extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      confirm: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const { username, email, password, confirm } = this.state
    this.props.authDispatchRegister({ username, email, password, confirm })
  }

  handleInputChange(e) {
    this.setState({ [e.target.id]: e.target.value })

    if (this.props.authErrors[e.target.id]) {
      delete this.props.authErrors[e.target.id]
    }
  }

  renderFormGroup(field, inputType, label = '') {
    if (label === '') {
      label = field
    }
    return (
      <Form.Group controlId={field}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type={inputType}
          value={this.state[field]}
          onChange={this.handleInputChange}
        />
        {this.props.authErrors[field] && (
          <Form.Text className="text-muted">
            {this.props.authErrors[field]}
          </Form.Text>
        )}
      </Form.Group>
    )
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderFormGroup('username', 'text', 'Имя пользователя')}
        {this.renderFormGroup('email', 'text', 'E-M@il')}
        {this.renderFormGroup('password', 'password', 'Пароль')}
        {this.renderFormGroup('confirm', 'password', 'Подтверждение')}
        <Button type="submit">Submit</Button>
      </Form>
    )
  }
}
