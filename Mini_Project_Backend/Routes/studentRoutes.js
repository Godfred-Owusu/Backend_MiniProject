const express = require("express");
const Student = require("../Models/Student");
const router = express.Router();

app.post("/", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
