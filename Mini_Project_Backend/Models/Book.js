// const mongoose = require("mongoose");

// const BookSchema = mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     author: { type: String, required: true },
//     genre: { type: String, required: true },
//     quantity: {
//       type: Number,
//       default: 0,
//       required: true,
//     },
//     student: { type: mongoose.Types.ObjectId, ref: "Student", required: true },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Book = mongoose.model("Book", BookSchema);

// module.exports = Book;

const mongoose = require("mongoose");

const BookSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    quantity: {
      type: Number,
      default: 0,
      required: true,
    },
    student: { type: mongoose.Types.ObjectId, ref: "Student" },
  },
  {
    timestamps: true,
  }
);
BookSchema.pre("validate", function (next) {
  console.log("Validating Book:", this);
  next();
});
const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
