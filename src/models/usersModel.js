var database = require("../database/config")

async function autenticar(email, senha) {
    console.log("Executando autenticação para:", email);

    var instrucaoSql = `
        SELECT id, nome, email FROM usuario WHERE email = '${email}' AND senha = sha2('${senha}', 256);
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    var resultado = await database.executar(instrucaoSql);

    if (resultado.length > 0) {
        var idUsuario = resultado[0].id;

        var instrucaoSqlConsultarEndereco = `
        SELECT idEndereco, pais, estado, cidade FROM endereco WHERE fkUsuario = ${idUsuario};
        `;

        console.log("Executando a segunda instrução SQL: \n" + instrucaoSqlConsultarEndereco);
        var resultado2 = await database.executar(instrucaoSqlConsultarEndereco);

        // Retornar tanto o usuário quanto o endereço
        return {
            usuario: resultado[0],
            endereco: resultado2.length > 0 ? resultado2[0] : null // Verifica se há resultado de endereço
        };
    } else {
        throw new Error("Erro ao autenticar");
    }
}

function cadastrar(nome, email) {
    console.log("Cadastrando usuario:", nome, email);
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', sha2('${senha}', 256));
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function endereco(pais, estado, cidade, idUsuario){
    console.log("Cadastrando endereço:", pais, estado, cidade, idUsuario);

    var instrucaoSql = `
        INSERT INTO endereco (pais, estado, cidade, fkUsuario) VALUES ('${pais}', '${estado}', '${cidade}', '${idUsuario}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    endereco
};