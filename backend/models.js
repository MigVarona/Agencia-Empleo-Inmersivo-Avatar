// models.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    id: String,
    title: String,
    sources: [String],
    description: String,
  });
  
  const Video = mongoose.model('Video', videoSchema);


module.exports = { Video };
