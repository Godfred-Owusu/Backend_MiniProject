const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please add the student's name"] },
  class: { type: String, required: [true, "Please add the student's class"] },
  dateBorrowed: {
    type: Date,
    required: [true, "Please add the date the book was borrowed"],
    default: Date.now,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: [true, "Please add the borrowed book"],
  },
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
