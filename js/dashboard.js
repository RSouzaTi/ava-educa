import { listarCursos } from "../models/cursos.js";
import { criarCard } from "./cardCurso.js";

// Consulta os cursos da sessão e apresenta os cards ou o feedback da Promise.
export async function carregarCurso(listaCursos, mensagemCursos) {
    mensagemCursos.textContent = "Carregando curso...";
    listaCursos.replaceChildren();

    try{
        const usuarioSalvo = sessionStorage.getItem("usuarioLogado");

        // Impede carregar este dashboard sem um usuário salvo na sessão.
        if (!usuarioSalvo) {
        window.location.replace("./login.html");
            return
        }

        const usuario = JSON.parse(usuarioSalvo);
        const cursos = await listarCursos(usuario);


        for (const curso of cursos) {
            const card = criarCard(curso);
            listaCursos.appendChild(card);
        }

        mensagemCursos.textContent = "";
    } catch (erro) {
  mensagemCursos.textContent = erro.message;

 } 
}
