import React, { Component } from 'react'
import classNames from 'classNames'


export default class GameComponent extends Component {
  constructor(props) {
    super(props);
  }
  _startGame() {
    showCharacterSelect();
  }
  render() {
    var {game} = this.props;
    var mainBody;
    if (!game.active) {
      mainBody = <div
                  className="no-game-banner-container"
                  onClick={this._startGame.bind(this)}>
                    <h1>Play</h1>
                    <div className="logo"></div>
                    <h1>Pong!</h1>
                 </div>
    } else {
      mainBody = <h1>"Game Here"</h1>;
    }
    return (
      <div className="main-game-content">
        {mainBody}
      </div>
    )
  }
}
