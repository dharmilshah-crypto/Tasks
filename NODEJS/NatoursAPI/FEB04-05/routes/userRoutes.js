const express = require("express");
const userController = require('./../controllers/userController');
const Router = express.Router();

Router.param('id',(req,res,next,val)=>{
    console.log("id is " + val); 
    next();
    })

Router.route('/')
.get(userController.getAllUser)
.post(userController.createUser);

Router.route('/:id')
.patch(userController.updateUser)
.delete(userController.deleteUser)
.get(userController.getOneUser);

module.exports = Router;