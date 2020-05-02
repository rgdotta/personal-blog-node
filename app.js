//jshint esversion:6

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const nodemailer = require("nodemailer");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

//Schema

const postSchema = {
  title: String,
  content: String,
};

const Post = mongoose.model("Post", postSchema);

const passwordSchema = {
  password: String,
};

const Password = mongoose.model("Password", passwordSchema);

// Create password on first use

// bcrypt.hash(process.env.LOG_PASS, saltRounds, function (err, hash) {
//   const password = new Password({
//     password: hash,
//   });
//   console.log(password);
//   password.save(function (err) {
//     if (err) {
//       console.log(err);
//     }
//   });
//   if (err) {
//     console.log(err);
//   }
// });

//

app.get("/", function (req, res) {
  Post.find({}, function (err, posts) {
    res.render("home", {
      posts: posts,
    });
  });
});

app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;

  console.log(requestedPostId);

  Post.findOne({ _id: requestedPostId }, function (err, found) {
    res.render("post", {
      title: found.title,
      content: found.content,
      id: requestedPostId,
    });
  });
});

app.get("/login", function (req, res) {
  res.render("login");
});

//

app.post("/login", function (req, res) {
  const field = req.body.authent;

  Password.findOne({}, function (err, pass) {
    if (err) {
      console.log(err);
    } else if (pass) {
      bcrypt.compare(field, pass.password, function (err, result) {
        if (result === true) {
          Post.find({}, function (err, posts) {
            res.render("blogger", {
              posts: posts,
            });
          });
        }
      });
    } else {
      res.redirect("/login");
    }
  });
});

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  });

  post.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

app.post("/newPost", function (req, res) {
  res.render("compose");
});

app.post("/posts/edit", function (req, res) {
  const thisPostId = req.body.idForEdit;

  Post.findOne({ _id: thisPostId }, function (err, found) {
    res.render("edit", {
      title: found.title,
      content: found.content,
      id: thisPostId,
    });
  });
});

app.post("/edit", function (req, res) {
  const editId = req.body.editId;

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

app.post("/posts/delete", function (req, res) {
  const thisPostId = req.body.idForDelete;

  Post.findOne({ _id: thisPostId }, function (err, found) {
    res.render("delete", {
      id: thisPostId,
    });
  });
});

app.post("/delete", function (req, res) {
  const deleteId = req.body.deleteId;

  Post.findOneAndDelete({ _id: deleteId }, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

app.post("/search", function (req, res) {
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
        res.render("search", {
          posts: posts,
        });
      }
    }
  );
});

app.post("/sendMail", function (req, res) {
  const from = process.env.FROM_MAIL;
  const fromPass = process.env.MAIL_PASS;
  const to = process.env.TO_MAIL;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.FROM_MAIL,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.FROM_MAIL, // sender address
    to: process.env.TO_MAIL, // list of receivers
    subject: "Received message from personal blog.", // Subject line
    html: req.body.email + "<br>" + req.body.subject + "<br>" + req.body.text,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
      res.render("messageSent", { message: "Unable to send message" });
    } else {
      res.render("messageSent", { message: "Thank you. Message Sent!" });
    }
  });
});

////////////

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
