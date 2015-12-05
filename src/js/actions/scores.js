var actions = exports = module.exports

exports.ADD_POINT = 'ADD_POINT'

exports.addPoint = function addPoint(player) {
  return {
    type: actions.ADD_POINT,
    player: player
  }
}