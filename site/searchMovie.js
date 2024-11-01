function stringInput() {
    const title = document.getElementById('input_title').value;
    if (title) {
        window.location.href = `moviepage.html?title=${encodeURIComponent(title)}`;
    }
}


// Função para extrair parâmetros da URL
function getParameterByName(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
}

// Função de busca
function searchMovie(title) {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = 'Carregando...';
    const apiKey = '3ba8dd08';
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao procurar o filme: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            if (data.Response === 'True') {
                resultado.innerHTML = `Título: ${data.Title}<br>
                                       Ano: ${data.Year}<br>
                                       IMDb Rating: ${data.imdbRating}<br>
                                       Sinopse: ${data.Plot}<br>
                                       <img src="${data.Poster}" alt="Poster do filme" style="max-width:200px;">`;
            } else {
                resultado.innerHTML = 'Filme não encontrado';
            }
        })
        .catch(error => {
            resultado.innerHTML = `Erro ao buscar os dados: ${error}`;
        });
}

// Ao carregar a página moviepage.html, obter o título e buscar o filme
document.addEventListener('DOMContentLoaded', () => {
    const title = getParameterByName('title');
    if (title) {
        searchMovie(title);
    } else {
        document.getElementById('resultado').innerHTML = 'Nenhum título foi fornecido';
    }
});
