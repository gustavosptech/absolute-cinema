var usuarioModel = require("../models/usersModel");

function autenticar(req, res) {
    const email = req.body.emailServer;
    const senha = req.body.senhaServer;

    if (!email) {
        return res.status(400).send("E-mail is undefined!");
    } else if (!senha) {
        return res.status(400).send("Password is undefined!");
    }

    usuarioModel.autenticar(email, senha)
        .then((resultadoAutenticar) => {
            if (resultadoAutenticar.length === 1) {
                res.json({
                    id: resultadoAutenticar[0].id,
                    nome: resultadoAutenticar[0].nome,
                    email: resultadoAutenticar[0].email
                });
            } else {
                res.status(403).send("Email e/ou senha inválido(s)");
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
        return res.status(400).send("Nome está indefinido!");
    } else if (!email) {
        return res.status(400).send("Email está indefinido!");
    } else if (!senha) {
        return res.status(400).send("Senha está indefinida!");
    }

    // Verifica se o usuário já existe pelo email
    usuarioModel.buscarPorEmail(email).then((resultado) => {
        if (resultado.length > 0) {
            return res.status(409).send("Usuário já existe!");
        } else {
            // Se não existir, cadastra o usuário
            usuarioModel.cadastrar(nome, email, senha)
                .then((resultadoCadastro) => {
                    res.status(201).json(resultadoCadastro);
                })
                .catch((erro) => {
                    console.error("Erro ao cadastrar usuário:", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                });
        }
    }).catch((erro) => {
        console.error("Erro ao verificar usuário:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    autenticar,
    cadastrar
}