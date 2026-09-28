import { formatarData } from "./datas.js";

export function criarCard(curso) {
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
