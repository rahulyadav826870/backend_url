const mongoose = require("mongoose");

const postStructure = mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  device: { type: String, required: true },
  no_if_comments: { type: Number, required: true },
});

const PostModel = mongoose.model("post", postStructure);

module.exports = {
  PostModel,
};
