const mongoose = require("mongoose");

const passwordSchema = {
  password: String,
};

module.exports = Password = mongoose.model("Password", passwordSchema);
