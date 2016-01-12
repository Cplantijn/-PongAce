import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import classNames from 'classNames';

export default class HistoryOverlayItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { onClick, overlay } = this.props;
    const cls = classNames({
      'footer-icon-pair': true,
      'history': true,
      'active': (overlay.isOpen && overlay.activeIndex === 2)
    });
    return (
        <div
          className={cls}
          onClick={onClick.bind(this, 2)}>
          <FontAwesome
            className="footer-icon-icon"
            name="history"
            size="2x"
            title="Match History"/>
            <span className="footer-icon-title">Match History</span>
        </div>
    );
  }
}

HistoryOverlayItem.propTypes = {
  onClick: React.PropTypes.func,
  overlay: React.PropTypes.object
};
