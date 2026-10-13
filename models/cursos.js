import { cursos } from "../dados/listagem-cursos.js";

// O e-mail relaciona o professor aos cursos; ausência de cursos rejeita a Promise (RF07).
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
