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
      game,
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
      changePlayerPic,
      hideMessage,
      endSelection,
      highlightSelection,
      joinGroup,
      showOverlay,
      userMessage,
      showSelectionWarning
    } = this.props;
    const cls = classNames({
      'game-component-container': true,
      'no-game': !game.active && !game.ended
    });
    return (
      <div className="main-component container-fluid">
        <TopBar userMessage={userMessage}/>
        <div className={cls}>
          <GameComponent {...this.props}/>
          <Overlay
            game={game}
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
            highlightSelection={highlightSelection}
            hideMessage={hideMessage}
            endSelection={endSelection}
            joinGroup={joinGroup}
            showSelectionWarning={showSelectionWarning}
            hideOverlay={hideOverlay} />
        </div>
        <Footer
          hideOverlay={hideOverlay}
          showOverlay={showOverlay}
          overlay={overlay}
          fetchPlayers={fetchPlayers}/>
      </div>
    );
  }
}

MainComponent.propTypes = {
  userMessage: React.PropTypes.object,
  game: React.PropTypes.object,
  createNewPlayer: React.PropTypes.func,
  fetchPlayers: React.PropTypes.func,
  playerList: React.PropTypes.object,
  fetchPlayerDetails: React.PropTypes.func,
  showcasedPlayer: React.PropTypes.object,
  overlay: React.PropTypes.object,
  showOverlay: React.PropTypes.func,
  hideOverlay: React.PropTypes.func,
  fetchSettings: React.PropTypes.func,
  changeGamePoint: React.PropTypes.func,
  changeServeInterval: React.PropTypes.func,
  startSelection: React.PropTypes.func,
  changePlayerPic: React.PropTypes.func,
  hideMessage: React.PropTypes.func,
  endSelection: React.PropTypes.func,
  highlightSelection: React.PropTypes.func,
  joinGroup: React.PropTypes.func,
  showSelectionWarning: React.PropTypes.func,
};
