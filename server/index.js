var express = require('express');
var bodyParser = require('body-parser');


var app = express();
module.exports = app;

app.use(bodyParser.urlencoded());
app.use( bodyParser.json() );


var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './github-fetcher.sqlite3'
  }
});


app.post('/repos/import', function (req, res) {
  console.log("req.body", req.body)
  res.status(200);
  res.end("test end");
});


app.get('/repos', function (req, res) {
  console.log("get /repos")
  res.status(200);
  res.end("test end")
});


app.get('/', function (req, res) {
  //res.sendFile(__dirname + '/client/index.html')
  //not sure why this __dirname isnt working oh well
  res.sendFile('/Users/nbaumg/fullstack-exercise/hratx25-fullstack-exercise/client/index.html')
});

var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);
