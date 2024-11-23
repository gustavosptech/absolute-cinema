var dashboardModel = require("../models/dashboardModel");

async function getAvaliacoesPorGenero(req, res) {
    try {
        const data = await dashboardModel.fetchAvaliacoesPorGenero();
        res.json(data);
    } catch (error) {
        console.error('Erro no controller de avaliações:', error);
        res.status(500).json({ error: 'Erro ao buscar dados de avaliações por gênero' });
    }
};

async function maisAvaliados(req, res) {
    try {
        const data = await dashboardModel.maisAvaliados();
        res.json(data);
    } catch (error) {
        console.error('Erro no controller de avaliações:', error);
        res.status(500).json({ error: 'Erro ao buscar o filme mais avaliado' });
    }
}

async function MelhorAvaliado(req, res) {
    try {
        const data = await dashboardModel.MelhorAvaliado();
        res.json(data);
    } catch (error) {
        console.error('Erro no controller de avaliações:', error);
        res.status(500).json({ error: 'Erro ao buscar o filme melhor avaliado' });
    }
}

async function location(req, res) {
    try {
        const data = await dashboardModel.location();
        res.json(data);
    } catch (error) {
        console.error('Erro no controller de avaliações:', error);
        res.status(500).json({ error: 'Erro ao buscar as regiões' });
    }
}

function searchLocation(req, res) {
    const pais = req.body.paisServer;
    const estado = req.body.estadoServer;
    const cidade = req.body.cidadeServer;

    if (!pais) {
        return res.status(400).send("Country is undefined");
    } else if (!estado) {
        return res.status(400).send("State is undefined");
    } else if (!cidade) {
        return res.status(400).send("City is undefined");
    } else {
        dashboardModel.searchLocation(pais, estado, cidade)
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
}

module.exports = {
    getAvaliacoesPorGenero,
    maisAvaliados,
    MelhorAvaliado,
    location,
    searchLocation
}