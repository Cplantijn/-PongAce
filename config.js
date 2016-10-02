/* Pool is the seed that is given to the Chance.js module to create random file
   names for images. Set to whatever you'd like. */
var pool = 'abcdefghijklmnopqrstuvwxyz';
pool = pool + pool.toUpperCase() + '_0123456789';

module.exports = {
  'dbFile': 'pong.db', //name of the flat DB file created and used by SQLite
  'boardPort': 'YOUR_ARDUINOS_BLUE_TOOTH_NAME', //Name of Bluetooth transceiver connected to arduino. do `ls -al /dev/` to see yours once connected.
  'btnOne': {
    'pin': 10, // Signal port for the arduino board button one is connected to.
    'holdtime': 800 //m.s of how long button needs to be held for a "hold" to be registered.
  },
  'btnTwo': {
    'pin': 11, // Signal port for the arduino board button two is connected to.
    'holdtime': 800 //m.s of how long button needs to be held for a "hold" to be registered.
  },
  'overlayScreens': { //Colors used in panel. Will probably deprecate this soon and use 100% sass values. Make sure these colors and the `colors.scss` files are consistent.
    'profiles': {
      'backgroundColor': '#00213b',
      'pageTextColor': '#fff',
      'menuIconColor': '#00213b'
    },
    'leaderboard': {
      'backgroundColor': '#f18f01',
      'pageTextColor': '#fff',
      'menuIconColor': '#f18f01'
    },
    'history': {
      'backgroundColor': '#a22c29',
      'pageTextColor': '#fff',
      'menuIconColor': '#a22c29'
    },
    'settings': {
      'backgroundColor': '#355834',
      'pageTextColor': '#fff',
      'menuIconColor': '#355834'
    },
    'characterSelect': {
      'backgroundColor': '#828A95',
      'pageTextColor': '#333'
    }
  },
  'mode': 'production',
  'imageDir': './player_img/', // Directory for storing and accessing player images.
  'imageTempDir': './uploads/', // Temporary holder for images so resizing and naming can be done on the completed image.
  'imageNameSeed': pool //See above definition for pool.js
}
