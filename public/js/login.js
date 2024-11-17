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
    else {
        setInterval(sumirMensagem, 5000)
    }

    // console.log("FORM LOGIN: ", emailVar);
    // console.log("FORM SENHA: ", senhaVar);

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

                setTimeout(() => {
                    window.location = "./moviepage.html";
                }, 1000); // apenas para exibir o loading
            });

        } else {

            console.log("There was an error trying to log in!");

            resposta.text().then(texto => {
                console.error(texto);
                alert(texto)
            });
        }

    }).catch(function (erro) {
        alert(erro)
        console.log(erro);
    })

    return false;
}

function sumirMensagem() {
    cardErro.style.display = "none"
}