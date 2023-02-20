const express = require("express");
const { UserModel } = require("../model/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  const payload = req.body;
  const { password } = payload;
  try {
    bcrypt.hash(password, 5, async function (err, hash) {
      const user = new UserModel({ ...payload, password: hash });
      console.log("user: ", user);
      await user.save();
      res.send({ msg: "Succefully register user" });
    });
  } catch (error) {
    res.send({ msg: "something went wrong ", error: error.message });
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });

    if (user.length > 0) {
      const token = jwt.sign({ userID: user[0]._id }, "masai");
      bcrypt.compare(password, user[0].password, function (err, result) {
        // result == false
        if (result) {
          res.send({ msg: "Login Sucessfully", token: token });
        } else {
          res.send({ msg: "something wrong", err });
        }
      });
    } else {
      res.send({ msg: "wrong crendential" });
    }
  } catch (error) {
    res.send({ msg: "something went wrong ", error: error.message });
  }
});

module.exports = {
  userRoute,
};
