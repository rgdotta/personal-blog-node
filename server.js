//jshint esversion:6

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const nodemailer = require("nodemailer");
const sessionstorage = require("sessionstorage");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("assets"));

mongoose.connect("mongodb://localhost:27017/blogDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

//Schema

const postSchema = {
  title: String,
  content: String,
  date: String,
};

const Post = mongoose.model("Post", postSchema);

const passwordSchema = {
  password: String,
};

const Password = mongoose.model("Password", passwordSchema);

const commentSchema = {
  postId: String,
  user: String,
  comment: String,
  date: Date,
};

const Comment = mongoose.model("Comment", commentSchema);

// Create password on first use.
// You have to create a LOG_PASS in the .env file where you will store the blogger authentication password.
// Comment it out after the first app run.

bcrypt.genSalt(10, function (err, salt) {
  bcrypt.hash(process.env.LOG_PASS, saltRounds, function (err, hash) {
    const password = new Password({
      password: hash,
    });
    password.save(function (err) {
      if (err) {
        console.log(err);
      }
    });
    if (err) {
      console.log(err);
    }
  });
});

// Home and Posts

app.get("/", function (req, res) {
  res.redirect("/0");
});

app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;
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
        comments: comments,
      });
    }
  });
});

//Blogger Authentication

app.get("/login", function (req, res) {
  res.render("dashboard/login");
});

app.post("/login", function (req, res) {
  const field = req.body.authent;

  sessionstorage.setItem("password", field);

  res.redirect("/dashboard");
});

// Dashboard

app.get("/dashboard", function (req, res) {
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

function getPostDate() {
  const postDate = new Date();
  const [day, month, year] = [
    postDate.getDate(),
    postDate.getMonth(),
    postDate.getFullYear(),
  ];
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  return day + " de " + monthNames[month] + " de " + year;
}

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
    date: getPostDate(),
  });

  post.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

app.post("/newPost", function (req, res) {
  res.render("dashboard/compose");
});

//Edit post

app.post("/posts/edit", function (req, res) {
  const thisPostId = req.body.idForEdit;

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

//Delete post

app.post("/posts/delete", function (req, res) {
  const thisPostId = req.body.idForDelete;

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

//Search by title or content parts

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

//Comment

app.post("/comment", function (req, res) {
  const comment = new Comment({
    postId: req.body.postId,
    user: req.body.commenter,
    comment: req.body.commentInput,
    date: getPostDate(),
  });

  comment.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect(req.get("referer"));
    }
  });
});

app.post("/comment/delete", function (req, res) {
  const commentId = req.body.commentForDelete;

  Comment.findOneAndDelete({ _id: commentId }, function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/dashboard");
    }
  });
});

//Send e-mail with nodemail
//it is required to create a FROM_MAIL and MAIL_PASS with the blog e-mail and a TO_MAIL, where the e-mail will be sent to, in the .env file.

app.get("/contact", function (req, res) {
  res.render("contact/contactPage");
});

app.post("/sendMail", function (req, res) {
  const from = process.env.FROM_MAIL;
  const fromPass = process.env.MAIL_PASS;
  const to = process.env.TO_MAIL;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: from,
      pass: fromPass,
    },
  });

  const mailOptions = {
    from: from, // sender address
    to: to, // list of receivers
    subject: "Received message from personal blog.", // Subject line
    html: req.body.email + "<br>" + req.body.subject + "<br>" + req.body.text,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
      res.render("contact/messageSent", { message: "Unable to send message" });
    } else {
      res.render("contact/messageSent", {
        message: "Thank you. Message Sent!",
      });
    }
  });
});

// Home Render

app.get("/:pageNumber", function (req, res) {
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

////////////

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
