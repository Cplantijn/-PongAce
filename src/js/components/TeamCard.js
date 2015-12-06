import React, { Component } from 'react'
import classNames from 'classnames'
import Score from './Score'
import CardBottom from './CardBottom'
import TeamJoin from './TeamJoin'

export default class TeamCard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props);
    var cardContent;
    var teamIndex;
    var divClass = classNames({
      'team-card-component': true,
      'team-1': this.props.cardType == 'team-1',
      'team-2': this.props.cardType == 'team-2',
      'inactive': !this.props.active
    });
    if (this.props.cardType == 'team-1') {
      teamIndex = 0;
    } else if (this.props.cardType == 'team-2') {
      teamIndex = 1;
    }
    if (this.props.active) {
      cardContent = <Score isServing={this.props.isServing} score={this.props.score}/>
    } else {
      cardContent = <TeamJoin teamIndex={teamIndex} team={this.props.cardType} addTeam={this.props.addTeam}/>
    }
    return (
      <div className={divClass}>
        {cardContent}
        <CardBottom / >
      </div>
    )
  }
}
