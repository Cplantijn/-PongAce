
var pool = 'abcdefghijklmnopqrstuvwxyz';
pool = pool + pool.toUpperCase() +'_0123456789';
module.exports = {
  'dbFile':'pong.db',
  'btnOnePin': 2,
  'btnTwoPin': 3,
  'overlayScreens': {
    'profiles': {
      'backgroundColor':'#00213b',
      'pageTextColor': '#fff',
      'menuIconColor':'#00213b'
    },
    'leaderboards': {
      'backgroundColor':'#f18f01',
      'pageTextColor': '#fff',
      'menuIconColor':'#f18f01'
    },
    'history': {
      'backgroundColor':'#a22c29',
      'pageTextColor': '#fff',
      'menuIconColor':'#a22c29'
    },
    'settings': {
      'backgroundColor':'#355834',
      'pageTextColor': '#fff',
      'menuIconColor':'#355834'
    },
    'characterSelect': {
      'backgroundColor':'#f7ff7',
      'pageTextColor':'#333'
    }
  },
  'imageDir':'./player_img/',
  'imageTempDir': './uploads/',
  'imageNameSeed': pool
}
