import React, { Component } from 'react'
import classNames from 'classNames'

export default class Message extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var { userMessage } = this.props;
    var msgCls = classNames({
      'top-content-container': true,
      'message-container' : true,
      'msg-shown': userMessage.isShowing,
      'danger': userMessage.type === 'danger'
    });
    var shakeCls = classNames({
      'shake': userMessage.shake
    })
    return (
      <div className={msgCls}>
        <div className="message-info-container">
          <h1 className={shakeCls}>{userMessage.message}</h1>
        </div>
      </div>
    )
  }
}
