if (sessionStorage.PAIS_USUARIO == 'null') {
    window.location = "./registerAddress.html";
}

if (sessionStorage.ID_USUARIO == null) {
    window.location = "./index.html";
}

const apimaisAvaliadosURL = '/avaliacao/maisAvaliados';

async function maisAvaliados() {
    try {
        const response = await fetch(apimaisAvaliadosURL);

        if (!response.ok) {
            throw new Error('Erro ao buscar dados do filme mais avaliado')
        }

        const data = await response.json();

        console.log('dados mais avaliados' + data)

        mostRated.innerHTML += data.map(item => item.Filme)
    } catch (error) {
        console.error('Erro ao buscar o filme mais avaliado', error);
    }
}

const apiMelhorAvaliadosURL = '/avaliacao/MelhorAvaliado';

async function melhorAvaliados() {
    try {
        const response = await fetch(apiMelhorAvaliadosURL);

        if (!response.ok) {
            throw new Error('Erro ao buscar dados do filme melhor avaliado')
        }

        const data = await response.json();

        console.log('dados mais avaliados' + data)

        bestRated.innerHTML += data.map(item => item.Filme)
    } catch (error) {
        console.error('Erro ao buscar o filme melhor avaliado', error);
    }
}

const apiRegiaoQueMaisAvaliouURL = '/avaliacao/RegiaoQueMaisAvaliou';

const apiGeneroURL = '/avaliacao/genero';

async function fetchGenerosFavoritos() {
    try {

        const response = await fetch(apiGeneroURL);


        if (!response.ok) {
            throw new Error('Erro ao buscar os dados.');
        }

        const data = await response.json();

        console.log(data);

        const labels = data.map(item => item.genero);
        const valores = data.map(item => item.qtd_avaliacoes);

        renderChart(labels, valores);
    } catch (error) {
        console.error('Erro ao buscar os dados de gêneros:', error);
    }
}

function renderChart(labels, data) {
    const ctx = document.getElementById("myChart");

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Favorite genres',
                data,
                borderWidth: 1,
                borderColor: ['#b87f06'],
                color: ['#ffffff'],
                backgroundColor: ['#ffad00']
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        color: 'white',
                        font: {
                            size: 14
                        }
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: 'white'
                    }
                },
                y: {
                    ticks: {
                        color: 'white'
                    }
                }
            }
        }
    });
}

fetchGenerosFavoritos();
maisAvaliados();
melhorAvaliados();