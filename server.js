var harp = require('harp');
var server = require('harp-static');
var moment = require('moment');
var outputPath = __dirname + '/www';
var port = process.env.PORT || 9000;

global.idify = s => {
  return s.replace(/&.*?;/g, '')
          .replace(/\s+/g, '-')
          .replace(/[^\w\-]/g, '')
          .toLowerCase();
};

// this line, although dirty, ensures that Harp templates
// have access to moment - which given the whole partial
// import hack doesn't work consistently across dynamic vs
// compiled, this is the cleanest solution.
global.moment = moment;

if (process.env.NODE_ENV !== 'production') {
  // Yeah...don't ask.
  var config = require('./harp.json');
  Object.keys(config.globals).forEach(function (key) {
    global[key] = config.globals[key];
  });
  // </rando>
  var express = require('express');
  var app = express();

  app.use(express.static(__dirname + '/public'));
  app.use(harp.mount(__dirname + '/public'));

  var server = app.listen(port, function(){
    console.log('Listening at http://%s:%s', server.address().address, server.address().port);
  });
} else {
  harp.compile(__dirname, outputPath, (errors) => {
    if (errors) {
      console.log(JSON.stringify(errors, null, 2));
      process.exit(1);
    }

    console.log('Running harp-static on ' + port);
    server(outputPath, port);
  });
}
