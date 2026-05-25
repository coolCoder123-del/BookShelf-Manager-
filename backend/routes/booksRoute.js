import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// save books in Mongo DB
router.post("/save", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return req.status(400).send({
        message: "Send all required fields: title, author and publish year.",
      });
    } else {
      const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
      image: req.body.image,
      status: req.body.status,
      rating: req.body.rating,
      favorite: req.body.favorite,
    };

      const book = await Book.create(newBook);

      return res.status(201).send(`New book is created: ${book}`);
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

// reteive all books from db
router.get("/get", async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

// reteive one book from db using id
router.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    return res.status(200).json(book);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

// update a book
router.put("/update/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author and publish year.",
      });
    } else {
      const { id } = req.params;
      const result = await Book.findByIdAndUpdate(id, req.body);

      if (!result) {
        return res.status(404).json({ message: "Book Not Found." });
      } else {
        return res
          .status(200)
          .send({ message: "Book is successfully updated." });
      }
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

// delete a book
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).send({ message: "Book Not Found." });
    } else {
      return res.status(200).send({ message: "Book is sucessfully deleted." });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

export default router;