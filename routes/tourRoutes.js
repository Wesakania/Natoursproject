let express = require("express");
let tourController = require("./../controllers/tourContoller")
let router = express.Router();

router.param("id",tourController.checkID)
  

router
.route("/")
.get(tourController.getAllTours)
.post(tourController.creatTour);

router
.route("/:id")
.get(tourController.getTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour);

module.exports = router;