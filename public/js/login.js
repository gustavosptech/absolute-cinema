if (sessionStorage.NOME_USUARIO != null) {
    window.location = '../index.html'
}

function entrar() {
    // aguardar();

    var emailVar = input_email.value;
    var senhaVar = input_password.value;

    if (emailVar == "" || senhaVar == "") {
        alert("Fill in all fields");
        // finalizarAguardar();
        return false;
    }

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        // console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;

                // Adicionando informações de endereço ao sessionStorage
                sessionStorage.ID_ENDERECO = json.idEndereco;
                sessionStorage.PAIS_USUARIO = json.pais;
                sessionStorage.ESTADO_USUARIO = json.estado;
                sessionStorage.CIDADE_USUARIO = json.cidade;

                setTimeout(() => {
                    window.location = "./dashboard.html";
                }, 1000); // apenas para exibir o loading
            });
        } else {

            console.log("There was an error trying to log in!");

            resposta.text().then(erro => {
                console.error(erro);
                alert("Email or password is not valid" + erro) 
            });
        }

    }).catch(function (erro) {
        alert(erro)
        console.log(erro);
    })

    return false;
}