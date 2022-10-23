import express from "express";

import mongoose from "mongoose";

import cors from "cors";

import morgan from "morgan";

import dotenv from "dotenv";

import router from "./routes/blogs.js";
import userRouter from "./routes/user.js";
dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/",function(req,res){
  res.send("this is tour app server");
})
app.use("/users", userRouter); // http://localhost:5000/users/signup
app.use("/blog", router);


const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
