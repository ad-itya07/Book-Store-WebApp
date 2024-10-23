import { PrismaClient } from "@prisma/client";
import cloudinary from "../config/cloudinaryconfig.js";
import {createBook, deleteBook, getABook, getBooks } from "../models/bookModel.js";

const prisma = new PrismaClient();

class BookController {
  async createBookController(req, res) {
    if (!req.file) {
      return res.status(400).json({
        message: 'No file uploaded.',
        success: false,
      });
    }
    let result;
    try {
      result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Book Covers",
        public_id: `${req.body.title}-cover`,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "Error uploading to cloudinary!",
        success: false,
        error: err,
      });
    }

    const bookData = {
      ...req.body,
      coverImage: result.secure_url,
    };
    if (req.body.trending === "true") {
      bookData.trending = true;
    } else {
      bookData.trending = false;
    }

    bookData.oldPrice = parseFloat(bookData.oldPrice);
    bookData.newPrice = parseFloat(bookData.newPrice);
    try {
      const addedBook = await createBook(bookData);
      res.status(200).json(addedBook);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Error adding book to DB",
        success: false,
        error: err,
      });
    }
  }

  async getAllBooksController(req, res) {
    try {
      const allBooks = await getBooks();
      res.status(200).json(allBooks);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Error fetching books",
        success: false,
        error: err,
      });
    }
  }

  async getABookController(req, res) {
    const id = parseInt(req.params.id);
    try {
      const reqBook = await getABook(id);
      if (!reqBook) {
        return res.status(404).json({
          message: "No book found!",
          success: false,
        });
      }
      res.status(200).json(reqBook);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Error fetching book!",
        success: false,
        error: err,
      });
    }
  }

  async updateBookController(req, res) {
    const newData = req.body;
    res.json({ newData });
  }

  async deleteBookController(req, res) {
    const id = parseInt(req.params.id);
    const toDelete = await getABook(id);

    if (!toDelete) {
      return res.status(404).json({
        message: "No book found",
        success: false,
      });
    }
    try {
      const deletedBook = await deleteBook(id);
      return res.status(200).json({
        deletedBook,
        message: "Book successfully deleted!",
        success: "true",
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error deleting book from DB.",
        success: false,
        error: err,
      });
    }
  }
}
export default new BookController();
