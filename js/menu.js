const botaoSair = document.querySelector("#botao-sair");

if(botaoSair){
    botaoSair.addEventListener("click", () => {
        sessionStorage.removeItem("usuarioLogado");

        window.location.replace("./login.html");

});
}