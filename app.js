var argv = require('yargs').argv;
var fs = require('fs');
var sync = require('./src/sync.js');
var yearToDate = require('./src/yearToDate.js');
var overall = require('./src/overall.js');

sync(argv.token, argv.club, function(err, activities) {
  checkErr(err)
  saveToFile('./data/ytd.json', yearToDate(activities));
  saveToFile('./data/overall.json', overall(activities));
});

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
