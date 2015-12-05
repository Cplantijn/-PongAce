import React, { Component } from 'react'
import classNames from 'classnames'

export default class TeamCard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    var divClass = classNames('team-card-component', this.props.cardType)
    return (
      <div className={divClass}>
      </div>
    )
  }
}
