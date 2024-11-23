var express = require("express");
var router = express.Router();
var dashboardController = require("../controllers/dashboardController");

router.get("/genero", function (req, res) {
    dashboardController.getAvaliacoesPorGenero(req, res);
});

router.get("/maisAvaliados", function (req, res) {
    dashboardController.maisAvaliados(req, res);
});

router.get("/MelhorAvaliado", function (req, res) {
    dashboardController.MelhorAvaliado(req, res);
});

router.get("/location", function (req, res) {
    dashboardController.location(req, res);
});

router.post("/searchLocation", function (req, res) {
    dashboardController.searchLocation(req, res);
});

module.exports = router;