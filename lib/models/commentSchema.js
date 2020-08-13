const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  postId: String,
  user: String,
  comment: String,
  date: String,
});

module.exports = Comment = mongoose.model("Comment", commentSchema);
