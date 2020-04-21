import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import FormLogin from './auth.form.login'
import actions from '../../actions'
import { actionCreators as authActionCreators } from '../../ducks/auth'

class SceneLoginConnector extends Component {
  componentDidMount() {
    const { pageDispathSetHeader } = this.props
    pageDispathSetHeader({ title: 'Login', lead: 'scene' })
  }

  componentWillReceiveProps(nextProps) {
    const { history } = this.props
    if (nextProps.authCurrent) {
      history.push('/')
    }
  }

  render() {
    const { authCurrent, authErrors, authDispatchLogin, history } = this.props
    return (
      <FormLogin
        authErrors={authErrors}
        authCurrent={authCurrent}
        authDispatchLogin={authDispatchLogin}
        history={history}
      />
    )
  }
}

const mapStateToProps = store => {
  return {
    authCurrent: store.auth.current,
    authErrors: store.auth.errors,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authDispatchLogin: bindActionCreators(
      authActionCreators.dispatchLogin,
      dispatch
    ),
    pageDispathSetHeader: bindActionCreators(actions.page.setHeader, dispatch),
  }
}

const SceneLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SceneLoginConnector))

export default SceneLogin
