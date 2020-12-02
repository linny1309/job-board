const express = require("express");
const multer = require("multer");
const Post = require("../models/post");
const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Inavalid mime type");
    if(isValid) {
      error = null
    }
    cb(error,"images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext =MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

//Posting data for the first time

router.post("", multer({storage: storage}).single("image"), (req, res, next) => {
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
  post.save().then(result => {
    console.log("Post added successfully")
    console.log(result);
    res.status(201).json({
      message: 'Post added successfully'
    })
  });
});

//Updating existing posts

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
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
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({message: "Update successful"});
  })
});

//Getting posts from MongoDB to dynamically send and view on the front-end

router.get("", (req, res, next) => {
  Post.find().then(documents => {
      res.status(200).json({
        message: "Post fetched succesfully",
        posts: documents
    });
  });
});

//Dynamic param for fetching a post with a particular id

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if(post) {
      res.status(200).json(post);
    } else {
      res.send(404).json({message: 'Post not found'});
    };
  })
});

//Deleting a post from the backend

router.delete("/:id", (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
  })
  res.status(200).json({message: "Post deleted"});
});

module.exports = router;
