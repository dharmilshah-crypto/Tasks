const express = require("express");
const userController = require('./../controllers/userController');
const Router = express.Router();



Router.route('/')
.get(userController.getAllUser)
.post(userController.createUser);

Router.route('/:id')
.patch(userController.updateUser)
.delete(userController.deleteUser)
.get(userController.getOneUser);

module.exports = Router;