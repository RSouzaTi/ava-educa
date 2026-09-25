import { cursos } from "../dados/listagem-cursos.js";

export function listarCursos(usuario) {
  return new Promise((resolve, reject) => {
    const cursosDoUsuario = cursos.filter((curso) => {
      return curso.emailProfessor === usuario.email;
    });

    if (cursosDoUsuario.length === 0) {
      reject(
        new Error("Não há cursos cadastrados para esse usuário")
      );
      return;
    }

    resolve(cursosDoUsuario);
  });
}