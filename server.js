require("dotenv").config();
const express = require("express");
const app = express();
const routers = require("./routes");
const mongoose = require("mongoose");

app.use(express.json());
app.use(routers);
app.use("/*", (req, res) => {
  res.status(400).json({ message: "Invalid URL" });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server is running on port 4000");
});

mongoose
  .connect(process.env.dbUrl)
  .then(() => {
    console.log("database connected");
  })
  .catch((e) => console.log(e));
