const express = require('express');
const {aliasTopTours , getTour, getAllTours, createTour, deleteTour, updateTour } = require('./../controllers/tourController');
const authController = require('./../controllers/authController')
const router = express.Router();



// router.param('id', tourController.checkID);
router
.route('/top-5-cheap')
.get(aliasTopTours,getAllTours)

router
  .route('/')
  .get(authController.protect,getAllTours)
  .post(createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;
