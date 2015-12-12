import React, { Component } from 'react'
import classNames from 'classNames'
import Message from './Message'

export default class TopBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var { message, shake, show} = this.props.userMessage;
    var outCls = classNames({
      'top-content-container': true,
      'logo-container': true,
      'msg-shown': show,
    })
    return (
      <div className="top-bar pong-section">
          <Message userMessage={this.props.userMessage} />
          <div className={outCls}>
            <h1 className="logo-header"><span className="icon-logo"></span></h1>
          </div>
      </div>
    )
  }
}
