const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, minLength: 1, required: true },
  username: { type: String, minLength: 1, maxLength: 50, required: true },
  password: { type: String, minLength: 1, maxLength: 500, required: true },
  memberStatus: { type: Boolean, default: false },
});

//Export model
module.exports = mongoose.model("User", UserSchema);
