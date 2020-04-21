import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'
import { FLAG_EXT, FLAG_PATH } from '../../constants/weather'

export default class GridCountries extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      isFetched: false,
      errors: null,
      selected: null,
    }
  }

  componentDidMount() {
    this.fetchCountries()
  }

  fetchCountries() {
    axios
      .get('/api/weather/country')
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

  renderFlag(code) {
    return String(FLAG_PATH)
      .concat(code)
      .concat(FLAG_EXT)
      .toLowerCase()
  }

  renderRow(country) {
    return (
      <tr key={country._id}>
        <td>
          <img
            width="22px"
            src={this.renderFlag(country.code)}
            alt={country.name}
          />
        </td>
        <td>{country.code}</td>
        <td>{country.name}</td>
      </tr>
    )
  }

  render() {
    const { items, isFetched, errors } = this.state
    return (
      <div>
        {isFetched && items.length && (
          <Table responsive hover>
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th>Code</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {items.map(country => {
                return this.renderRow(country)
              })}
            </tbody>
          </Table>
        )}
        {errors && <div className="error">{errors}</div>}
      </div>
    )
  }
}
