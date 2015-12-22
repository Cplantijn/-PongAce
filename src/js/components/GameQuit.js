import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

export default class GameQuit extends Component {
  constructor(props) {
    super(props);
  }
  _quitGame() {
    var { endGame } = this.props;
    endGame();
  }
  render() {
    var { side } = this.props;
    return (
      <div
        className='quit-container'
        title='Quit Game'
        onClick={this._quitGame.bind(this)}>
        <FontAwesome
          size='2x'
          name='ban' />
      </div>
    )
  }
}
