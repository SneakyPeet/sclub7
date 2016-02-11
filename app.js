var argv = require('yargs').argv;
var fs = require('fs');
var sync = require('./sync.js');
var yearToDate = require('./yearToDate.js');

sync(argv.token, argv.club, function(err, activities) {
  checkErr(err)

  var ytd = yearToDate(activities);
  fs.writeFile('./data/ytd.json', JSON.stringify( ytd ), "utf8", function(err) {
    checkErr(err)
  });
});

function checkErr(err) {
  if(err) {
    console.error(err);
    return;
  }
}
