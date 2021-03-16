// const express = require("express");
import express from "express";
const app = express();
const router = express.Router();
// const authControllers = require('./../Controllers/authControllers')
import {
  generateOTP,
  signUp,
  logIn,
  protect,
  checkOTP,
} from "./../Controllers/authControllers";
// router.route("/generateotp").get();

router.route("/signup").post(signUp, generateOTP);

router.route("/login").post(logIn);

router.route("/otplogin").post(checkOTP);

module.exports = router;
