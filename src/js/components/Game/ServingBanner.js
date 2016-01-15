import React, { Component } from 'react';
import classNames from 'classNames';

export default class ServingBanner extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { side } = this.props;
    const bnrCls = classNames({
      'banner': true,
      'group-two': side === 'groupTwo'
    });
    return (
      <div className={bnrCls}>
        <h2>Serving</h2>
      </div>
    );
  }
}

ServingBanner.propTypes = {
  side: React.PropTypes.string
};
