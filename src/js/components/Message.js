import React, { Component } from 'react';
import classNames from 'classNames';

export default class Message extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { userMessage } = this.props;
    const msgCls = classNames({
      'top-content-container': true,
      'message-container': true,
      'msg-shown': userMessage.isShowing,
      'msg-hidden': !userMessage.isShowing,
      'danger': userMessage.type === 'danger',
      'success': userMessage.type === 'success',
      'info': userMessage.type === 'info',
      'warning': userMessage.type === 'warning',
      'group-one': userMessage.type === 'group-one',
      'group-two': userMessage.type === 'group-two',
      'group-one-win': userMessage.type === 'group-one-win',
      'group-two-win': userMessage.type === 'group-two-win',
    });
    const shakeCls = classNames({
      'shake': userMessage.shake
    });
    return (
      <div className={msgCls}>
        <div className="message-info-container">
          <h1 className={shakeCls}>{userMessage.message}</h1>
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  userMessage: React.PropTypes.object
};
