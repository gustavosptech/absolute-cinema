var avaliacaoModel = require("../models/avaliacaoModel");

function filme(req, res) {
    const nomeFilme = req.body.nomeFilmeServer;
    const generoFilme = req.body.generoFilmeServer;

    if (!nomeFilme) {
        return res.status(400).send("Filme Name is undefined!");
    } else if (!generoFilme) {
        return res.status(400).send("Genre Film is undefined!");
    }

    avaliacaoModel.filme(nomeFilme, generoFilme)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nError: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function nota(req, res) {
    const avaliacao = req.body.avaliacaoServer;
    const idUsuario = req.body.idUsuarioServer
    const nomeFilme = req.body.nomeFilmeServer;

    if (!nomeFilme) {
        return res.status(400).send("Filme Name is undefined!");
    } else if (!avaliacao) {
        return res.status(400).send("Rating is undefined!");
    } else if (!idUsuario) {
        return res.status(400).send("idUser is undefined!");
    }

    avaliacaoModel.nota(avaliacao, idUsuario, nomeFilme)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nError: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function media(req, res) {
    const nomeFilme = req.body.nomeFilmeServer;

    if (!nomeFilme) {
        return res.status(400).send("Film Name is undefined!");
    }

    avaliacaoModel.media(nomeFilme)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nError: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

async function getAvaliacoesPorGenero(req, res) {
    try {
        const data = await avaliacaoModel.fetchAvaliacoesPorGenero();
        res.json(data);
    } catch (error) {
        console.error('Erro no controller de avaliações:', error);
        res.status(500).json({ error: 'Erro ao buscar dados de avaliações por gênero' });
    }
};

async function maisAvaliados(req, res) {
    try {
        const data = await avaliacaoModel.maisAvaliados();
        res.json(data);
    } catch (error) {
        console.error('Erro no controller de avaliações:', error);
        res.status(500).json({ error: 'Erro ao buscar o filme mais avaliado' });
    }
}

async function MelhorAvaliado(req, res) {
    try {
        const data = await avaliacaoModel.MelhorAvaliado();
        res.json(data);
    } catch (error) {
        console.error('Erro no controller de avaliações:', error);
        res.status(500).json({ error: 'Erro ao buscar o filme melhor avaliado' });
    }
}

module.exports = {
    filme,
    nota,
    media,
    getAvaliacoesPorGenero,
    maisAvaliados,
    MelhorAvaliado
}