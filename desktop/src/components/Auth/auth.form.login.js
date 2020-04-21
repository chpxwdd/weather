import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

export default class FormLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const { current, history } = this.props
    if (!current) {
      return
    }
    // если попытка зайти из под уже залогиненного
    history.push('/')
  }

  componentWillReceiveProps(nextProps) {
    const { history } = this.props

    if (!nextProps.current) {
      return
    }
    // если попытка зайти из под уже залогиненного
    history.push('/')
  }

  handleSubmit(e) {
    e.preventDefault()
    const { email, password } = this.state
    this.props.authDispatchLogin({ email, password })
  }

  handleInputChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    })

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
        {this.renderFormGroup('email', 'text', 'E-M@il')}
        {this.renderFormGroup('password', 'password', 'Пароль')}
        <Button type="submit">Signup</Button>
      </Form>
    )
  }
}
