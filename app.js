const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const useRoutes = require("./routes/userRoute");
const noteRoutes = require("./routes/noteRouter");
const bodyParse = require("body-parser");
const authentication = require("./middleware/authentication");
const cors = require("cors");

const app = express();
dotenv.config();
const mongooseUrl = process.env.mongo_url;
app.use(cors());
app.use(bodyParse.json());
app.use("/protected", authentication, (req, res) => {
  res.end(`Hi ${req.user.firstName}, you are authenticated!`);
});
app.use("/users", useRoutes);
app.use("/notes", authentication, noteRoutes);
app.use((req, res, next) => {
  const err = new Error("not found");
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: { message: err.message } });
});
mongoose
  .connect(mongooseUrl, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to mongodb");
    return app.listen(3400);
  })
  .then(() => {
    console.log("server running at 3400");
  })
  .catch((err) => console.log(err.message));
