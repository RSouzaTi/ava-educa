import { usuarios } from "../dados/listagem-usuarios.js";        

// Autenticação simulada: consulta dados locais e retorna uma Promise (RF08).
export function login(usuario, senha) {
    return new Promise((resolve, reject) => {
        const usuarioEncontrado = usuarios.find((item) => {
            return item.email === usuario && item.senha === senha;
        });

        if (usuarioEncontrado) {
            resolve(usuarioEncontrado);
        } else {
            reject(
                new Error(
                    "Dados incorretos. Favor verificar e tentar novamente"
                )
            );
        }
    });
}
