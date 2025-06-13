
var express = require('express');
var app = express();
var fs = require("fs");
app.get('/', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      res.end( data );
   });
})

app.get('/:id', function (req, res) {
   fs.readFile(__dirname + "/users.json", 'utf8', function (err, data) {
      if (err) {
         return res.status(500).send("Error reading file"); // Handle file read errors
      }
      const users = JSON.parse(data); // Parse JSON data
      const user = users["user" + req.params.id]; // Look up the user
      if (!user) {
         return res.status(404).send("User not found"); // Handle non-existent user
      }
      res.json(user); // Return user as JSON response
   });
});

var bodyParser = require('body-parser')
app.use( bodyParser.json() );      
app.use(bodyParser.urlencoded({  extended: true }));

app.post('/', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      var users = JSON.parse( data );
      var user = req.body.user4;
      users["user"+user.id] = user
      res.end( JSON.stringify(users));
   });
})

app.delete('/:id', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      var id = "user"+req.params.id;
      var user = data[id];
      delete data[ "user"+req.params.id];
      res.end( JSON.stringify(data));
   });
})
app.put("/:id", function(req, res) {
      fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      
      var users = JSON.parse( data );
      var id = "user"+req.params.id;
      
      users[id]=req.body;
      res.end( JSON.stringify(users));
   })

})
var server = app.listen(5000,'0.0.0.0', function () {
   console.log("Express App running at http://127.0.0.1:5000/");
})


module.exports = app;
