import React, { Component } from 'react';
import classNames from 'classNames';

export default class PlayerTileItem extends Component {
  constructor(props) {
    super(props);
  }
  _highlightSelection(id) {
    const { highlightSelection, isSelecting } = this.props;
    if (isSelecting) {
      highlightSelection(id);
    }
  }
  _makeSelection() {
    const { player, joinGroup, game, selectingGroup,
            selectingPlayer, showSelectionWarning } = this.props;
    const { id, name, standardPose, winningPose } = player;

    if (game.isSelecting) {
      if (game.selectedIds.indexOf(id) === -1) {
        joinGroup(selectingGroup, selectingPlayer, id, name, standardPose, winningPose);
      } else {
        showSelectionWarning();
      }
    }
  }
  render() {
    const { player, selectingGroup } = this.props;
    const style = {
      backgroundImage: 'url("/player_img/' + player.standardPose + '")'
    };
    const cls = classNames({
      'player-tile': true,
      'highlight': player.highlight,
      'group-two': selectingGroup === 'groupTwo',
    });
    return (
      <div
        className={cls}
        style={style}
        onMouseEnter={this._highlightSelection.bind(this, player.id)}
        onClick={this._makeSelection.bind(this)}>
        <div className="player-header">{player.name}</div>
      </div>
    );
  }
}

PlayerTileItem.propTypes = {
  highlightSelection: React.PropTypes.func,
  isSelecting: React.PropTypes.bool,
  player: React.PropTypes.object,
  joinGroup: React.PropTypes.func,
  game: React.PropTypes.func,
  selectingGroup: React.PropTypes.string,
  selectingPlayer: React.PropTypes.string,
  showSelectionWarning: React.PropTypes.func,
};
