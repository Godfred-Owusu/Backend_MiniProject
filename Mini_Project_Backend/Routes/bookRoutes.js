const express = require("express");
const Book = require("../Models/Book");
const router = express.Router();

router.get("/count", async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments({});
    res.status(200).json({ total: totalBooks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read all books
router.get("/", async (req, res) => {
  try {
    const getAllBooks = await Book.find({});
    res.status(200).json(getAllBooks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get one book
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const getOneBook = await Book.findById(id);
    if (!getOneBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(getOneBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create a book
router.post("/", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update book
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const editBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(editBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a book
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteBook = await Book.findByIdAndDelete(id);
    res.status(200).json(deleteBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
