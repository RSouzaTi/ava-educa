import { carregarCurso } from "../js/dashboard.js";

const listaCursos = document.querySelector("#lista-cursos");
const mensagemCursos = document.querySelector("#mensagem-cursos");

// O controller fornece os elementos da tela ao módulo responsável pelo carregamento.
carregarCurso(listaCursos, mensagemCursos);
