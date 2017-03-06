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
  var insert = true;

  knex.select('RepoName').from('repos')
    .then(function(resp){
      resp.forEach(function(item){
        if(req.body.repoName === item.RepoName){
          insert = false;
        }
      })
    }).then(function(){
      if(insert){
        knex('repos').insert({RepoName: req.body.repoName, ownersName: req.body.ownerName, stargazers: req.body.stargazers})
          .then(function(resp){
            console.log("insert worked!", resp)
          })
          .catch(function(err, data){
            console.log("error inserting into repos", err)
          })
      }
    })
  res.status(200);
  res.end();
});

app.get('/repos', function (req, res) {
  var tableHTML = '<table border="1">';
  res.status(200);
  knex.select('*').from('repos')
    .then(function(resp){
      resp = resp.sort(function(a, b){
        return b.stargazers - a.stargazers;
      })
      tableHTML += '<tr>';
      tableHTML += '<td> Repo Name </td>'
      tableHTML += '<td> Owner\'s Name </td>'
      tableHTML += '<td> Stargazers </td>'
      tableHTML += '</tr>';
      tableHTML += '<tr>';
      tableHTML += '<td></td>'
      tableHTML += '<td></td>'
      tableHTML += '<td></td>'
      tableHTML += '</tr>';
      resp.forEach(function(item){
        tableHTML += '<tr>';
        tableHTML += '<td>'+ item.RepoName + '</td>';
        tableHTML += '<td><a href=https://github.com/' + item.ownersName + ' style="display:block;">&nbsp;</a></td>';
        tableHTML += '<td>' + item.stargazers + '</td>'
        tableHTML += '</tr>';
      })
      tableHTML += '</table>'
      res.end(tableHTML)
    })
});

//<td><a href="..." style="display:block;">&nbsp;</a></td>



app.get('/', function (req, res) {
  //res.sendFile(__dirname + '/client/index.html')
  //not sure why this __dirname isnt working oh well
  res.sendFile('/Users/nbaumg/fullstack-exercise/hratx25-fullstack-exercise/client/index.html')
});

var port = process.env.PORT || 4040;
app.listen(port);
console.log("Listening on port " + port);
