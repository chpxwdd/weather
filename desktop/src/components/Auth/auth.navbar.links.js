import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Nav } from 'react-bootstrap'
import * as AUTH from '../../constants/auth'
import { actionCreators as authActionCreators } from '../../ducks/auth'

class NavbarLinksConnector extends Component {
  componentDidMount() {
    this.props.authDispatchExpToken()
  }

  // onLogout() {
  //   localStorage.removeItem(AUTH.JWT_TOKEN)
  //   setAuthToken(false)
  //   this.props.setCurrent(null)
  //   this.props.history.push(AUTH.ROUTE_LOGIN)
  // }

  renderItem(href, handler, icon, label) {
    return (
      <Nav.Item as="li" onClick={handler && handler}>
        <Nav.Link href={href}>
          {icon && (
            <span>
              <i className={'fas fa-' + icon} /> &nbsp;
            </span>
          )}
          {label}
        </Nav.Link>
      </Nav.Item>
    )
  }

  memberItems() {
    return (
      <Nav as="ul">
        {this.renderItem(
          AUTH.ROUTE_LOGOUT,
          this.props.authDispatchLogout,
          'sign-out-alt',
          null
        )}
      </Nav>
    )
  }

  guestItems() {
    return (
      <Nav as="ul">
        {this.renderItem(AUTH.ROUTE_LOGIN, null, 'sign-in-alt ', null)}
        {this.renderItem(AUTH.ROUTE_REGISTER, null, 'user-plus', null)}
      </Nav>
    )
  }

  render() {
    return this.props.authCurrent ? this.memberItems() : this.guestItems()
  }
}

const mapStateToProps = store => {
  return {
    authCurrent: store.auth.current,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authDispatchExpToken: bindActionCreators(
      authActionCreators.dispatchExpToken,
      dispatch
    ),
    authDispatchLogout: bindActionCreators(
      authActionCreators.dispatchLogout,
      dispatch
    ),
  }
}

const NavbarLinks = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavbarLinksConnector))

export default NavbarLinks
