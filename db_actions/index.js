var config   = require('../config');
var sqlite3  = require('sqlite3').verbose();
var db       = new sqlite3.Database(config.dbFile);
var colors   = require('colors');

function openConnection() {
  return new sqlite3.Database(config.dbFile)
}

exports.initTable = function() {
  var db = openConnection();
  db.serialize(function() {
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='profile'", function(err, result){
      if (err) console.log('An error has occured.');
      if (!result) {
        db.serialize(function() {
          console.log('profiles table not found. Creating new profiles table.'.underline.white.bgMagenta.bold);
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
          console.log('Finished creating profiles table'.bgGreen.red.bold);
      }
    });

    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='settings'", function(err, result){
      if (err) console.log('An error has occured.');
      if (!result) {
        console.log('settings table  not found. Creating new settings table.'.underline.white.bgMagenta.bold);
        db.serialize(function() {
          db.run("CREATE TABLE settings ( \
                  id INTEGER PRIMARY KEY, \
                  game_point INTEGER, \
                  serve_interval INTEGER)");
         db.run("INSERT INTO settings(game_point, serve_interval) VALUES(21, 5)");
            console.log('Finished creating settings table'.bgGreen.red.bold);
        });
      }
    });

    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='history'", function(err, result) {
      if (err) console.log('An error has occured.');
      if (!result) {
        console.log('history table  not found. Creating new history table.'.underline.white.bgMagenta.bold);
        db.serialize(function() {
          db.run("CREATE TABLE history (\
                    id INTEGER PRIMARY KEY, \
                    type TEXT, \
                    log TEXT, \
                    team_one_player_id TEXT, \
                    team_two_player_id TEXT, \
                    team_one_point TEXT, \
                    team_two_point TEXT, \
                    game_time DATETIME DEFAULT (datetime('now','localtime')))");
        });
        console.log('Finished creating history table'.bgGreen.red.bold);
      }
    });
  });
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

exports.saveSetting = function(column, value, res) {
  var db = openConnection();
  var sql = "UPDATE settings SET "+ column +" ='"+value+"' WHERE id = 1";
  db.run(sql, function(err) {
    var result = err || true;
      dbCallback(result, res)
  });
  db.close();
}

exports.fetchSettings = function(res) {
  var db = openConnection();
  db.serialize(function() {
    var sql = "SELECT game_point AS gamePoint, \
              serve_interval AS serveInterval \
              FROM settings \
              WHERE id=1";
    db.get(sql, function(err, result) {
      var response = err || result;
      dbCallback(response, res);
    })
  })
  db.close();
}

exports.fetchHistory = function(res) {
  var db = openConnection();
  db.serialize(function() {
    var sql = "SELECT * FROM history";
    db.all(sql, function(err, result) {
      var response = err || result;
      dbCallback(response, res);
    })
  })
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

exports.saveHistory = function(groupOne, groupTwo, log, type, res) {
  log = JSON.stringify(log);
  var db = openConnection();
  db.serialize(function() {
    var stmt = db.prepare("INSERT INTO history(type, log, team_one_player_id, \
                          team_two_player_id, team_one_point, team_two_point) \
                          VALUES(?, ?, ?, ?, ?, ?)");
    var groupOneIds = groupOne.id.join(',');
    var groupTwoIds = groupTwo.id.join(',');
    var groupOneScore = JSON.stringify({
      score: groupOne.score,
      rawScore: groupOne.rawScore
    });
    var groupTwoScore = JSON.stringify({
      score: groupTwo.score,
      rawScore: groupTwo.rawScore
    });
    var params = [type, log, groupOneIds, groupTwoIds, groupOneScore, groupTwoScore];
    stmt.run(params, function(err) {
      var result = err || true;
      dbCallback(result, res);
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

function dbCallback(e, res) {
  res.send(e)
}
