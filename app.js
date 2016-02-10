var argv = require('yargs').argv;
var strava = require('strava-v3');
var async = require('async');
var _ = require('lodash');
var activityHistory = require('./data/activities.json');
var fs = require("fs");

console.log('Current activity total: ' + activityHistory.length);

if (!argv.token) {
    console.error('Strava access_token required. See http://strava.github.io/api/#access. Use --token=<access_token>');
    return;
}
else if (!argv.club) {
    console.error('Strava club id required. See http://strava.github.io/api. Use --club=<clubid>');
    return;
}

function init() {
  getClubActvities(argv.club, processClubActivities);
}

function getClubActvities(clubId, callback) {
  var options = {
    'access_token': argv.token,
    'id': clubId
  };

  console.info('Get Club Activities');
  strava.clubs.listActivities(options, callback);
}

function processClubActivities(err, activities) {
  checkError(err);
  var combinedActivities = _.concat(activityHistory, activities);
  console.log('Combined activity total: ' + combinedActivities.length);

  var uniqueActivities = _.uniqWith(combinedActivities, function(a, b) {
    return a.id === b.id;
  });

  console.log('Saving Activities to data/activities.json');
  console.log('New activity total: ' + uniqueActivities.length);
  fs.writeFile( "data/activities.json", JSON.stringify( uniqueActivities ), "utf8", checkError);
}

function checkError(err) {
  if(err){
    console.error(err);
    process.exit(1);
  }
}

init();
