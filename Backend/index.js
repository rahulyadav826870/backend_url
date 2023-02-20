const express = require("express");
const { connection } = require("./config/db");
const { auth } = require("./middleware/auth.middleware");
const { postRoute } = require("./routes/Post.route");
const { userRoute } = require("./routes/User.route");

const app = express();
require("dotenv").config();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is home page ");
});

app.use("/user", userRoute);

app.use(auth);
app.use("/posts", postRoute);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`server is running at ${process.env.port}`);
  } catch (error) {
    console.log(error);
  }
});
