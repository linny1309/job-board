const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Post = require('./models/post');
const app = express();

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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob,
    state: req.body.state,
    city: req.body.city,
    zip: req.body.zip,
    institution: req.body.institution,
    degree: req.body.degree,
    gradYear: req.body.gradYear,
    major: req.body.major,
    minor: req.body.minor,
    org: req.body.org,
    position: req.body.position,
    jobStart: req.body.jobStart,
    jobEnd: req.body.jobEnd
  });
  post.save();
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents => {
      res.status(200).json({
        message: "Post fetched succesfully",
        posts: documents
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
  })
  res.status(200).json({message: "Post deleted"});
});

module.exports = app;
