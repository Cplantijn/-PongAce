import React, { Component } from 'react'
import classNames from 'classNames'

export default class MenuOverlay extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    var { menuOpen } = this.props
    var menuCls = classNames({
      'main-menu-overlay': true,
      'closed': !menuOpen,
      'opened': menuOpen
    })
    return (
      <div className={menuCls}>
      </div>
    )
  }
}
