const express = require("express");
const router = express.Router();
const apartmentsController = require("./apartmentsController")

router.route('/')
    .get(apartmentsController.getAllApartments)
    .post(apartmentsController.postApartment)
router.route("/:id")
    .get(apartmentsController.getApartmentById)
    .delete(apartmentsController.deleteApartment)
    .put(apartmentsController.updateApartment)
module.exports = router;

