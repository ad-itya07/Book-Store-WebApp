import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import cloudinary from "./src/config/cloudinaryconfig.js";
// import multer from "multer";
// import { upload } from "./src/middlewares/filehandlerMiddleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
