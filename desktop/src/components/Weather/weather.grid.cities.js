import React, { Component } from 'react'
import axios from 'axios'

export default class GridCities extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      isFetched: false,
      errors: null,
      selected: null,
      countryCode: null,
    }
  }

  componentDidMount() {
    this.fetchCities()
  }

  fetchCities(countryCode) {
    if (!countryCode) {
      return
    }
    axios
      .get('/api/weather/cities/' + countryCode)
      .then(res => {
        this.setState({ items: res.data, isFetched: true })
      })
      .catch(err => {
        this.setState({
          items: [],
          selected: null,
          isFetched: false,
          errors: err.response.data,
        })
      })
  }

  render() {
    const { items } = this.state
    return (
      <div>
        <h3>Cities</h3>
        <div>{items.lenght}</div>
      </div>
    )
  }
}
