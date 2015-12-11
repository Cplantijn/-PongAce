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
             standard_pose_img_loc TEXT, \
             winning_post_img_loc TEXT, \
             solo_wins INTEGER DEFAULT 0, \
             solo_losses INTEGER DEFAULT 0, \
             doubles_wins INTEGER DEFAULT 0, \
             doubles_losses INTEGER DEFAULT 0, \
             unique(name))");
  });
  console.log('profile table created!')
  db.close(function() {
    console.log('closing DB connection');
  });
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
  db.close(function() {
    console.log('closing DB connection');
  });
}

exports.createNewProfile = function(playerName, res) {
  var db = openConnection();
  db.serialize(function() {
    var stmt = db.prepare("INSERT INTO profile(name) VALUES(?)");
    stmt.run(playerName, function(err) {
      if (err) {
        dbCallback(err, res)
        return
      } else {
        dbCallback(true, res)
        return
      }
    });
    stmt.finalize();
  });
  db.close();
}

exports.fetchPlayers = function() {
  var db = openConnection();
  db.serialize(function() {
    db.all("SELECT * FROM profile", function(err, res) {
      console.log(res);
    });
  });
  db.close(function() {
    console.log('closing DB connection');
  });
}

function dbCallback(e, res) {
  res.send(e)
}
// exports.closeConnection = function() {
//   db.close();
// }
// db.serialize(function() {
//   db.run("INSERT INTO history(team_one_player_id, team_two_player_id, team_one_point, team_two_point) VALUES('1','2','12','14')");
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
