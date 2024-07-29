const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URL;

// const local = "mongodb://localhost:27017/Library";
mongoose
  .connect(mongoURI)
  .then(() => console.log("Database Connected"))
  .catch((error) => console.log("Connection failed", error));

module.exports = mongoose;
