import React, { Component } from 'react'
import { Form, /* InputGroup,*/ Button } from 'react-bootstrap'
import { REQUEST_KEY, API_AC_LOCATION } from '../../constants/weather'
import Autocomplete from '../UI/Autocomplete/Autocomplete'

class WeatherFormLocation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      location: '',
      weather: {},
      isFetching: false,
    }

    this.handleClickSubmit = this.handleClickSubmit.bind(this)
  }

  componentDidMount() {
    const { setRequest } = this.props
    const location = localStorage.getItem(REQUEST_KEY)

    if (!location) {
      console.log('location empty')
      return
    }

    /** @todo callback for new request to openweather API */
    this.setState({ location })
    setRequest(location)
  }

  /**
   *  Отравка запроса
   */
  handleClickSubmit = e => {
    const { location } = this.state
    const { /*history,*/ setRequest } = this.props
    setRequest(location)
    localStorage.setItem(REQUEST_KEY, location) // Данная переменная будет подниматься каждый раз при перезагрузке страниц
  }

  render() {
    const { errors } = this.props
    return (
      <Form inline>
        <Autocomplete
          fieldName={REQUEST_KEY}
          fieldLabel={REQUEST_KEY}
          fieldPlaceholder="Typing location here..."
          responceErrors={errors[REQUEST_KEY]}
          requestParam={REQUEST_KEY}
          requestEndpoint={API_AC_LOCATION}
          responceItemKey="code"
          responceItemValue="title"
        />
        <Button onClick={this.handleClickSubmit} variant="secondary">
          Search
        </Button>
      </Form>
    )
  }
}

export default WeatherFormLocation
