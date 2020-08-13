const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  content: String,
  date: String,
});

module.exports = Post = mongoose.model("Post", postSchema);
