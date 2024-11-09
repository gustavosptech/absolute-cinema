function stringInput() {
    const title = document.getElementById('input_title').value;

    if (title == "") {
        return alert("Write something to search.");
    } else {
        window.location.href = `/moviepage.html?title=${encodeURIComponent(title)}`;
    }
}

// Extract URL
function getParameterByName(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
}

function searchMovie(title) {
    const result = document.getElementById('result');
    const title_page = document.getElementById('title_page');
    const rotten_tomatoes = document.getElementById('rotten_tomatoes');
    result.innerHTML = '<img class="loading" style="width: 50px; heigth: 50px;" src="img/loading.gif" alt="Loading">';

    const apiKey = '3ba8dd08';
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error to found a film: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            if (data.Response === 'True') {

                ranking.style.display = 'block'

                const rottenTomatoesRating = data.Ratings.find(rating => rating.Source === 'Rotten Tomatoes');
                const rottenTomatoesValue = rottenTomatoesRating ? rottenTomatoesRating.Value : 'N/A';

                result.innerHTML = `
                    <div class="movie-details">
                        <div class="movie-poster">
                            <a href="https://www.youtube.com/results?search_query=${data.Title}">
                                <img src="${data.Poster}" alt="Poster do filme">
                            </a>
                        </div>
                        <div class="about-movie">
                            <div class="movie-title">Title: ${data.Title}</div>
                            <div class="movie-title">Genre: ${data.Genre}</div>
                            <div class="movie-year">Year: ${data.Year}</div>
                            <div class="movie-plot">Plot: ${data.Plot}</div>
                            <div class="movie-writers">Writer: ${data.Writer}</div>
                            <div class="movie-director">Director: ${data.Director}</div>
                            <div class="movie-actors">Actors: ${data.Actors}</div>
                            <div class="movie-awards">Awards: ${data.Awards}</div>
                            <h4> Do your rate here: </h4>
                            <select class="avaliation" name="avaliation" id="avaliation">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                    </div>
                `;

                title_page.innerHTML = `${data.Title}`;

                rotten_tomatoes.innerHTML += rottenTomatoesValue
            } else {
                result.innerHTML = '<div class="movie-not-found">Não encontrado</div>';
            }
        })
        .catch(error => {
            result.innerHTML = `<div class="movie-error">Erro: ${error}</div>`;
            title_page.innerHTML = '';
        });
}


// get title and search movie when load the page moviepage.html
document.addEventListener('DOMContentLoaded', () => {
    const title = getParameterByName('title');
    if (title) {
        searchMovie(title);
    } else {
        title_page.innerHTML = 'Movie Page';
    }
});
