var argv = require('yargs').argv;
var strava = require('strava-v3');

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

function getClubMembers(clubId, next) {
  var options = {
    'access_token': argv.token,
    'id': clubId
  };

  strava.clubs.listMembers(options, next);
}

function processClubMembers(err, clubMembers) {
  checkError(err);
  console.log(clubMembers);
}

function checkError(err) {
  if(err){
    console.error(err);
    process.exit(1);
  }
}

init();
