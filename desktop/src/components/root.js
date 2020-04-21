import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'
import Page from './Page'
import Auth from './Auth'
import Weather from './Weather'

import { ROUTE_LOGIN, ROUTE_REGISTER } from '../constants/auth'

export default class Root extends Component {
  render() {
    return (
      <div>
        <Page.NavbarTop />
        <Container>
          <Row>
            <Page.Header title="Home" lead="scene" />
          </Row>
          <Row>
            <Col>
              <div>
                <Switch>
                  <Route exact path="/" component={Weather.Scene} />
                  <Route exact path={ROUTE_LOGIN} component={Auth.SceneLogin} />
                  <Route
                    exact
                    path={ROUTE_REGISTER}
                    component={Auth.SceneRegister}
                  />
                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
