import React, { Component } from 'react'
import classNames from 'classnames'
import Score from './Score'
import CardBottom from './CardBottom'
import CardEmpty from './CardEmpty'
import _ from 'underscore'

export default class CardTeam extends Component {
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
        cardBody = <CardEmpty {...this.props} />
    }

    return (
      <div className={divClass}>
        {cardBody}
      </div>
    )
  }
}
