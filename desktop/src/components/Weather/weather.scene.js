import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import actions from '../../actions'

import WeatherFormLocation from './weather.form.location'
// import WeatherFormHistory from './weather.form.history'

class SceneConnector extends Component {
  componentDidMount() {
    const { setHeader } = this.props
    setHeader({
      title: 'Weather search for destiation',
      lead: 'by charge OpenWeaterMap API',
    })
  }

  render() {
    const { errors, request, setRequest, history } = this.props
    return (
      <div>
        <WeatherFormLocation
          errors={errors}
          request={request}
          setRequest={setRequest}
          history={history}
        />
        {/* <WeatherFormHistory
          errors={errors}
          request={request}
          setRequest={setRequest}
          history={history}
        /> */}
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    errors: store.weather.errors,
    request: store.weather.request,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getErrors: bindActionCreators(actions.weather.getErrors, dispatch),
    setRequest: bindActionCreators(actions.weather.setRequest, dispatch),
    setHeader: bindActionCreators(actions.page.setHeader, dispatch),
  }
}

const Scene = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SceneConnector))

export default Scene
