import React, { Component } from 'react';
import classNames from 'classNames';
import config from '../../../../config';
import ProfilesOverlay from './Profiles';
import PlayerSelectOverlay from './PlayerSelect';
import HideOverlay from './HideOverlay';
import SettingsOverlay from './Settings';


export default class Overlay extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { overlay, hideOverlay, game, changePlayerPic,
            createNewPlayer, fetchPlayers, playerList,
            fetchPlayerDetails, showcasedPlayer, hideMessage,
            endSelection, resetGroups, highlightSelection,
            joinGroup, showSelectionWarning, highlightId,
            selectingPlayer, selectingGroup, isSelecting,
            startSelection, fetchSettings, changeServeInterval,
            changeGamePoint } = this.props;
    const overlays = ['profiles', 'leaderboards', 'history', 'settings', 'characterSelect'];
    const activeOverlay = overlay.activeIndex ? overlays[overlay.activeIndex] : 'profiles';
    let overlayBody;
    let show = true;

    const oCls = classNames({
      'main-overlay': true,
      'closed': !overlay.isOpen,
      'opened': overlay.isOpen
    });

    const styles = {
      'backgroundColor': config.overlayScreens[activeOverlay].backgroundColor,
      'color': config.overlayScreens[activeOverlay].pageTextColor
    };

    if (!game.active) {
      switch (activeOverlay) {
        case 'profiles':
          overlayBody =
          (<ProfilesOverlay
            createNewPlayer={createNewPlayer}
            fetchPlayers={fetchPlayers}
            playerList={playerList}
            changePlayerPic={changePlayerPic}
            fetchPlayerDetails={fetchPlayerDetails}
            showcasedPlayer={showcasedPlayer}
        />);
          break;
        case 'characterSelect':
          show = false;
          overlayBody =
          (<PlayerSelectOverlay
            hideMessage={hideMessage}
            endSelection={endSelection}
            resetGroups={resetGroups}
            game={game}
            playerList={playerList}
            highlightSelection={highlightSelection}
            joinGroup={joinGroup}
            showSelectionWarning={showSelectionWarning}
            highlightId={highlightId}
            selectingPlayer={selectingPlayer}
            selectingGroup={selectingGroup}
            isSelecting={isSelecting}
            startSelection={startSelection}
            />);
          break;
        case 'settings':
          overlayBody =
          (<SettingsOverlay
            fetchSettings={fetchSettings}
            changeServeInterval={changeServeInterval}
            changeGamePoint={changeGamePoint}
            game={game} />);
          break;
        default:
          overlayBody = <div></div>;
      }
    } else {
      overlayBody = <div className="game-active"><h1>GAME IS ACTIVE.<br />PLEASE END THE GAME FIRST</h1></div>;
    }

    return (
      <div
        className={oCls}
        style={styles}>
        <HideOverlay hideOverlay={hideOverlay} show={show} />
        <div
          className="overlay-content-container">
          {overlayBody}
        </div>
      </div>
    );
  }
}

Overlay.propTypes = {
  overlay: React.PropTypes.object,
  hideOverlay: React.PropTypes.func,
  game: React.PropTypes.object,
  changePlayerPic: React.PropTypes.func,
  createNewPlayer: React.PropTypes.func,
  fetchPlayers: React.PropTypes.func,
  playerList: React.PropTypes.object,
  fetchPlayerDetails: React.PropTypes.func,
  showcasedPlayer: React.PropTypes.object,
  hideMessage: React.PropTypes.func,
  endSelection: React.PropTypes.func,
  resetGroups: React.PropTypes.func,
  highlightSelection: React.PropTypes.func,
  joinGroup: React.PropTypes.func,
  showSelectionWarning: React.PropTypes.func,
  highlightId: React.PropTypes.number,
  selectingPlayer: React.PropTypes.string,
  selectingGroup: React.PropTypes.string,
  isSelecting: React.PropTypes.bool,
  startSelection: React.PropTypes.func,
  fetchSettings: React.PropTypes.func,
  changeServeInterval: React.PropTypes.func,
  changeGamePoint: React.PropTypes.func
};
