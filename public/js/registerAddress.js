if (sessionStorage.ID_USUARIO == null) {
    window.location = '../index.html'
}

function registerAddress() {
    var pais = input_country.value;
    var estado = input_state.value;
    var cidade = input_city.value;
    var idUsuario = sessionStorage.ID_USUARIO

    if (
        pais == '' ||
        estado == '' ||
        cidade == ''
    ) {
        return alert('Fill in all fields')
    }

    if (pais.length < 3) return alert('Please enter a valid country')

    if (estado.length < 2) return alert('Please enter a valid state')

    fetch("/usuarios/endereco", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            paisServer: pais,
            estadoServer: estado,
            cidadeServer: cidade,
            idUsuarioServer: idUsuario
        }),
    })

        .then(function (resposta) {
            console.log("resposta: ", resposta);
            if (resposta.ok) {
                sessionStorage.PAIS_USUARIO = pais;
                sessionStorage.ESTADO_USUARIO = estado;
                sessionStorage.CIDADE_USUARIO = cidade;

                container.style.display = "block";
                container.innerHTML = "<h4>Success</h4>";


                window.location = "./dashboard.html";

            } else {
                throw new Error("Error on register address");
            }
        })
        .catch(function (erro) {
            console.log("#ERRO: ", erro);
        });
}