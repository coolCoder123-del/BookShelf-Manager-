import express from "express";
import { PORT, MONGODB_URL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// middleware to parse req
// u\est body
app .use(express.json());

// middleware to handle CORS Policy
app.use(cors());
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
//   })
// );

app.get("/", (req, res) => {
  console.log(req);
  return res
    .status(574)
    .send("Welcome to vani's first MERN stack application.");
});

app.use("/books", booksRoute);

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("The application is successfully connectied to MONGODB.");
    app.listen(PORT, () => {
      console.log(`Applicaiton is listening to the port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
