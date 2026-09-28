const camposEndereco = [
    "cidade",
    "estado",
    "logradouro",
    "bairro"
];

export const estadoCep = { consultaAtual: 0, cepConsultado: "" };

export function campo(formulario, nome) {
  return formulario.elements.namedItem(nome);
}

export function valor(formulario, nome) {
    return campo(formulario, nome).value.trim();
}

export function limparEndereco(formulario) {
    for (const nome of camposEndereco ) {
        campo(formulario, nome).value = "";
    }
}

export async function consultarCep(formulario, feedbackCep) {
    const numeroConsulta = ++estadoCep.consultaAtual;
    const cepDigitado = valor(formulario, "cep");

    feedbackCep.textContent = "";

      if (!cepDigitado) {
        return true;
}
      if (!/^\d{5}-?\d{3}$/.test(cepDigitado)) {
        feedbackCep.textContent = "informe um CEP com 8 numeros.";
        return false;
 }
 const cep = cepDigitado.replace("-", "");

 if (cep === estadoCep.cepConsultado) {
    return true;
 }

    feedbackCep.textContent = "Consultando CEP...";

   try{
    const resposta = await fetch(
      `https://viacep.com.br/ws/${cep}/json/`
    );

    if (!resposta.ok) {
        throw new Error ("Não foi possível consultar o CEP.");
    }

const endereco = await resposta.json();

    if(numeroConsulta !== estadoCep.consultaAtual) {
        return false;
    }
    if (endereco.erro) {
        throw new Error("CEP não encontrado.");

    }

     campo(formulario, "cidade").value = endereco.localidade ?? "";
     campo(formulario, "estado").value = endereco.uf ?? "";
     campo(formulario, "logradouro").value = endereco.logradouro ?? "";
     campo(formulario, "bairro").value = endereco.bairro ?? "";

     estadoCep.cepConsultado = cep;
     feedbackCep.textContent =  "Endereço consultado.";

     return true;
    } catch (erro) {
        if (numeroConsulta !== estadoCep.consultaAtual) {
            return false;
    }

    feedbackCep.textContent = 
    erro instanceof TypeError
    ? "Falha de conexão ao consultar o CEP. Tente novamente."
    :erro.message;

    return false;

    }
 }
