var express = require("express");
var router = express.Router();
var avaliacaoController = require("../controllers/avaliacaoController");


router.post("/filme", function (req, res) {
    avaliacaoController.filme(req, res);
});


router.post("/nota", function (req, res) {
    avaliacaoController.nota(req, res);
});


router.post("/media", function (req, res) {
    avaliacaoController.media(req, res);
});

router.get("/genero", function (req, res) {
    avaliacaoController.getAvaliacoesPorGenero(req, res);
});

module.exports = router;
