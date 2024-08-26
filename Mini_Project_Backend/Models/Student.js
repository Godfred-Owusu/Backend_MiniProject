const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please add the student's name"],   unique: true },
  class: { type: String, required: [true, "Please add the student's class"] },
  dateBorrowed: {
    type: Date,
    required: [true, "Please add the date the book was borrowed"],
    default: Date.now,
  },
  book: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: false,
    },
  ],
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
