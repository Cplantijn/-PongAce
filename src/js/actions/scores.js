var actions = exports = module.exports

exports.ADD_POINT = 'ADD_POINT'
exports.ADD_TEAM = 'ADD_TEAM'
exports.SHOW_PLAYER_MODAL = 'SHOW_PLAYER_MODAL'
exports.HIDE_PLAYER_MODAL = 'HIDE_PLAYER_MODAL'


exports.addPoint = function(index) {
  return {
    type: actions.ADD_POINT,
    teamIndex: index
  }
}

exports.addTeam = function(index, name) {
  return {
    type: actions.ADD_TEAM,
    cardIndex: index,
    name: name
  }
}

exports.showPlayerModal = function() {
  return {
    type: actions.SHOW_PLAYER_MODAL
  }
}

exports.hidePlayerModal = function() {
  return {
    type: actions.HIDE_PLAYER_MODAL
  }
}
