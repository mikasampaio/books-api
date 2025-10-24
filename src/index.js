import express from "express";
import bookRouter from "./routes/book.routes.js"
import cors from "cors";

const app = express();

app.use(cors())

app.use(express.json());
app.use(bookRouter)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
