import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db.js";

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//DB connect
connectDB();

//Routes
app.get("/", (req, res) => {
  res.send("Api working");
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
