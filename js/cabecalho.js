const usuarioSalvo = sessionStorage.getItem("usuarioLogado");
const nomeUsuario = document.querySelector("#nome-usuario");

// Preenche o cabeçalho compartilhado quando há sessão; este script não bloqueia acesso.
if (usuarioSalvo && nomeUsuario) {
    const usuario = JSON.parse(usuarioSalvo);

    nomeUsuario.textContent = usuario.nome;
}
