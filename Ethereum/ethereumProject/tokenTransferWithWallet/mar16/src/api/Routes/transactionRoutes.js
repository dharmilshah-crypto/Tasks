// const express = require("express");
import express from "express";
const app = express();
const router = express.Router();
// const transactionControllers = require("./../Controllers/transactionControllers");
// const authControllers = require('./../Controllers/authControllers')
import { protect } from "./../Controllers/authControllers";
import * as transactionControllers from "./../Controllers/transactionControllers";
router
  .route("/gettransactions")
  .get(protect, transactionControllers.getAllTransactions);

module.exports = router;
