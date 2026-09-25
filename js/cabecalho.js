const usuarioSalvo = sessionStorage.getItem("usuarioLogado");
const nomeUsuario = document.querySelector("#nome-usuario");

if (usuarioSalvo && nomeUsuario) {
    const usuario = JSON.parse(usuarioSalvo);

    nomeUsuario.textContent = usuario.nome;
}
