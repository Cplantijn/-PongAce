var actions = exports = module.exports

exports.ADD_POINT = 'ADD_POINT'
exports.ADD_TEAM = 'ADD_TEAM'

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
