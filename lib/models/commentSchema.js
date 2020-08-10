const mongoose = require("mongoose");

const commentSchema = {
  postId: String,
  user: String,
  comment: String,
  date: String,
};

module.exports = Comment = mongoose.model("Comment", commentSchema);
