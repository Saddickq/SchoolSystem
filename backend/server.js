import express from "express";
import { PORT, DB_URL } from "./config/index.js";
import cors from "cors";
import mongoose from "mongoose";
import AuthRoute from './routes/auth.routes.js'
import UserRoute from './routes/user.routes.js'



const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(AuthRoute)
app.use(UserRoute)


app.get("/", (req, res) => {
    res.status(200).send("hello world")
})

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`server started on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
