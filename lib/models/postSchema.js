const mongoose = require("mongoose");

const postSchema = {
  title: String,
  content: String,
  date: String,
};

module.exports = Post = mongoose.model("Post", postSchema);
