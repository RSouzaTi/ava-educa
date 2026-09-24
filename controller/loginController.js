import {login } from "../models/auth.js";

const formulario = document.querySelector("#form-login");
const campoEmail = document.querySelector("#email");
const campoSenha = document.querySelector("#senha");
const feedback = document.querySelector("#feedback");
const botaoEntrar = document.querySelector("#botao-entrar");
const linkEsqueciSenha = document.querySelector("#esqueci-senha");

formulario.addEventListener("submit", async (event) => {
  event.preventDefault();

  feedback.textContent = "";
    botaoEntrar.disabled = true;
  botaoEntrar.textContent = "Entrando...";

  try {
    const usuario = await login(campoEmail.value, campoSenha.value);

    const { senha, ...usuarioSemSenha } = usuario;

    sessionStorage.setItem(
        "usuarioLogado",
        JSON.stringify(usuarioSemSenha)
    );

    window.location.replace("./dashboard.html");
    } catch (error) {
        feedback.textContent = error.message;
    } finally {
        botaoEntrar.disabled = false;
        botaoEntrar.textContent = "Entrar";
    }
});

formulario.addEventListener("input", () => {
    feedback.textContent = "";

});

linkEsqueciSenha.addEventListener("click", (event) => {
    event.preventDefault();

    window.alert("A funcionalidade de recuperação de senha está em construção");

});