import React, { Component } from 'react'


export default class TeamCard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="pong-section top-bar">
        <div className="logo-container col-xs-4 col-xs-offset-4">
            <h1 className="logo-header"><span className="icon-logo"></span>PongAce</h1>
        </div>
      </div>
    )
  }
}
