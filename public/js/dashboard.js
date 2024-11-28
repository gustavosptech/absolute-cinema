if (sessionStorage.PAIS_USUARIO == 'null') {
    window.location = "./registerAddress.html";
}

if (sessionStorage.ID_USUARIO == null) {
    window.location = "./index.html";
}

const apimaisAvaliadosURL = '/dashboard/maisAvaliados';

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

const apiMelhorAvaliadosURL = '/dashboard/MelhorAvaliado';

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

const apiGeneroURL = '/dashboard/genero';

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
        const date = data.map(item => item.datas_avaliacoes);

        renderizarGraficoBarras(labels, valores);
    } catch (error) {
        console.error('Erro ao buscar os dados de gêneros:', error);
    }
}

function renderizarGraficoBarras(labels, data) {
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

const apiLocationURL = '/dashboard/location';

async function existingLocation() {
    try {
        const response = await fetch(apiLocationURL);

        if (!response.ok) {
            throw new Error('Erro ao buscar os dados.');
        }

        const data = await response.json();
        console.log(data);

        const countries = Array.from(new Set(data.map(location => location.pais)));
        const states = Array.from(new Set(data.map(location => location.estado)));
        const cities = Array.from(new Set(data.map(location => location.cidade)));

        preencherSelect(countries, states, cities);

    } catch (error) {
        console.error('Erro ao buscar os dados das regiões:', error);
    }
}

function preencherSelect(country, state, city) {
    for (var i = 0; i < city.length; i++) {

        if (country[i] != country[i + 1]) {
            select_country.innerHTML += `<br><option value="${country[i]}">${country[i]}</option>`;
        }

        if (state[i] != state[i + 1]) {
            select_state.innerHTML += `<br><option value="${state[i]}">${state[i]}</option>`;
        }

        if (city[i] != city[i + 1]) {
            select_city.innerHTML += `<br><option value="${city[i]}">${city[i]}</option>`;
        }
    }
}

function searchLocation() {  
    const pais = select_country.value;  
    const estado = select_state.value;  
    const cidade = select_city.value;  

    if (pais == "#") {  
        return alert('Select a country!');  
    }  
    if (estado == "#") {  
        return alert('Select a state!');  
    }  
    if (cidade == "#") {  
        return alert('Select a city!');  
    }  

    fetch("/dashboard/searchLocation", {  
        method: "POST",  
        headers: {  
            "Content-Type": "application/json",  
        },  
        body: JSON.stringify({  
            paisServer: pais,  
            estadoServer: estado,  
            cidadeServer: cidade  
        }),  
    })  
    .then(function (resposta) {  
        console.log("resposta: ", resposta);  
        if (resposta.ok) {  
            return resposta.json();
        } else {  
            throw new Error("Cadastro falhou");  
        }  
    })  
    .then(function (data) {  
        console.log("json da função searchLocation", data);

        // Verificar se há dados
        if (data.length < 1) {
            locationSelected.innerHTML = `<h3>${cidade}</h3>  
                                          <h3>No user has rated a movie yet or is not a right place</h3>`;
            return;
        }

        const generos = data.map(item => item.genero);
        const qtdAvaliacoes = data.map(item => item.media_avaliacao);

        
        locationSelected.innerHTML = `  <h3>${cidade}</h3>  
                                        <h3>Top Genre: ${data[0].genero}</h3><br><br>
                                        <div class="graficoPizza" id="graficoGeneros"><canvas id="pieChart"></canvas></div>`; 

        renderizarGraficoPizza(generos, qtdAvaliacoes);
    })  
    .catch(function (erro) {  
        console.error('Erro ao buscar regiões selecionadas:', erro);  
    });  
}

function renderizarGraficoPizza(generos, qtdAvaliacoes) {
    const ctx = document.getElementById("pieChart");

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: generos,
            datasets: [{
                label: 'Avaliações por Gênero',
                data: qtdAvaliacoes,
                backgroundColor: ['#d08e15', '#b35f14', '#3a0f0d', '#923a1a', '#d27a1a'],
                borderColor: ['#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'white',
                        font: {
                            size: 14
                        }
                    }
                }
            }
        }
    });
}



fetchGenerosFavoritos();
maisAvaliados();
melhorAvaliados();
existingLocation();