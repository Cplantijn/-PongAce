import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import classNames from 'classNames';

export default class LeaderboardOverlayItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { onClick, overlay } = this.props;
    const cls = classNames({
      'footer-icon-pair': true,
      'leaderboard': true,
      'active': (overlay.isOpen && overlay.activeIndex === 1)
    });
    return (
        <div
          className={cls}
          onClick={onClick.bind(this, 1)}>
          <FontAwesome
            className="footer-icon-icon"
            name="trophy"
            size="2x"
            title="Leader Boards"/>
            <span className="footer-icon-title">Leaderboard</span>
        </div>
    );
  }
}

LeaderboardOverlayItem.propTypes = {
  onClick: React.PropTypes.func,
  overlay: React.PropTypes.object
};
