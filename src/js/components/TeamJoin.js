import React, { Component } from 'react'
import classNames from 'classnames'


export default class TeamJoin extends Component {
  constructor(props) {
    super(props)
  }
  _clicked() {
    this.props.addTeam(this.props.teamIndex)
  }
  render() {
    var containerCls = classNames('team-card-score-component', 'join-game')
    var btnCls = classNames('btn', 'btn-default', 'join-game-btn', this.props.team)

    return (
      <div className={containerCls}>
        <button className={btnCls} onClick={_clicked.bind(this)}>Join</button>
      </div>
    )
  }
}
