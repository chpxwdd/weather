import React, { Component } from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap'
import Auth from '../Auth'

export default class NavbarTop extends Component {
  render() {
    const navbarCss = { height: '80px', marginBottom: '20px' }
    return (
      <Navbar bg="dark" variant="dark" style={navbarCss}>
        <Container>
          <Navbar.Brand href="/">
            <i className="fas fa-cloud-sun-rain" />
            &nbsp;Weather
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/weather">Weather</Nav.Link>
          </Nav>
          <Auth.NavbarLinks />
        </Container>
      </Navbar>
    )
  }
}
