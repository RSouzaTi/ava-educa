import { alunos } from "../dados/listagem-alunos.js";

export function cadastrarAluno(aluno) {
  return new Promise((resolve, reject) => {
    try {
      if (
        !aluno ||
        typeof aluno !== "object" ||
        Array.isArray(aluno)
      ) {
        throw new Error("Objeto de aluno inválido.");
      }

      const maiorId = alunos.reduce((maior, item) => {
        return Math.max(maior, item.id);
      }, 0);

      aluno.id = maiorId + 1;

      alunos.push(aluno);

      resolve("Aluno cadastrado com sucesso!");
    } catch (erro) {
      reject(new Error("Erro ao cadastrar o aluno"));
    }
  });
}