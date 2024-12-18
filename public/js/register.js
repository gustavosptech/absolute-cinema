

if (sessionStorage.NOME_USUARIO != null) {
    window.location = '../index.html'
}

function cadastrar() {
    // Recupera os valores dos campos
    var nomeVar = input_name.value;
    var emailVar = input_email.value;
    var senhaVar = input_password.value;
    var confirmacaoSenhaVar = input_cofirm_password.value;

    if (
        nomeVar == "" ||
        emailVar == "" ||
        senhaVar == "" ||
        confirmacaoSenhaVar == ""
    ) {
        cardErro.style.display = "block";
        alert('Fill in all fields');
        return
    }

    if (nomeVar.length < 2) {
        alert("The name must have more than one character");
        return
    }

    if (emailVar.indexOf('@') == -1 || emailVar.indexOf('.') == -1) {
        alert("The email must contain '@' and '.'");
        return
    }

    if (senhaVar.length <= 6) {
        alert("Password must be longer than 6 characters");
        return
    }

    if (senhaVar != confirmacaoSenhaVar) {
        alert("Password confirmation must be the same");
        return
    }
    // Envia os dados via fetch para o backend
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);
            debugger
            if (resposta.ok) {
                container.style.display = "block";
                container.innerHTML = "<h4>Success</h4>";

                window.location = "/login.html";
                
            } else {
                throw new Error("Cadastro falhou");
            }
        })
        .catch(function (erro) {
            console.log("#ERRO: ", erro);
        });

    return false;
}
