const express = require("express");
const router = express.Router();

const getDate = require('../../bin/postDate')

const Comment = require('../models/commentSchema')

router.post("/", function (req, res) {
  const comment = new Comment({
    postId: req.body.postId,
    user: req.body.commenter,
    comment: req.body.commentInput,
    date: getDate(),
  });

  comment.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect(req.get("referer"));
    }
  });
});

router.post("/delete", function (req, res) {
  const commentId = req.body.commentForDelete;

  Comment.findOneAndDelete({ _id: commentId }, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/dashboard");
    }
  });
});

module.exports = router;