var database = require("../database/config")

async function autenticar(email, senha) {
    console.log("Executando autenticação para:", email, senha);

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


// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO CADASTRAR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', sha2('${senha}', 256));
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function endereco(pais, estado, cidade, idUsuario){
    console.log("ACESSEI O USUARIO CADASTRAR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", pais, estado, cidade, idUsuario);

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