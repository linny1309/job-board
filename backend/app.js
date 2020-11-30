const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Post = require('./models/post');
const app = express();
const postsRoutes = require("./routes/posts");
var mysql = require("mysql");

//Connecting to MongoDB database

mongoose.connect('mongodb://localhost:27017/lite-dash')
.then(() => {
  console.log("Connected to database")
})
.catch(() => {
  console.log("Connection failed")
});

//Connecting to MySQL Database

var connection = mysql.createConnection({
  //properties
      host:'localhost',
      user:'root',
      password: 'nopasswordhere0530',
      database: 'argilach_dashboard'
});

// Start our server on port 4201
app.listen(8801, '127.0.0.1', function() {
  console.log("Server now listening on 8801");
});

connection.connect(function(error) {
  if(!!error) {
      console.log(error);
  }
  else {
      console.log('Connected');
      app.get('/', function(req, resp) {
        connection.query('SELECT * FROM visual WHERE chart_type = \"gran_chart\"', function(error,rows,fields) {
            if(!!error){
                console.log('Error in the query');
            }
            else {
                app.post("", (req, res, next) => {
                  fields
                })
                console.log(fields);
                data = rows;
            }
        })
      });
  }
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;
