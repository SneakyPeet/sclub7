var argv = require('yargs').argv;
var strava = require('strava-v3');
var async = require('async');

if (!argv.token) {
    console.error('Strava access_token required. See http://strava.github.io/api/#access. Use --token=<access_token>');
    return;
}
else if (!argv.club) {
    console.error('Strava club id required. See http://strava.github.io/api. Use --club=<clubid>');
    return;
}

function init() {
  getClubMembers(argv.club, processClubMembers);
}

function getClubMembers(clubId, callback) {
  var options = {
    'access_token': argv.token,
    'id': clubId
  };

  console.info('Get Club Members');
  strava.clubs.listMembers(options, callback);
}

function processClubMembers(err, clubMembers) {
  checkError(err);
  async.map(clubMembers, getMemberStatsFunction, getStatsForMembers)
}

function getMemberStatsFunction(member, callback) {
  function getMemberStats(callback) {
    var options = {
      'access_token': argv.token,
      'id': member.id
    }

    strava.athletes.stats(options, callback);
  };

  callback(null, getMemberStats);
}

function getStatsForMembers(err, statFunctions) {
  checkError(err);
  console.info('Get Club Members Stats');
  console.log(statFunctions);
}

function checkError(err) {
  if(err){
    console.error(err);
    process.exit(1);
  }
}

init();
