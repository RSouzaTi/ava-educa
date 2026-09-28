import { carregarCurso } from "../js/dashboard.js";

const listaCursos = document.querySelector("#lista-cursos");
const mensagemCursos = document.querySelector("#mensagem-cursos");

carregarCurso(listaCursos, mensagemCursos);
