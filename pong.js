var path      = require('path');
var express   = require('express');
var app       = express();
var http      = require('http').Server(app);
var io        = require('socket.io')(http);
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

  buttonOne = new five.Button(2);
  buttonTwo = new five.Button(3);

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
