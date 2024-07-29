const mongoose = require("mongoose");

const BookSchema = mongoose.Schema(
  {
    title: { type: String },
    author: { type: String },
    genre: { type: String },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
