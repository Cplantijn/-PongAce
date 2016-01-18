import React, { Component } from 'react';
import _ from 'underscore';

export default class HistoryOverlay extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { fetchHistory } = this.props;
    fetchHistory();
  }
  render() {
    const { playerList } = this.props;
    const players = {};
    _.each(playerList, function(player) {
      players[player.id] = player;
    });
    console.log(players);
    return (
      <div className="history-container">
      </div>
    );
  }
}

History.propTypes = {
  fetchHistory: React.PropTypes.func
};
