import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {router as bookRouter} from "./src/routes/bookRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));

app.use("/api/books", bookRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
