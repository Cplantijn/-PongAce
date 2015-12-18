import React, { Component } from 'react'
import _ from 'underscore'
import Footer from './Footer'
import TopBar from './TopBar'
import classNames from 'classNames'
import Overlay from './Overlay'
import GameComponent from './GameComponent'

export default class MainComponent extends Component {
  constructor(props) {
    super(props);
  }
  _startGame() {
    alert('STARTING GAME!');
  }
  render() {
    var {game} = this.props;
    var cls = classNames({
      "game-component-container": true,
      "no-game": !game.active
    });
    return (
      <div className="main-component container-fluid">
        <TopBar {...this.props}/>
        <div className={cls}>
          <GameComponent {...this.props}/>
          <Overlay {...this.props}/>
        </div>
        <Footer {...this.props}/>
      </div>
    )
  }
}
