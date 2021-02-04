const express = require('express');
const fs = require('fs');
const tourController = require('./../controllers/tourController');

const Router = express.Router();

Router.param('id',(req,res,next,val)=>{
    console.log("id is " + val); 
    next();
    })

Router.route('/')
.get(tourController.getAllTours)
.post(tourController.createTour);

Router.route('/:id')
.patch(tourController.updateTour)
.delete(tourController.deleteTour)
.get(tourController.getOneTour);

module.exports = Router;