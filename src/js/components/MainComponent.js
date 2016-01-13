import React, { Component } from 'react';
import Footer from './Footer';
import TopBar from './TopBar';
import classNames from 'classNames';
import Overlay from './Overlays';
import GameComponent from './Game';

export default class MainComponent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      playerGroup,
      createNewPlayer,
      fetchPlayers,
      playerList,
      fetchPlayerDetails,
      showcasedPlayer,
      overlay,
      hideOverlay,
      fetchSettings,
      changeGamePoint,
      changeServeInterval,
      startSelection,
      changePlayerPic
    } = this.props;
    const cls = classNames({
      'game-component-container': true,
      'no-game': !playerGroup.game.active && !playerGroup.game.ended
    });
    return (
      <div className="main-component container-fluid">
        <TopBar {...this.props}/>
        <div className={cls}>
          <GameComponent {...this.props}/>
          <Overlay
            playerGroup={playerGroup}
            createNewPlayer={createNewPlayer}
            fetchPlayers={fetchPlayers}
            playerList={playerList}
            fetchPlayerDetails={fetchPlayerDetails}
            showcasedPlayer={showcasedPlayer}
            overlay={overlay}
            fetchSettings={fetchSettings}
            changeGamePoint={changeGamePoint}
            changeServeInterval={changeServeInterval}
            startSelection={startSelection}
            changePlayerPic={changePlayerPic}
            hideOverlay={hideOverlay} />
        </div>
        <Footer {...this.props}/>
      </div>
    );
  }
}

MainComponent.propTypes = {
  playerGroup: React.PropTypes.object,
  createNewPlayer: React.PropTypes.func,
  fetchPlayers: React.PropTypes.func,
  playerList: React.PropTypes.object,
  fetchPlayerDetails: React.PropTypes.func,
  showcasedPlayer: React.PropTypes.object,
  overlay: React.PropTypes.object,
  hideOverlay: React.PropTypes.func,
  fetchSettings: React.PropTypes.func,
  changeGamePoint: React.PropTypes.func,
  changeServeInterval: React.PropTypes.func,
  startSelection: React.PropTypes.func,
  changePlayerPic: React.PropTypes.func
};
