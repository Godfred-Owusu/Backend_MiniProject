const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const mongoose = require("./DB/MongoConnection");
// const Book = require("./Models/Book");
const bookRoutes = require("./Routes/bookRoutes");
const studentRoutes = require("./Routes/studentRoutes");
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use("/api/books", bookRoutes);
app.use("/api/students", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
