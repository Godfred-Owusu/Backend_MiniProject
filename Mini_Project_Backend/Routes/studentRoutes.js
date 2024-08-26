const express = require("express");
const Student = require("../Models/Student");
const studentRoutes = express.Router();
const Book = require("../Models/Book");

studentRoutes.get("/countStudent", async (req, res) => {
  try {
    const studentCount = await Student.countDocuments();
    res.status(200).json({ total: studentCount });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

studentRoutes.get("/", async (req, res) => {
  try {
    const student = await Student.find().populate("book");
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create student
// studentRoutes.post("/", async (req, res) => {
//   try {
//     const { name, class: studentClass, bookId } = req.body;

//     // Check if the book exists
//     const book = await Book.findById(bookId);
//     if (!book) {
//       console.log("Book not found:", bookId); // Log book not found
//       return res.status(404).json({ message: "Book not found" });
//     }

//     // update the book quantity
//     const updatedBook = await Book.findByIdAndUpdate(bookId, {
//       $inc: { quantity: -1 },
//     });
//     if (!updatedBook) {
//       console.log("Book not found:", bookId); // Log book not found
//       return res.status(404).json({ message: "Book not found" });
//     }

//     // Ensure the book is not already borrowed by the student
//     if (book.student) {
//       console.log("Book already borrowed by another student:", bookId); // Log book already borrowed
//       return res.status(400).json({ message: "Book already borrowed" });
//     }

//     // Update the book document to reflect that it's borrowed
//     book.student = req.body.studentId; // Optional: Store the student ID in the book
//     await book.save();

//     // Create the student with the book ID
//     const student = await Student.create({
//       name,
//       class: studentClass,
//       book: [bookId], // Add the book ID to the student's book array
//     });

//     console.log("Created Student:", student); // Log created student
//     res.status(201).json(student);
//   } catch (error) {
//     console.log("Error:", error); // Log error for debugging
//     res.status(500).json({ message: error.message });
//   }
// });

studentRoutes.post("/", async (req, res) => {
  try {
    const { name, class: studentClass, bookId } = req.body;

    // Check if the book exists
    const book = await Book.findById(bookId);
    if (!book) {
      console.log("Book not found:", bookId); // Log book not found
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if the student already exists and has borrowed a book
    const existingStudent = await Student.findOne({
      name,
      class: studentClass,
    });
    if (existingStudent) {
      console.log("Student already borrowing a book:", existingStudent.book); // Log student already borrowing a book
      return res
        .status(400)
        .json({
          message:
            "Return the book you have borrowed before you can borrow another one",
        });
    }

    // Ensure the book is not already borrowed by another student
    if (book.student) {
      console.log("Book already borrowed by another student:", bookId); // Log book already borrowed
      return res.status(400).json({ message: "Book already borrowed" });
    }

    // Update the book's quantity
    if (book.quantity <= 0) {
      console.log("No copies available for the book:", bookId); // Log no copies available
      return res
        .status(400)
        .json({ message: "No copies available for this book" });
    }

    // Create the student with the book ID
    const student = await Student.create({
      name,
      class: studentClass,
      book: bookId, // Add the book ID to the student's book field
    });

    // Update the book document to reflect that it's borrowed and reduce quantity
    book.student = student._id;
    book.quantity -= 1;
    await book.save();

    console.log("Created Student:", student); // Log created student
    res.status(201).json(student);
  } catch (error) {
    console.log("Error:", error); // Log error for debugging
    res.status(500).json({ message: error.message });
  }
});

// delete student name if he returns his boo
studentRoutes.delete("/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const student = await Student.findByIdAndDelete(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    // const bookId = student.book[0];
    // const book = await Book.findById(bookId);
    // book.student = null;
    // await book.save();
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.log("Error:", error); // Log error for debugging
    res.status(500).json({ message: error.message });
  }
});

module.exports = studentRoutes;
