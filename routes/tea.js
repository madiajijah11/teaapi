const express = require("express"); // import express

const router = express.Router();

// import tea controller
const teaController = require("../controllers/tea");

// all tea
router.post("/tea", teaController.uploadImage, teaController.newTea);
router.get("/tea", teaController.getAllTea);
router.delete("/tea", teaController.deleteAllTea);

// tea by name
router.get("/tea/:name", teaController.getOneTea);
router.post("/tea/:name", teaController.newComment);
router.delete("/tea/:name", teaController.deleteOneTea);

// export to use in server.js
module.exports = router;
