import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import App from './'

import { ROUTE_LOGIN, ROUTE_REGISTER } from '../constants/auth'

export default class Root extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={App.Weather.WeatherScene} />
          <Route exact path={ROUTE_LOGIN} component={App.Auth.SceneLogin} />
          <Route
            exact
            path={ROUTE_REGISTER}
            component={App.Auth.SceneRegister}
          />
        </Switch>
      </div>
    )
  }
}
