import React, { Component } from 'react';
import moment from 'moment';
import PlayerPic from './PlayerPic';
import _ from 'underscore';

export default class GameHistoryRow extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { groupOne, groupTwo, game } = this.props;
    const groupOneProfiles = [];
    const groupTwoProfiles = [];
    _.each(groupOne, function(player, key) {
      groupOneProfiles.push(
        <PlayerPic
          key={key}
          name={player.name}
          standardPose={player.standardPose}
        />
      );
    });
    _.each(groupTwo, function(player, key) {
      groupTwoProfiles.push(
        <PlayerPic
          key={key}
          standardPose={player.standardPose}
        />
      );
    });
    return (
      <tr style={{ 'display': 'flex' }} >
        <td style={{ 'flex': '2' }}>
          {moment(game.game_time, 'YYYY-MM-DD H:mm:ss').format('MMM DDD, YYYY [|] h:mm a')}
        </td>
        <td style={{ 'flex': '2' }}>
        {groupOneProfiles}
        </td>
        <td style={{ 'flex': '1' }}>3</td>
        <td style={{ 'flex': '1', 'opacity': '0.65' }}>vs</td>
        <td style={{ 'flex': '1' }}>5</td>
        <td style={{ 'flex': '2' }}>
        {groupTwoProfiles}
        </td>
        <td style={{ 'flex': '2' }}> </td>
      </tr>
    );
  }
}

GameHistoryRow.propTypes = {
  groupOne: React.PropTypes.array,
  groupTwo: React.PropTypes.array,
  game: React.PropTypes.object
};
