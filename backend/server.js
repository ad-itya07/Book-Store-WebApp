import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {router as bookRouter} from "./src/routes/bookRoute.js";
import {router as orderRouter} from "./src/routes/orderRoute.js"
import {router as userRouter} from "./src/routes/userRoute.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'https://book-store-frontend-0sv0.onrender.com',
    credentials: true,
  }));

app.use("/api/books", bookRouter);
app.use("/api/orders", orderRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
