var config       = require('../config');
var sqlite3      = require('sqlite3').verbose();
var db           = new sqlite3.Database(config.dbFile);

function openConnection() {
  return new sqlite3.Database(config.dbFile)
}

exports.createSettingsTable = function() {
  var db = openConnection();
  db.serialize(function() {
    // db.run("DROP TABLE settings");
    db.run("CREATE TABLE settings ( \
            id INTEGER PRIMARY KEY, \
            game_point INTEGER, \
            serve_interval INTEGER)");
    db.run("INSERT INTO settings(game_point, serve_interval) VALUES(21, 5)");
  });
  console.log('created settings table');
  db.close();
}
exports.createProfileTable = function() {
  var db = openConnection();
  db.serialize(function() {
    db.run("CREATE TABLE profile ( \
             id INTEGER PRIMARY KEY, \
             name TEXT, \
             color TEXT, \
             quote TEXT, \
             standard_pose_img_name TEXT DEFAULT 'default_standard.jpg', \
             winning_pose_img_name TEXT DEFAULT 'default_winning.jpg', \
             singles_wins INTEGER DEFAULT 0, \
             singles_losses INTEGER DEFAULT 0, \
             doubles_wins INTEGER DEFAULT 0, \
             doubles_losses INTEGER DEFAULT 0, \
             updated_on DATETIME, \
             unique(name))");
   //Update and Create trigger
   //TODO: Figure out how to do both update and insert in one command is poss.
   db.run("CREATE TRIGGER update_player \
           AFTER UPDATE ON profile \
             BEGIN \
               UPDATE profile SET updated_on = datetime('now','localtime') \
               WHERE id = NEW.id; \
             END;");
   db.run("CREATE TRIGGER insert_player \
           AFTER INSERT ON profile \
             BEGIN \
               UPDATE profile SET updated_on = datetime('now','localtime') \
               WHERE id = NEW.id; \
             END;");
  });
  console.log('profile table and trigger created!')
  db.close();
}

exports.updatePlayerPicture = function(id, picType, fullName, res) {
  var column = picType === 'standard' ? 'standard_pose_img_name' : 'winning_pose_img_name';
  var db = openConnection();
    db.serialize(function() {
      var sql = 'UPDATE profile SET '+column+'="'+fullName+'" WHERE id='+id;
      db.run(sql, function(err) {
        var result = err || true;
          dbCallback(result, res);
      });
    });
    db.close();
}

exports.savePlayerWinLoss = function(gameType, winners, losers, res) {
  var db = openConnection();
  var winCol = gameType == 'singles' ? 'singles_wins': 'doubles_wins';
  var loseCol = gameType == 'singles' ? 'singles_losses': 'doubles_losses';

  db.serialize(function(){
    var sqlWin = "UPDATE profile SET "+winCol+" = "+winCol+" + 1 WHERE id IN ("+winners+")";
    db.run(sqlWin, function(err) {
      if(!err) {
        var sqlLoss = "UPDATE profile SET "+loseCol+" = "+loseCol+" + 1 WHERE id IN ("+losers+")";
        db.run(sqlLoss, function(err) {
          var result = err || true;
            dbCallback(result, res);
        })
      } else {
        dbCallback(err, res);
      }
    })
  })
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

exports.saveSetting = function(column, value, res) {
  var db = openConnection();
  var sql = "UPDATE settings SET "+ column +" ='"+value+"' WHERE id = 1";
  db.run(sql, function(err) {
    var result = err || true;
      dbCallback(result, res)
  });
  db.close();
}

exports.loadSettings = function(res) {
  var db = openConnection();
  db.serialize(function() {
    var sql = "SELECT game_point, serve_interval WHERE id=1";
    db.get(sql, function(err, result) {
      var response = err || result;
      dbCallback(response, res);
    })
  })
  db.close();
}

exports.updatePlayerQuote = function(id, quote, res) {
  var db = openConnection();
  var sql = "UPDATE profile SET quote ='"+quote+"' WHERE id ="+id;
  db.serialize(function() {
    db.run(sql, function(err) {
      var result = err || true;
        dbCallback(result, res)
    });
  });
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

exports.fetchPlayerInfo = function(playerId, res) {
  var db = openConnection();
  db.serialize(function() {
    var sql = "SELECT id, name, color, quote, \
               standard_pose_img_name AS 'standardPose', \
               winning_pose_img_name AS 'winningPose', \
               singles_wins AS 'singlesWins', singles_losses AS 'singlesLosses', \
               doubles_wins AS 'doublesWins', doubles_losses AS 'doublesLosses' \
               FROM profile WHERE id=?";
    db.get(sql, playerId, function(err, result) {
      var response = err || result;
      dbCallback(response, res);
    })
  })
  db.close();

}

exports.fetchPlayers = function(filter, sort, res) {
  var db = openConnection();
  db.serialize(function() {
    //Run a ? statement instead of string concatonation
    var sql = "SELECT id, name, standard_pose_img_name AS standardPose, \
                      winning_pose_img_name AS winningPose, \
                      (singles_wins + doubles_wins) AS wins, \
                      (singles_losses + doubles_losses) as losses \
              FROM profile \
               WHERE lower(name) LIKE '%"+filter+"%' \
               ORDER BY " +sort;
    db.all(sql, function(err, result) {
      if (!err) {
        result = result.map(function(e) {
          e.selected = false;
          e.highlight = false;
          return e;
        })
      }
      var response = err || result;
      dbCallback(response, res);
    })
  });
  db.close();
}

exports.tester = function(query) {
  var db = openConnection();
  db.serialize(function() {
    db.exec(query, function(err, result) {
      var response = err || result;
      console.log(response);
    })
  });
  db.close();
}
function dbCallback(e, res) {
  res.send(e)
}
