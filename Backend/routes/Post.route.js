const express = require("express");
const { PostModel } = require("../model/Post.model");

const postRoute = express.Router();

postRoute.post("/", async (req, res) => {
  try {
    const postData = new PostModel(req.body);
    await postData.save();
    res.send({ msg: "Post sucessfully" });
  } catch (error) {
    res.send({ msg: "something went wrong ", error: error.message });
  }
});

postRoute.get("/top", async (req, res) => {
  const query = req.query;
  if (query === "device1" && query == "device2") {
    query = req.query;
  }

  try {
    const postData = await PostModel.find(query);

    res.send(postData);
  } catch (error) {
    res.send({ msg: "something went wrong ", error: error.message });
  }
});

postRoute.patch("/update/:id", async (req, res) => {
  const ID = req.params.id;
  const payload = req.body;
  try {
    const updatePost = await PostModel.findByIdAndUpdate({ _id: ID }, payload);

    res.send({ msg: "Update Sucessfully" });
  } catch (error) {
    res.send({ msg: "something went wrong ", error: error.message });
  }
});

postRoute.delete("/delete/:id", async (req, res) => {
  const ID = req.params.id;

  try {
    const deletePost = await PostModel.findByIdAndDelete({ _id: ID });

    res.send({ msg: "Delete Sucessfully" });
  } catch (error) {
    res.send({ msg: "something went wrong ", error: error.message });
  }
});

module.exports = {
  postRoute,
};
