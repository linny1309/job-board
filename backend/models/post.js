const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  firstName: {type: String, required: true },
  lastName: {type: String, require: true },
  dob: {type: Date, required: true },
  state: {type: String, require: true },
  city: {type: String, required: true },
  zip: {type: String, require: true },
  institution: {type: String, required: true },
  degree: {type: String, require: true },
  gradYear: {type: Date, required: true },
  major: {type: String, require: true },
  minor: {type: String, required: true },
  org: {type: String, require: true },
  position: {type: String, required: true },
  jobStart: {type: Date, require: true },
  jobEnd: {type: Date, require: true },
  imagePath: { type: String, required: true }
})

module.exports = mongoose.model('Post', postSchema);
