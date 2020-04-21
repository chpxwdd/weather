import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class HeaderConnector extends Component {
  render() {
    const { header, title, lead } = this.props
    return (
      <h3 className="page-heading">
        {title ? title : header.title}
        <small className="text-muted"> {lead ? lead : header.lead}</small>
      </h3>
    )
  }
}

const mapStateToProps = store => {
  return {
    header: store.page.header,
  }
}

const Header = connect(
  mapStateToProps,
  {}
)(withRouter(HeaderConnector))

export default Header
