const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, minLength: 1, maxLength: 50, required: true },
  content: { type: String, minLength: 1, maxLength: 500, required: true },
  createAt: { type: Date, default: Date.now(), required: true },
});

//Export model
module.exports = mongoose.model("Message", MessageSchema);
