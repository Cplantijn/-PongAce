import React, { Component } from 'react'
import classNames from 'classNames'
import GameGroupContainer from './GameGroupContainer'
import ServingBanner from './ServingBanner'
import GameQuit from './GameQuit'
import WinnerPopUp from './WinnerPopUp'

export default class GameComponent extends Component {
  constructor(props) {
    super(props);
  }
  _startSelection() {
    var { showOverlay, fetchPlayers } = this.props;
    fetchPlayers('','id ASC');
    showOverlay(4);
  }
  render() {
    var {game, game, endGame} = this.props;
    var mainBody;
    var serving = game.groupOne.serving ? 'groupOne' : 'groupTwo';
    if (game.game.active || game.game.ended) {
      mainBody = <div className="master-game-container">
                  <WinnerPopUp game={game}/>
                  <ServingBanner side={serving}/>
                  <GameQuit endGame={endGame}/>
                  <GameGroupContainer
                    group="groupOne"
                    activeGroup={game.groupOne} />
                  <GameGroupContainer
                    group="groupTwo"
                    activeGroup={game.groupTwo} />
                </div>;
    } else {
      mainBody = <div
                  className="no-game-banner-container"
                  onClick={this._startSelection.bind(this)}>
                    <h1>Play</h1>
                    <div className="logo"></div>
                    <h1>Pong</h1>
                 </div>
    }
    return (
      <div className="main-game-content">
        {mainBody}
      </div>
    )
  }
}
