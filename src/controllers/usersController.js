var usersModel = require("../models/usersModel");

function autenticar(req, res) {
    const email = req.body.emailServer;
    const senha = req.body.senhaServer;

    if (!email) {
        return res.status(400).send("E-mail is undefined!");
    } else if (!senha) {
        return res.status(400).send("Password is undefined!");
    }

    usersModel.autenticar(email, senha)
        .then((resultadoAutenticar) => {
            if (resultadoAutenticar.length === 1) {
                res.json({
                    id: resultadoAutenticar[0].id,
                    nome: resultadoAutenticar[0].nome,
                    email: resultadoAutenticar[0].email
                });
            } else {
                res.status(403).send("Email or password is not valid");
            }
        })
        .catch((erro) => {
            console.error("Erro ao autenticar usuário:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

function cadastrar(req, res) {
    debugger
    const nome = req.body.nomeServer;
    const email = req.body.emailServer;
    const senha = req.body.senhaServer;

    if (!nome) {
        return res.status(400).send("Name is undefined!");
    } else if (!email) {
        return res.status(400).send("Email is undefined!");
    } else if (!senha) {
        return res.status(400).send("Password is undefined!");
    } else {
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usersModel.cadastrar(nome, email, senha)
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
    autenticar,
    cadastrar
}