import React, { Component } from 'react'
import KeyboardEventHandler from 'react-keyboard-event-handler'
import axios from 'axios'
// import PropTypes from 'prop-types'
import { Form, ListGroup } from 'react-bootstrap'

export default class Autocomplete extends Component {
  static propTypes = {
    // requestParam: PropTypes.instanceOf(String),
    // requestEndpoint: PropTypes.instanceOf(String),
    // responceItemKey: PropTypes.instanceOf(String),
    // responceItemValue: PropTypes.instanceOf(String),
    // // responceErrors: PropTypes.instanceOf(Object),
    // fieldName: PropTypes.instanceOf(String),
    // fieldLabel: PropTypes.instanceOf(String),
    // fieldPlaceholder: PropTypes.instanceOf(String),
  }

  static defaultProps = {
    // requestEndpoint: '',
    // requestParam: 'string',
    // responceItemKey: 'key',
    // responceItemValue: 'value',
    // // responceErrors: {},
    // fieldName: '',
    // fieldLabel: '',
    // fieldPlaceholder: String(),
  }

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      suggestionValue: '', // выбранное значение
      suggestionKey: '', // выбранный ключ значения
      suggestionIndex: 0, // выбраный индекс в списке предлагаемых значений
      suggestionsList: [], // список предлагаемых значений
      isFetching: true,
      disabled: false,
      fieldName: '',
    }

    this.handleKeyboardSelect = this.handleKeyboardSelect.bind(this)
    this.handleClickItem = this.handleClickItem.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {}

  handleClickItem(e) {
    console.log(String(e.target.attributes['data-key'].value))
    console.log(String(e.target.attributes['data-value'].value))
  }

  handleChange(e) {
    const { requestParam, requestEndpoint } = this.props
    const value = e.currentTarget.value

    this.setState({
      selectedItem: 0,
      suggestionValue: '',
      suggestionKey: '',
      disabled: true,
    })

    let requestData = {}
    requestData[requestParam] = value

    axios
      .post(requestEndpoint, requestData)
      .then(res => {
        this.setState({
          value,
          suggestionsList: res.data,
          isFetching: false,
          disabled: false,
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  /**
   *
   * @param {array} suggestionsList
   */
  renderResult() {
    const { suggestionsList } = this.state
    if (!suggestionsList.length) {
      return
    }
    return (
      <div style={{ position: 'absolute', marginTop: '4px', width: '100%' }}>
        <ListGroup as="ul" className="ui-autocomplete-result">
          {suggestionsList.map((item, idx) => {
            return this.renderItem(item, idx)
          })}
        </ListGroup>
      </div>
    )
  }

  /**
   *
   * @param {string} item
   * @param {string} key
   */
  renderItem(item, idx) {
    const { suggestionIndex } = this.state
    const { responceItemKey, responceItemValue } = this.props

    return (
      <ListGroup.Item
        action
        href={String('#').concat(idx)}
        as="li"
        key={idx}
        active={String(idx) === String(suggestionIndex)}
        data-key={item[responceItemKey]}
        data-value={item[responceItemValue]}
        onClick={this.handleClickItem}
        // onMouseMove={this.handleClickItem}
      >
        {item[responceItemValue]}
      </ListGroup.Item>
    )
  }

  /**
   * render method
   */
  render() {
    const { suggestionsList, value, isFetching, disabled } = this.state
    const {
      fieldName,
      fieldLabel,
      fieldPlaceholder,
      responceErrors,
    } = this.props
    return (
      <div>
        <KeyboardEventHandler
          handleKeys={['up', 'down', 'enter']}
          onKeyEvent={this.handleKeyboardSelect}
        >
          <Form.Group controlId={`${fieldName}`}>
            <Form.Control
              type="text"
              autoComplete="off"
              value={`${value}`}
              placeholder={`${fieldPlaceholder}`}
              disabled={disabled}
              aria-label={`${fieldLabel}`}
              aria-describedby={`${fieldName}`}
              onChange={this.handleChange}
            />
            {responceErrors && (
              <Form.Text className="text-muted">{responceErrors}</Form.Text>
            )}
          </Form.Group>
        </KeyboardEventHandler>
        {!isFetching && this.renderResult(suggestionsList)}
      </div>
    )
  }

  handleKeyboardSelect(key, e) {
    const { suggestionsList } = this.state

    if (suggestionsList.length === 0) {
      return false
    }

    switch (String(key).toLowerCase()) {
      default:
        return
      case 'up':
        this.previus()
        break
      case 'down':
        this.next()
        break
      case 'enter':
        this.select()
        break
    }
    // лочим перемещение курсора
    e.stopPropagation()
    e.preventDefault()
    return false
  }

  next = () => {
    const { responceItemKey, responceItemValue } = this.props
    const { suggestionsList, suggestionIndex } = this.state
    const inc = suggestionIndex + 1

    if (inc === suggestionsList.length) {
      return
    }

    this.setState(state => ({
      suggestionIndex: inc,
      suggestionValue: String(state.suggestionsList[inc][responceItemKey]),
      suggestionKey: String(state.suggestionsList[inc][responceItemValue]),
    }))
  }

  previus = () => {
    const { responceItemKey, responceItemValue } = this.props
    const { suggestionIndex } = this.state
    const dec = suggestionIndex - 1
    if (dec < 0) {
      return
    }

    this.setState(state => ({
      suggestionValue: String(state.suggestionsList[dec][responceItemValue]),
      suggestionKey: String(state.suggestionsList[dec][responceItemKey]),
      suggestionIndex: dec,
    }))
  }

  select = () => {
    // const { responceItemKey, responceItemValue } = this.props
    // const { suggestionsList, suggestionIndex } = this.state
    // this.setState({ suggestionsList: [], suggestionIndex: 0 })
  }
}
