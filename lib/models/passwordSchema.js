const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passwordSchema = new Schema({
  password: String,
});

module.exports = Password = mongoose.model("Password", passwordSchema);
