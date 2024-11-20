// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    if (email != null && nome != null) {
        return true
    }

    return false
}

function exit(){

    sessionStorage.clear()
    nav_login.style.display = 'block';
    nav_register.style.display = 'block';
    nav_exit.style.display = 'none';
    nav_dash.style.display = 'none';

    window.location = 'index.html'

}

if (validarSessao()) {
    nav_login.style.display = 'none';
    nav_register.style.display = 'none';
    nav_exit.style.display = 'block';
    nav_dash.style.display = 'block';
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

