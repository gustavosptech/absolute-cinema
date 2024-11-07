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
        return false; 
    }

    if (nomeVar.length < 2) {
        alert("The name must have more than one character");
        return false;
    }

    if (emailVar.indexOf('@') == -1 || emailVar.indexOf('.') == -1) {
        alert("The email must contain '@' and '.'");
        return false;
    }

    if (senhaVar.length <= 6) {
        alert("Password must be longer than 6 characters");
        return false;
    }

    if (senhaVar != confirmacaoSenhaVar) {
        alert("Password confirmation must be the same");
        return false;
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

        if (resposta.ok) {
            cardErro.style.display = "block";
            container.innerHTML = "Success";

            setTimeout(() => {
                window.location = "login.html";
            }, 2000);

            limparFormulario(); 
            finalizarAguardar();
        } else {
            throw new Error("Cadastro falhou");
        }
    })
    .catch(function (erro) {
        console.log("#ERRO: ", erro);
        finalizarAguardar(); 
    });

    return false; 
}
