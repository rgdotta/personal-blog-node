const express = require("express");
const router = express.Router();
const svgCaptcha = require("svg-captcha");

const getDate = require("../../bin/postDate");

const Comment = require("../models/commentSchema");
const Post = require("../models/postSchema");

//GET

router.get("/:postId", function (req, res) {
  const requestedPostId = req.params.postId;
  const captcha = svgCaptcha.create();
  let comments;

  Comment.find({ postId: requestedPostId }, function (err, found) {
    if (err) {
      console.log(err);
    } else {
      comments = found;
    }
  });

  Post.findOne({ _id: requestedPostId }, function (err, found) {
    if (err) {
      console.log(err);
    } else {
      res.render("post", {
        title: found.title,
        content: found.content,
        id: requestedPostId,
        date: found.date,
        comments: comments,
        captcha: captcha,
        validate: "validate();",
      });
    }
  });
});

//Post

router.post("/", function (req, res) {
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

//EDIT

router.get("/edit/:postId", function (req, res) {
  const thisPostId = req.params.postId;
  console.log(thisPostId);

  Post.findOne({ _id: thisPostId }, function (err, found) {
    if (err) {
      console.log(err);
    } else {
      res.render("dashboard/edit", {
        title: found.title,
        content: found.content,
        id: thisPostId,
      });
    }
  });
});

router.post("/edit", function (req, res) {
  const editId = req.body.editId;
  console.log(editId);

  Post.findByIdAndUpdate(
    { _id: editId },
    { title: req.body.editTitle, content: req.body.editBody },
    function (err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    }
  );
});

//Delete post

router.get("/delete/:postId", function (req, res) {
  const thisPostId = req.params.postId;

  Post.findOne({ _id: thisPostId }, function (err, found) {
    if (err) {
      console.log(err);
    } else {
      res.render("dashboard/delete", {
        id: thisPostId,
      });
    }
  });
});

router.post("/delete", function (req, res) {
  const deleteId = req.body.deleteId;

  Post.findOneAndDelete({ _id: deleteId }, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

router.post("/search", function (req, res) {
  const searchInput = req.body.searchInput;

  Post.find(
    {
      $or: [
        { title: { $regex: searchInput, $options: "i" } },
        { content: { $regex: searchInput, $options: "i" } },
      ],
    },
    function (err, posts) {
      if (err) {
        console.log(err);
      } else {
        let number;

        if (!searchInput) {
          posts = [];
        }

        if (!posts) {
          number = 0;
        } else {
          number = posts.length;
        }

        res.render("search", {
          posts: posts,
          number: number,
        });
      }
    }
  );
});

module.exports = router;
