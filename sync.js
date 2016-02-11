var strava = require('strava-v3');
var _ = require('lodash');
var fs = require("fs");

function sync(token, club, callback) {
  var outputPath = './data/activities.json';
  var activityHistory;

  if (!token) {
      console.error('Strava access_token required. See http://strava.github.io/api/#access. Use --token=<access_token>');
      return;
  }
  else if (!club) {
      console.error('Strava club id required. See http://strava.github.io/api. Use --club=<clubid>');
      return;
  }

  function init() {
    getOrCreateActivityHistory(outputPath, function (err, history) {
      checkError(err);
      activityHistory = history;
      syncClubActvities(club, processClubActivities);
    });
  }

  function getOrCreateActivityHistory(path, callback) {
    makeDirIfNotExists('./data/');
    try {
      fs.statSync(path);
      callback(null, require(path));
    }
    catch (e) {
      fs.writeFile(path, '[]', function (err2) {
        callback(err2, []);
      });
    }
  }

  function makeDirIfNotExists(path) {
    try {
      fs.statSync(path);
    }
    catch (e) {
      fs.mkdirSync(path);
    }
  }

  function syncClubActvities(clubId, callback) {
    var options = {
      'access_token': token,
      'id': clubId
    };

    console.info('Current activity total: ' + activityHistory.length);
    console.info('Get Club Activities');
    strava.clubs.listActivities(options, callback);
  }

  function processClubActivities(err, activities) {
    checkError(err);
    var combinedActivities = _.concat(activityHistory, activities);
    console.info('Combined activity total: ' + combinedActivities.length);

    var uniqueActivities = _.uniqWith(combinedActivities, function(a, b) {
      return a.id === b.id;
    });

    console.info('Saving Activities to ' + outputPath);
    console.info('New activity total: ' + uniqueActivities.length);
    fs.writeFile(outputPath, JSON.stringify( uniqueActivities ), "utf8", function (err) {
      checkError(err);
      callback(null, uniqueActivities);
    });
  }

  function checkError(err) {
    if(err){
      callback(err);
    }
  }

  init();
}

module.exports = sync;
