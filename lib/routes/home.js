const express = require("express");
const router = express.Router();

const Post = require("../models/postSchema");

router.get("/", function (req, res) {
  res.redirect("/0");
});

router.get("/:pageNumber", function (req, res) {
  const requestedPage = req.params.pageNumber;

  Post.find({}, function (err, posts) {
    const from = requestedPage + 0;
    const to = requestedPage + 9;
    const reversedPosts = posts.reverse();
    const selectedPosts = reversedPosts.slice(from, to);

    if (err) {
      console.log(err);
    } else {
      res.render("home", {
        posts: selectedPosts,
        params: requestedPage,
      });
    }
  });
});

module.exports = router;
