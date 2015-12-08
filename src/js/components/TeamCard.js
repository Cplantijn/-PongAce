import React, { Component } from 'react'
import classNames from 'classnames'
import Score from './Score'
import CardBottom from './CardBottom'
import EmptyCard from './EmptyCard'
import _ from 'underscore'

export default class TeamCard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    var { cardData, teamIndex } = this.props,
        teamPresent = _.size(cardData[teamIndex]),
        cardBody

    var divClass = classNames({
      'team-card-component': true,
      'inactive': !teamPresent,
      'active': teamPresent
    })
    if (teamPresent) {
        cardBody = <div>
                      <Score
                       score={cardData} />
                      <CardBottom />
                  </div>
    } else {
        cardBody = <EmptyCard {...this.props} />
    }

    return (
      <div className={divClass}>
        {cardBody}
      </div>
    )
  }
}
