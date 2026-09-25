import { listarCursos } from "../models/cursos.js";

const listaCursos = document.querySelector("#lista-cursos");
const mensagemCursos = document.querySelector("#mensagem-cursos");

function formatarData(data) {
    const [ano, mes, dia] = data.split("-");

    return `${dia}/${mes}/${ano}`;
}

function criarCard(curso) {
    const card = document.createElement("article");
    card.classList.add("card-curso");

    const titulo = document.createElement("h3");
    titulo.textContent = curso.nomeCurso;

    const dataInicio = document.createElement("p");
    dataInicio.textContent = `Inicio: ${formatarData(curso.dataInicio)}`;

    const dataFim = document.createElement("p");
    dataFim.textContent = `Fim: ${formatarData(curso.dataFim)}`;

    card.append(titulo, dataInicio, dataFim);

    return card;
}

async function carregarCurso() {
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

carregarCurso();
