const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Post = require('./models/post');
const app = express();
const postsRoutes = require("./routes/posts")

//Connecting to MongoDB database

mongoose.connect('mongodb://localhost:27017/lite-dash')
.then(() => {
  console.log("Connected to database")
})
.catch(() => {
  console.log("Connection failed")
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
