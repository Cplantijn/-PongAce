import React, { Component } from 'react'
import _ from 'underscore'
import Footer from './Footer'
import TopBar from './TopBar'
import classNames from 'classNames'
import MenuOverlay from './MenuOverlay'

export default class MainComponent extends Component {
  constructor(props) {
    super(props);
  }
  _startGame() {
    alert('STARTING GAME!');
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
    var cls = classNames({
      "game-component-container": true,
      "no-game": !game.active
    });
    return (
      <div className="main-component container-fluid">
        <TopBar {...this.props}/>
        <div className={cls}>
          {mainBody}
          <MenuOverlay {...this.props}/>
        </div>
        <Footer {...this.props}/>
      </div>
    )
  }
}
