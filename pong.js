var path      = require('path');
var express   = require('express');
var app       = express();
var http      = require('http').Server(app);
var io        = require('socket.io')(http);
var config    = require('./config');
var sqlite3   = require('sqlite3').verbose();
var db        = new sqlite3.Database(config.dbFile);
var five      = require('johnny-five');
var board, buttonOne, buttonTwo;

app.use('/', express.static(path.join(__dirname, 'public')));

var port = process.env.PORT || 3000;

http.listen(port, function() {
  console.log('ready to play on port ' + port);
});

io.on('connection', function() {
  console.log('client connected');
});

board = new five.Board();
board.on('ready', function() {

  buttonOne = new five.Button(config.buttonOnePin);
  buttonTwo = new five.Button(config.buttonTwoPin);

  buttonOne.on('down', function() {
    io.emit('btnPress', 'Button One has been pressed!');
  });

  buttonTwo.on('down', function() {
    io.emit('btnPress', 'Button Two has been pressed!');
    console.log('btn down')
  });
  buttonTwo.on('up', function() {
    io.emit('btnPress', 'Button Two has been pressed!');
    console.log('btn up')
  });
  buttonTwo.on('hold', function() {
    io.emit('btnPress', 'Button Two has been pressed!');
    console.log('btn held')
  });
});

function createProfileTable() {
  db.serialize(function() {
    db.run("CREATE TABLE profile ( \
             id INTEGER PRIMARY KEY, \
             first_name TEXT, \
             last_name TEXT, \
             image_name TEXT, \
             solo_wins INTEGER DEFAULT 0, \
             solo_losses INTEGER DEFAULT 0, \
             doubles_wins INTEGER DEFAULT 0, \
             doubles_losses INTEGER DEFAULT 0)");
  });
  console.log('profile table created!')
  db.close();
}

function createGameHistoryTable() {
  db.serialize(function() {
    db.run("CREATE TABLE history (\
              id INTEGER PRIMARY KEY, \
              team_one_player_id TEXT, \
              team_two_player_id TEXT, \
              team_one_point INTEGER, \
              team_two_point INTEGER, \
              game_type TEXT)");
  });
  console.log('history table created!')
  db.close();
}
