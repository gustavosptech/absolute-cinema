var database = require("../database/config")

async function filme(nomeFilme, generoFilme) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function filme():", nomeFilme, generoFilme);

    // Verificar se o filme já existe no banco
    var instrucaoVerificarFilme = `
        SELECT idFilme FROM filme WHERE nome = '${nomeFilme}'
    `;

    try {
        // Aguarde o resultado da consulta do filme
        var resultadoFilme = await database.executar(instrucaoVerificarFilme);

        if (resultadoFilme.length > 0) {
            console.log("Filme já existe no banco de dados. ID do filme:", resultadoFilme[0].idFilme);
            return resultadoFilme[0].idFilme; // Retorna o ID do filme existente
        } else {
            // Se o filme não existir, insira no banco de dados
            var instrucaoInsertFilme = `
                INSERT INTO filme (nome, genero) VALUES ('${nomeFilme}', '${generoFilme}');
            `;
            console.log("Executando a instrução SQL de INSERT: \n" + instrucaoInsertFilme);
            return await database.executar(instrucaoInsertFilme); // Aguarde a execução da inserção
        }
    } catch (erro) {
        console.error("Erro ao verificar ou inserir filme:", erro);
    }
}

async function nota(avaliacao, idUsuario, nomeFilme) {
    console.log("ACESSEI O NOTAS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function nota():", avaliacao, idUsuario);

    // Verificar se o filme existe
    var instrucaoVerificarFilme = `
        SELECT idFilme FROM filme WHERE nome = '${nomeFilme}'
    `;

    try {
        // Aguarde o resultado da consulta do filme
        var resultadoFilme = await database.executar(instrucaoVerificarFilme);

        if (resultadoFilme.length > 0) {
            var idFilme = resultadoFilme[0].idFilme;

            // Verificar se o usuário já avaliou o filme
            var instrucaoVerificarAvaliacao = `
                SELECT idAvaliacao FROM avaliacao 
                WHERE fkUsuario = ${idUsuario} AND fkFilme = ${idFilme}
            `;

            var resultadoAvaliacao = await database.executar(instrucaoVerificarAvaliacao);

            if (resultadoAvaliacao.length > 0) {
                // Se o usuário já avaliou o filme, faça um UPDATE
                var instrucaoUpdate = `
                    UPDATE avaliacao 
                    SET avaliacao = '${avaliacao}', dtAvaliacao = NOW() 
                    WHERE fkUsuario = ${idUsuario} AND fkFilme = ${idFilme}
                `;
                console.log("Executando a instrução SQL de UPDATE: \n" + instrucaoUpdate);
                return await database.executar(instrucaoUpdate);
            } else {
                // Se o usuário não avaliou o filme, faça um INSERT
                var instrucaoInsert = `
                    INSERT INTO avaliacao (avaliacao, dtAvaliacao, fkUsuario, fkFilme) 
                    VALUES ('${avaliacao}', NOW(), ${idUsuario}, ${idFilme});
                `;
                console.log("Executando a instrução SQL de INSERT: \n" + instrucaoInsert);
                return await database.executar(instrucaoInsert);
            }
        } else {
            console.log("Filme não encontrado. Certifique-se de que ele está registrado.");
        }
    } catch (erro) {
        console.error("Erro ao consultar filme ou inserir/atualizar avaliação:", erro);
    }
}

async function media(nomeFilme) {
    console.log("ACESSEI O MEDIA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function nota():", nomeFilme);

    var instrucaoSql = `
        SELECT TRUNCATE(AVG(avaliacao), 1) AS mediaAvaliacao 
        FROM avaliacao 
        JOIN filme ON avaliacao.fkFilme = filme.idFilme
        WHERE filme.nome = '${nomeFilme}';
    `;

    try {
        var resultado = await database.executar(instrucaoSql);
        if (resultado.length > 0) {
            return resultado[0].mediaAvaliacao
        } else {
            return "N/A"
        }
    } catch (erro) {
        console.error("Error:", erro);
    }
}

async function fetchAvaliacoesPorGenero() {
    try {
        const query = `
        SELECT 
            f.genero AS genero, 
            COUNT(a.idAvaliacao) AS qtd_avaliacoes
        FROM 
            filme f
        LEFT JOIN 
            avaliacao a ON f.idFilme = a.fkFilme
        WHERE 
            a.avaliacao >= 8 
        GROUP BY 
            f.genero
        ORDER BY 
            qtd_avaliacoes DESC
        LIMIT 5;
      `;
        const rows = await database.executar(query);
        return rows;
    } catch (error) {
        console.error('Erro ao buscar dados no modelo:', error);
        throw error;
    }
};


module.exports = {
    filme,
    nota,
    media,
    fetchAvaliacoesPorGenero
};