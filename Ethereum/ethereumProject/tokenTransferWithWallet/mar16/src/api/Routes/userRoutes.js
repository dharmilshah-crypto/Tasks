// const express = require("express");
import express from "express";
const app = express();
const router = express.Router();
// const userControllers = require("./../Controllers/userControllers");
// const authControllers = require('./../Controllers/authControllers')
import { protect } from "./../Controllers/authControllers";
import { transaction } from "./../Controllers/userControllers";

// router.route("/users").get(protect, userControllers.getAllUsers);

// router
//   .route("/users/:id")
//   .get(protect, userControllers.getOneUser)
//   .patch(protect, userControllers.updateUser)
//   .delete(protect, userControllers.deleteUser);

router.route("/transaction/:id").post(protect, transaction);

module.exports = router;
