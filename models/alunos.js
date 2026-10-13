import { alunos } from "../dados/listagem-alunos.js";

// Mantém o contrato de sucesso/erro por Promise exigido pelo RF06.
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

      // Usa o maior ID existente, pois o tamanho do array não garante um ID livre.
      const maiorId = alunos.reduce((maior, item) => {
        return Math.max(maior, item.id);
      }, 0);

      aluno.id = maiorId + 1;

      // Altera apenas a memória da página; não grava no arquivo da listagem.
      alunos.push(aluno);

      resolve("Aluno cadastrado com sucesso!");
    } catch (erro) {
      reject(new Error("Erro ao cadastrar o aluno"));
    }
  });
}
