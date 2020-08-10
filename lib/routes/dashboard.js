const express = require("express");
const router = express.Router();
const sessionstorage = require("sessionstorage");
const bcrypt = require("bcrypt");

const getDate = require('../../bin/postDate')

const Password = require("../models/passwordSchema");
const Comment = require("../models/commentSchema");
const Post = require("../models/postSchema");

router.get("/", function (req, res) {
  const auth = sessionstorage.getItem("password");

  Password.findOne({}, function (err, pass) {
    if (err) {
      console.log(err);
    } else if (pass) {
      bcrypt.compare(auth, pass.password, function (err, result) {
        if (result === true) {
          let commentList;

          Comment.find({}, function (err, comments) {
            if (err) {
              console.log(err);
            } else {
              commentList = comments;
            }
          });

          Post.find({}, function (err, posts) {
            if (err) {
              console.log(err);
            } else {
              res.render("dashboard/blogger", {
                posts: posts,
                comments: commentList,
              });
            }
          });
        }
      });
    } else {
      res.redirect("/login");
    }
  });
});

//Compose the post

router.post("/compose", function (req, res) {
  res.render("dashboard/compose");
});

router.post("/compose/new", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
    date: getDate(),
  });

  post.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

module.exports = router;
