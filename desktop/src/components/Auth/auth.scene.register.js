import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import FormRegister from './auth.form.register'

import actions from '../../actions'

import { actionCreators as authActionCreators } from '../../ducks/auth'

class SceneRegisterConnector extends Component {
  componentDidMount() {
    this.props.pageDispathSetHeader({ title: 'Register', lead: 'scene' })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authCurrent) {
      this.props.history.push('/')
    }
  }

  render() {
    const { authErrors, authDispatchRegister, history } = this.props
    return (
      <FormRegister
        authErrors={authErrors}
        authDispatchRegister={authDispatchRegister}
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
    authDispatchRegister: bindActionCreators(
      authActionCreators.dispatchRegister,
      dispatch
    ),
    pageDispathSetHeader: bindActionCreators(actions.page.setHeader, dispatch),
  }
}

const SceneRegister = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SceneRegisterConnector))

export default SceneRegister
