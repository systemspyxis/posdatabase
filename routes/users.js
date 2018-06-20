var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', function (req, res, next) {
  console.log(req.body);
  var mysql = require('mysql')
  var connection = mysql.createConnection({
      host: 'localhost',
      user: 'pyxis',
      password: '@Pyxis123',
      database: 'pyxis',
      insecureAuth: true
  });
/* Create new user */
  connection.connect()
  var query = 'INSERT INTO users (UserID,UserName,FirstName,LastName,Email,Password) ';
  query = query + "values ('" + newGuid() + "','" + req.body['UserName'] + "','" + req.body['FirstName'] + "','" + req.body['LastName'] + "','" + req.body['Email'] + "','" + req.body['Password'] + "');";
  console.log(query);
  connection.query(query, function (err, rows, fields) {
      if (err) {
          console.log(err.code);
          res.json(err.code);
      }
      else {
          console.log(rows);
          res.json(req.body);
      }
  })
  connection.end()
});

router.post('/login', function (req, res, next) {
  console.log(req.body);
  var mysql = require('mysql')
  var connection = mysql.createConnection({
      host: 'localhost',
      user: 'pyxis',
      password: '@Pyxis123',
      database: 'pyxis',
      insecureAuth: true
  });
/* Create new user */
  connection.connect()
  var query = "SELECT * FROM  users WHERE UserName='"+req.body['UserName'] +"'";
  
  console.log(query);
  connection.query(query, function (err, rows, fields) {
      if (err) {
          console.log(err.code);
          res.json(err.code);
      }
      else {
          console.log(rows);
          res.json(rows[0]);
      }
  })
  connection.end()
});

function newGuid() {
  var sGuid="";
  for (var i = 0; i < 32; i++) {
    sGuid+=Math.floor(Math.random()*0xF).toString(0xF);
    
  }
  return sGuid;
  
}
module.exports = router;
