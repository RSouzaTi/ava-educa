import { listarCursos } from "../models/cursos.js";
import { criarCard } from "./cardCurso.js";

export async function carregarCurso(listaCursos, mensagemCursos) {
    mensagemCursos.textContent = "Carregando curso...";
    listaCursos.replaceChildren();

    try{
        const usuarioSalvo = sessionStorage.getItem("usuarioLogado");

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
