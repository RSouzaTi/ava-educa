const camposEndereco = [
    "cidade",
    "estado",
    "logradouro",
    "bairro"
];

// Compartilha o controle de respostas antigas e do último CEP consultado com sucesso.
export const estadoCep = { consultaAtual: 0, cepConsultado: "" };

// Localiza os controles pelo atributo name usado no formulário.
export function campo(formulario, nome) {
  return formulario.elements.namedItem(nome);
}

// Padroniza a leitura, desconsiderando espaços nas extremidades.
export function valor(formulario, nome) {
    return campo(formulario, nome).value.trim();
}

// Limpa os campos preenchidos pela API, preservando número e complemento manuais.
export function limparEndereco(formulario) {
    for (const nome of camposEndereco ) {
        campo(formulario, nome).value = "";
    }
}

// Retorna se o cadastro pode prosseguir e informa falhas sem propagar a exceção.
export async function consultarCep(formulario, feedbackCep) {
    const numeroConsulta = ++estadoCep.consultaAtual;
    const cepDigitado = valor(formulario, "cep");

    feedbackCep.textContent = "";

      // O endereço é opcional; um CEP informado precisa passar pela validação.
      if (!cepDigitado) {
        return true;
}
      if (!/^\d{5}-?\d{3}$/.test(cepDigitado)) {
        feedbackCep.textContent = "informe um CEP com 8 numeros.";
        return false;
 }
 const cep = cepDigitado.replace("-", "");

 // Evita repetir a consulta ao salvar depois de consultar o mesmo CEP no blur.
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

    // Descarta respostas atrasadas caso o usuário já tenha alterado o CEP.
    if(numeroConsulta !== estadoCep.consultaAtual) {
        return false;
    }
    // O ViaCEP pode responder HTTP 200 mesmo quando o CEP não existe.
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
