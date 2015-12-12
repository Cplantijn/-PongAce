import React, { Component } from 'react'
import classNames from 'classNames'

export default class Message extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var { type, message, shake, show } = this.props.userMessage;
    var msgCls = classNames({
      'top-content-container': true,
      'message-container' : true,
      'message-shaking': shake,
      'msg-shown': show,
      'danger': type == 'danger'
    });
    return (
      <div className={msgCls}>
        <div className="message-info-container">
          <h1>{message}</h1>
        </div>
      </div>
    )
  }
}
