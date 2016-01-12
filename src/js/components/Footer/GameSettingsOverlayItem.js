import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import classNames from 'classNames';

export default class GameSettingsOverlayItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { onClick, overlay } = this.props;
    const cls = classNames({
      'footer-icon-pair': true,
      'settings': true,
      'active': (overlay.isOpen && overlay.activeIndex === 3)
    });
    return (
      <div
        className={cls}
        onClick={onClick.bind(this, 3)}>
        <FontAwesome
          className="footer-icon-icon"
          name="wrench"
          size="2x"
          title="Settings"/>
          <span className="footer-icon-title">Game Settings</span>
      </div>
    );
  }
}

GameSettingsOverlayItem.propTypes = {
  onClick: React.PropTypes.func,
  overlay: React.PropTypes.object
};
