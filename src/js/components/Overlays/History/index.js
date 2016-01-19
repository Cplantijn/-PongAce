import React, { Component } from 'react';
import _ from 'underscore';
import GameHistoryRow from './GameHistoryRow';

export default class HistoryOverlay extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { fetchHistory } = this.props;
    fetchHistory();
  }
  render() {
    const { playerList, history } = this.props;
    const players = {};
    const games = [];
    _.each(playerList, function(player) {
      players[player.id] = player;
    });
    _.each(history, function(game, key) {
      const groupOneProfile = [];
      const groupTwoProfile = [];
      _.each(game.group_one_player_id.split(','), function(playerId) {
        groupOneProfile.push(players[playerId]);
      });
      _.each(game.group_two_player_id.split(','), function(playerId) {
        groupTwoProfile.push(players[playerId]);
      });
      games.push(
      <GameHistoryRow
        key={key}
        groupOne={groupOneProfile}
        groupTwo={groupTwoProfile}
        game={game} />
      );
    });

    return (
      <div className="history-container">
        <table>
          <thead>
            <tr style={{ 'display': 'flex', 'opacity': '0.65' }}>
              <td style={{ 'flex': '2' }}>Date</td>
              <td style={{ 'flex': '2' }}>Team One</td>
              <td style={{ 'flex': '1' }}>Score</td>
              <td style={{ 'flex': '1' }}></td>
              <td style={{ 'flex': '1' }}>Score</td>
              <td style={{ 'flex': '2' }}>Score</td>
              <td style={{ 'flex': '2' }}></td>
            </tr>
          </thead>
          <tbody>
            {games}
          </tbody>
        </table>
      </div>
    );
  }
}

HistoryOverlay.propTypes = {
  fetchHistory: React.PropTypes.func,
  playerList: React.PropTypes.object,
  history: React.PropTypes.object
};
