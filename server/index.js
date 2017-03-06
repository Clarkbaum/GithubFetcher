var express = require('express');
var bodyParser = require('body-parser');


var app = express();
module.exports = app;

app.use( bodyParser.json() );


var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './github-fetcher.sqlite3'
  }
});


app.post('/repos/import', function (req, res) {
  // TODO
});


app.get('/repos', function (req, res) {
  // TODO
});


app.get('/', function (req, res) {
  console.log("dirname", __dirname)
  //res.sendFile(__dirname + '/client/index.html')
  //not sure why this __dirname isnt working oh well
  res.sendFile('/Users/nbaumg/fullstack-exercise/hratx25-fullstack-exercise/client/index.html')
});

var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);
