// const express = require('express')
import express from "express";
const app = express();
// const authRouter = require('./Routes/authRoutes')
import authRouter from "./Routes/authRoutes";
// const userRouter = require("./Routes/userRoutes");
import userRouter from "./Routes/userRoutes";
// const transactionRouter = require("./Routes/transactionRoutes");
import transactionRouter from "./Routes/transactionRoutes";
import "../ethereum/deploy";
// const mongoose = require("mongoose");
import mongoose from "mongoose";
app.use(express.json());

app.use("/api", authRouter, userRouter, transactionRouter);
// app.use('/api', userRouter);
// app.use('/api',transactionRouter);

mongoose
  .connect(
    "mongodb+srv://User:User2304-@cluster0.n0ujr.mongodb.net/Project?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("successful connection to database");
  })
  .catch((err) => {
    console.log("error in connecting to database");
  });

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
