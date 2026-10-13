const botaoSair = document.querySelector("#botao-sair");

if(botaoSair){
    botaoSair.addEventListener("click", () => {
        // Encerra a sessão do protótipo sem apagar outras chaves do navegador.
        sessionStorage.removeItem("usuarioLogado");

        window.location.replace("./login.html");

});
}
