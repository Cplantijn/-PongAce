var path         = require('path');
var express      = require('express');
var bodyParser   = require('body-parser');
var app          = express();
var http         = require('http').Server(app);
var io           = require('socket.io')(http);
var config       = require('./config');
var five         = require('johnny-five');
var db            = require('./db_actions');
var board, btnOne, buttonTwo, btnOneDowned, btnTwoDowned,
    btnOneTimeout, btnTwoTimeout;

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

//db.tester('UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE name="profile"');
//db.createGameHistoryTable();
//db.createProfileTable();
// io.on('connection', function() {
//   console.log('client connected');
// });

//API Routes
app.post('/create/player', function(req, res) {
  db.createNewProfile(req.body.name, res);
});

app.post('/fetch/players', function(req, res) {
  db.fetchPlayers(req.body.filter, res);
});

app.get('/fetch/player/:id', function(req, res) {
  db.fetchPlayerInfo(req.params.id, res);
});

app.post('/update/player/quote', function(req, res) {
  db.updatePlayerQuote(req.body.id, req.body.quote, res);
})

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

http.listen(port, function() {
  console.log('ready to play on port ' + port);
});
