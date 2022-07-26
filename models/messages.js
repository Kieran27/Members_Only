const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, minLength: 1, maxLength: 50, required: true },
  content: { type: String, minLength: 1, maxLength: 500, required: true },
  createdAt: { type: Date, default: Date.now(), required: true },
  author: { type: String },
});

MessageSchema.virtual("formattedDate").get(function () {
  return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
});

//Export model
module.exports = mongoose.model("Message", MessageSchema);
