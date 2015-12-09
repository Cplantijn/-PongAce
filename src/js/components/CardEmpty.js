import React, { Component } from 'react'
import classNames from 'classnames'
import { Button } from 'react-bootstrap'

export default class CardEmpty extends Component {
  constructor(props) {
    super(props)
  }
  _joinGame() {
    console.log('player joining', this.props)
  }
  render() {
    var { showPlayerModal, playerModalShown, hidePlayerModal } = this.props
    var btnCls = classNames('btn-block','btn-join-game')
    return (
      <div>
        <h2 className="no-players"> No Player(s) </h2>
      </div>
    )
  }
}
