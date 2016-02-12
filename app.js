var argv = require('yargs').argv;
var fs = require('fs');
var _ = require('lodash');
var sync = require('./src/sync.js');
var yearToDate = require('./src/yearToDate.js');
var overall = require('./src/overall.js');

sync(argv.token, argv.club, function(err, activities) {
  checkErr(err)
  var activitiesForCurrentYear = getActivitiesForCurrentYear(activities);
  saveToFile('./data/ytd.json', yearToDate(activitiesForCurrentYear));
  saveToFile('./data/overall.json', overall(activitiesForCurrentYear));
});

function getActivitiesForCurrentYear(activities) {
  var fromDate = new Date(new Date().getFullYear(), 0, 1);
  return _.filter(activities, function(a) {
    return new Date(a.start_date) >= fromDate;
  });
}

function saveToFile(fileName, data) {
  fs.writeFile(fileName, JSON.stringify( data, null, 2 ), "utf8", function(err) {
    checkErr(err)
  });
}

function checkErr(err) {
  if(err) {
    console.error(err);
    return;
  }
}
