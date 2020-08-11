//jshint esversion:6

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const _ = require("lodash");
const mongoose = require("mongoose");

const posts = require("./lib/routes/posts");
const comment = require("./lib/routes/comment");
const login = require("./lib/routes/login");
const dashboard = require("./lib/routes/dashboard");
const contact = require("./lib/routes/contact");
const home = require("./lib/routes/home");

const app = express();

app.set("views", path.join(__dirname + "/app/views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve("./public")));

mongoose.connect("mongodb://localhost:27017/blogDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

require("./bin/hash");
app.use("/posts", posts);
app.use("/comment", comment);
app.use("/login", login);
app.use("/dashboard", dashboard);
app.use("/contact", contact);
app.use("/", home);

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
