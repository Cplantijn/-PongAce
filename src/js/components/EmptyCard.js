import React, { Component } from 'react'
import classNames from 'classnames'
import { Button } from 'react-bootstrap'
import PlayerJoinModal from './PlayerJoinModal'

export default class EmptyCard extends Component {
  constructor(props) {
    super(props)
  }
  _joinGame() {
    console.log('player joining', this.props)
  }
  render() {
    console.log(this.props);
    var { showPlayerModal, playerModalShown, hidePlayerModal } = this.props
    var btnCls = classNames('btn-block','btn-join-game')
    return (
      <div>
        <PlayerJoinModal showModal={playerModalShown} closeModal={hidePlayerModal}/>
        <h2 className="no-players"> No Player(s) </h2>
        <Button className={btnCls} onClick={ showPlayerModal }> Join </Button>
      </div>
    )
  }
}
