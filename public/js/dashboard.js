if (sessionStorage.PAIS_USUARIO == 'null') {
    window.location = "./registerAddress.html";
}

const apiUrl = '/avaliacao/genero';

async function fetchGenerosFavoritos() {
    try {

        const response = await fetch(apiUrl);


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