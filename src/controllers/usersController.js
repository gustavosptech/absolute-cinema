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
            if (resultadoAutenticar.usuario) {
                res.json({
                    id: resultadoAutenticar.usuario.id,
                    nome: resultadoAutenticar.usuario.nome,
                    email: resultadoAutenticar.usuario.email,
                    // Adicionando campos de endereço ao JSON de resposta
                    idEndereco: resultadoAutenticar.endereco ? resultadoAutenticar.endereco.idEndereco : null,
                    pais: resultadoAutenticar.endereco ? resultadoAutenticar.endereco.pais : null,
                    estado: resultadoAutenticar.endereco ? resultadoAutenticar.endereco.estado : null,
                    cidade: resultadoAutenticar.endereco ? resultadoAutenticar.endereco.cidade : null
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

function endereco(req, res) {
    const pais = req.body.paisServer;
    const estado = req.body.estadoServer;
    const cidade = req.body.cidadeServer;
    const idUsuario = req.body.idUsuarioServer;

    if (!pais) {
        return res.status(400).send("Country is undefined!");
    } else if (!estado) {
        return res.status(400).send("State is undefined!");
    } else if (!cidade) {
        return res.status(400).send("City is undefined!");
    } else if (!idUsuario) {
        return res.status(400).send("User id is undefined!");
    }

    usersModel.endereco(pais, estado, cidade, idUsuario)
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

module.exports = {
    autenticar,
    cadastrar,
    endereco
}