var config       = require('../config');
var sqlite3      = require('sqlite3').verbose();
var db           = new sqlite3.Database(config.dbFile);

function openConnection() {
  return new sqlite3.Database(config.dbFile)
}

exports.createProfileTable = function() {
  var db = openConnection();
  db.serialize(function() {
    db.run("CREATE TABLE profile ( \
             id INTEGER PRIMARY KEY, \
             name TEXT, \
             standard_pose_img_name TEXT DEFAULT 'default_standard.jpg', \
             winning_post_img_name TEXT DEFAULT 'default_winning.jpg', \
             solo_wins INTEGER DEFAULT 0, \
             solo_losses INTEGER DEFAULT 0, \
             doubles_wins INTEGER DEFAULT 0, \
             doubles_losses INTEGER DEFAULT 0, \
             updated_on DATETIME, \
             unique(name))");
   //Update trigger
   db.run("CREATE TRIGGER update_player \
           AFTER UPDATE ON profile \
             BEGIN \
               UPDATE profile SET updated_on = datetime('now','localtime') \
               WHERE id = NEW.id; \
             END;");
  });
  console.log('profile table and trigger created!')
  db.close();
}

exports.createGameHistoryTable = function() {
  var db = openConnection();
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

exports.createNewProfile = function(playerName, res) {
  var db = openConnection();
  db.serialize(function() {
    var stmt = db.prepare("INSERT INTO profile(name) VALUES(?)");
    stmt.run(playerName, function(err) {
      var result = err || true;
        dbCallback(result, res)
    });
    stmt.finalize();
  });
  db.close();
}

exports.fetchPlayers = function(filter, res) {
  var db = openConnection();
  db.serialize(function() {
    //Run a ? statement instead of string concatonation
    var sql = "SELECT * FROM profile \
               WHERE lower(name) LIKE '%"+filter+"%' \
               ORDER BY updated_on DESC";
    db.all(sql, function(err, result) {
      var response = err || result;
      dbCallback(response, res);
    })
  });
  db.close();
}

function dbCallback(e, res) {
  res.send(e)
}
