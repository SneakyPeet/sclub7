var argv = require('yargs').argv;
var sync = require('./sync.js');

sync(argv.token, argv.club, function(err) {
  if(err) {
    console.error(err);
  }

  console.log('Done');
});
