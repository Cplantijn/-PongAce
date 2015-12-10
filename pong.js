var path      = require('path');
var express   = require('express');
var app       = express();
var http      = require('http').Server(app);
var io        = require('socket.io')(http);
var config    = require('./config');
var sqlite3   = require('sqlite3').verbose();
var db        = new sqlite3.Database(config.dbFile);
var five      = require('johnny-five');

var board, btnOne, buttonTwo, btnOneDowned, btnTwoDowned,
    btnOneTimeout, btnTwoTimeout;

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

  btnOne = new five.Button(config.btnOnePin);
  btnOneDowned = false;

  btnTwo = new five.Button(config.btnTwoPin);
  btnTwoDowned = false;

  btnOne.on('down', function() {
    btnOneTimeout = setTimeout(function() {
      btnOneDowned = false;
    }, 333);
    io.emit('btnPress', 'Button One has been pressed!');
    if (btnOneDowned) {
      console.log('Button double clicked!');
    }
    btnOneDowned = true;
  });

  btnTwo.on('down', function() {
    btnTwoTimeout = setTimeout(function() {
      btnTwoDowned = false;
    }, 333);
    console.log('Button pressed!');
    io.emit('btnPress', 'Button Two has been pressed!');
    if (btnTwoDowned) {
      console.log('Those buttons were pressed together!');
    }
    btnTwoDowned = true;
  });

  btnTwo.on('hold', function() {
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
             doubles_losses INTEGER DEFAULT 0, \
             unique(first_name, last_name))");
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
              game_time DATETIME DEFAULT (datetime('now','localtime')),\
              game_type TEXT)");
  });
  console.log('history table created!')
  db.close();
}

// db.serialize(function() {
//   db.run("INSERT INTO history(team_one_player_id, team_two_player_id, team_one_point, team_two_point) VALUES('1','2','12','14')");
// });
// db.serialize(function() {
//   db.run("INSERT INTO profile(first_name, last_name, image_name) VALUES('Poop','Plantijn','asdasda.jpg')", function(err, res) {
//     console.log(err);
//   });
// });
// db.serialize(function() {
//   db.all("SELECT * FROM history", function(err, res) {
//     console.log(res);
//   });
// });
//
// db.serialize(function() {
//   db.all("SELECT * FROM profile", function(err, res) {
//     console.log(res);
//   });
// });
// db.close();
//
//createGameHistoryTable();
//createProfileTable();
