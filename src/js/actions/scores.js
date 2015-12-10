var actions = exports = module.exports

exports.ADD_POINT = 'ADD_POINT'
exports.ADD_TEAM = 'ADD_TEAM'
exports.SHOW_MENU = 'SHOW_MENU'
exports.HIDE_MENU = 'HIDE_MENU'
exports.CREATE_NEW_PLAYER = 'CREATE_NEW_PLAYER'


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

exports.showMenu = function(menuIndex) {
  return {
    type: actions.SHOW_MENU,
    menuIndex: menuIndex
  }
}

exports.createNewPlayer = function(playerName) {
  return {
    type: actions.CREATE_NEW_PLAYER,
    playerName: playerName
  }
}

exports.hideMenu = function() {
  return {
    type: actions.HIDE_MENU
  }
}
