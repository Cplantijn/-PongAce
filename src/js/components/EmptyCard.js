import React, { Component } from 'react'
import classNames from 'classnames'
import { Button } from 'react-bootstrap'
import PlayerJoinModal from './PlayerJoinModal'

export default class EmptyCard extends Component {
  constructor(props) {
    super(props)
    this.state = {showModal: false}
  }
  _joinGame() {
    this.setState({showModal: true})
    console.log('player joining', this.props.teamIndex);
  }
  _closeModal() {
    this.setState({showModal: false})
  }
  render() {
    var btnCls = classNames('btn-block','btn-join-game')
    return (
      <div>
        <PlayerJoinModal showModal={this.state.showModal} closeModal={this._closeModal.bind(this)}/>
        <h2 className="no-players"> No Player(s) </h2>
        <Button className={btnCls} onClick={this._joinGame.bind(this)}> Join </Button>
      </div>
    )
  }
}
