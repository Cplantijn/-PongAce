import React, { Component } from 'react'
import classNames from 'classNames'
import Message from './Message'

export default class TopBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="top-bar pong-section">
          {/*<Message userMessage={this.props.userMessage} /> */}
          <div className='top-content-container logo-container'>
            <h1 className="logo-header"><span className="icon-logo"></span></h1>
          </div>
      </div>
    )
  }
}
