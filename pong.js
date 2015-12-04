var path      = require('path');
var express   = require('express');
var app       = express();
var http      = require('http').Server(app);
var io        = require('socket.io')(http);

app.use('/', express.static(path.join(__dirname, 'public')));

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('ready to play on port ' + port);
});
