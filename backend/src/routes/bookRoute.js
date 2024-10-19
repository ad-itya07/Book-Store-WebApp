import express from "express";
import { upload } from "../middlewares/filehandlerMiddleware.js";
import BookController from "../controllers/bookController.js";

export const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/create-book", upload.single("file"), BookController.createBookController);
router.get("/all-books", BookController.getAllBooksController);
router.get("/:id", BookController.getABookController);
router.put("/update-book/:id", BookController.updateBookController)
router.delete("/delete-book/:id", BookController.deleteBookController)
