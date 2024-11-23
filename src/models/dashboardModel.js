var database = require("../database/config");

async function fetchAvaliacoesPorGenero() {
    try {
        const query = `
        SELECT f.genero AS genero, 
                COUNT(a.idAvaliacao) AS qtd_avaliacoes
        FROM filme f
        LEFT JOIN 
            avaliacao a ON f.idFilme = a.fkFilme
        WHERE a.avaliacao >= 8 
        GROUP BY f.genero
        ORDER BY qtd_avaliacoes DESC
        LIMIT 5;
      `;
        const rows = await database.executar(query);
        return rows;
    } catch (error) {
        console.error('Erro ao buscar dados no modelo:', error);
        throw error;
    }
};

async function maisAvaliados() {
    try {
        const query = `
        SELECT f.nome AS Filme, COUNT(a.idAvaliacao) AS TotalAvaliacoes
        FROM filme f
        JOIN avaliacao a ON f.idFilme = a.fkFilme
        GROUP BY f.idFilme
        ORDER BY TotalAvaliacoes DESC
        LIMIT 1;
        `
        const filmeMaisAvaliado = await database.executar(query);
        return filmeMaisAvaliado
    } catch (error) {
        console.error('Erro ao buscar no modelo:', error);
        throw error;
    }
};

async function MelhorAvaliado() {
    try {
        const query = `
        SELECT f.nome AS Filme, 
                COUNT(a.idAvaliacao) AS TotalAvaliacoes, 
                AVG(a.avaliacao) AS MediaNotas
        FROM filme f
        JOIN avaliacao a ON f.idFilme = a.fkFilme
        GROUP BY f.idFilme
        ORDER BY TotalAvaliacoes DESC, MediaNotas DESC
        LIMIT 1;
        `
        const filmeMelhorAvaliado = await database.executar(query);
        return filmeMelhorAvaliado
    } catch (error) {
        console.error('Erro ao buscar no modelo:', error);
        throw error;
    }
};

async function location() {
    try {
        const query = `
        SELECT pais, estado, cidade FROM endereco;
        `
        const existingLocation = await database.executar(query);
        return existingLocation
    } catch (error) {
        console.error('Erro ao buscar no modelo:', error);
        throw error;
    }
}

async function searchLocation(pais, estado, cidade) {
    try {
        const query = `
        SELECT f.genero, AVG(a.avaliacao) AS media_avaliacao  
        FROM endereco e  
        JOIN usuario u ON e.fkUsuario = u.id  
        JOIN avaliacao a ON u.id = a.fkUsuario  
        JOIN filme f ON a.fkFilme = f.idFilme  
        WHERE e.Pais = '${pais}' AND e.Estado = '${estado}' AND e.Cidade = '${cidade}'  
        GROUP BY f.genero  
        ORDER BY media_avaliacao DESC  
        LIMIT 1; 
        `;

        const topGenreFromLocation = database.executar(query);
        return topGenreFromLocation

    } catch (error) {
        console.error('Erro ao buscar no modelo:', error);
        throw error;
    }
}

module.exports = {
    fetchAvaliacoesPorGenero,
    maisAvaliados,
    MelhorAvaliado,
    location,
    searchLocation
};