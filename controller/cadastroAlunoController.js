import { Aluno } from "../models/Aluno.js";
import { cadastrarAluno } from "../models/alunos.js";

const formulario = document.querySelector("#form-aluno");
const feedback = document.querySelector("#feedback-aluno");
const feedbackCep = document.querySelector("#feedback-cep");
const botaoSalvar = document.querySelector("#botao-salvar");
const campCep = document.querySelector("#cep");


const camposEndereco = [
    "cidade",
    "estado",
    "logradouro",
    "bairro"
];

let consultaAtual = 0;
let cepConsultado = "";
let salvando = false;

function campo(nome) {
  return formulario.elements.namedItem(nome);
}

function valor(nome) {
    return campo(nome).value.trim();
}

function limparEndereco() {
    for (const nome of camposEndereco ) {
        campo(nome).value = "";
    }
}

async function consultarCep() {
    const numeroConsulta = ++consultaAtual;
    const cepDigitado = valor("cep");

    feedbackCep.textContent = "";

      if (!cepDigitado) {
        return true;
}
      if (!/^\d{5}-?\d{3}$/.test(cepDigitado)) {
        feedbackCep.textContent = "informe um CEP com 8 numeros.";
        return false;
 }
 const cep = cepDigitado.replace("-", "");

 if (cep === cepConsultado) {
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

    if(numeroConsulta !== consultaAtual) {
        return false;
    }
    if (endereco.erro) {
        throw new Error("CEP não encontrado.");

    }

     campo("cidade").value = endereco.localidade ?? "";
     campo("estado").value = endereco.uf ?? "";
     campo("logradouro").value = endereco.logradouro ?? "";
     campo("bairro").value = endereco.bairro ?? "";

     cepConsultado = cep;
     feedbackCep.textContent =  "Endereço consultado.";

     return true;
    } catch (erro) {
        if (numeroConsulta !== consultaAtual) {
            return false;
    }

    feedbackCep.textContent = 
    erro instanceof TypeError
    ? "Falha de conexão ao consultar o CEP. Tente novamente."
    :erro.message;

    return false;

    }
 }

    campCep.addEventListener("input", () => {
    consultaAtual++;
    cepConsultado= "";
    feedbackCep.textContent = "";
    limparEndereco();
 });

    campCep.addEventListener("blur", () => {
    consultarCep();
 });

    formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (salvando) {
        return;
    }

    feedback.textContent = "";

      // Remove espaços nas pontas antes de validar.
    for (const elemento of formulario.elements) {
        if(elemento.tagName === "INPUT") {
            elemento.value = elemento.value.trim();
        }
    }

    if (!formulario.reportValidity()) {
        return;
    }

    if (valor("nome").length < 4 || valor("nome").length > 80) {
        feedback.textContent = "O nome deve ter entre 4 e 80 caracteres.";
        campo("nome").focus();
        return;
    }

    const nascimento = window.moment(
        valor("dataNascimento"),
        "DD/MM/YYYY",
        true
    );

    const limiteInicial =  window.moment(
        "01/01/1990",
        "DD/MM/YYYY",
        true
    );

    const hoje = window.moment().startOf("day");

    if(
        !nascimento.isValid() ||
        !nascimento.isAfter(limiteInicial, "day") ||
        !nascimento.isBefore(hoje, "day")
    ) {
        feedback.textContent = 
        "Informe uma data válida em DD/MM/AAAA, posterior a " +
        "01/01/1990 e anterior a hoje.";

        campo("dataNascimento").focus();
        return;

    }

        // validação de formato; não calcula os digitos verificadores.
        if (!/^(?:\d{11}|\d{3}\.\d{3}\.\d{3}-\d{2})$/.test(valor("cpf"))) {
            feedback.textContent = 
            "informe o CPF com 11 número ou no formato 000.000.000-00.";

            campo("cpf").focus();
            return
        }
        
        const telefone = valor("telefone");
        const numerosTelefone = telefone.replace(/\D/g, "");
        
        if (
             !/^[\d()\s-]+$/.test(telefone) ||
             !/^\d{10,11}$/.test(numerosTelefone)
        ) {
            feedback.textContent = "Informe o telefone com DDD e 10 ou 11 número.";
            campo("telefone").focus();
            return;
        }

        salvando = true;
        botaoSalvar. disabled = true;
        botaoSalvar.textContent = "Salvando...";

        // Impede mudanças nos dados durante a consulta e o cadastro.
        const grupos = formulario.querySelectorAll("fieldset");

        for (const grupo of grupos) {
            grupo.disabled = true;
        }

        try {
            const cepValido = await consultarCep();

            if (!cepValido) {
                feedback.textContent = "resolva a consulta do CEP antes de salvar.";
                return;
            }

            const aluno = new Aluno({
                nome: valor("nome"),
                genero: valor("genero"),
                dataNascimento: nascimento.format("YYYY-MM-DD"),
                cpf: valor("cpf"),
                telefone: valor("telefone"),
                email: valor("email"),
                cep: valor("cep"),
                cidade: valor("cidade"),
                estado: valor("estado"),
                logradouro: valor("logradouro"),
                numero: valor("numero"),
                complemento: valor("complemento"),
                bairro: valor("bairro"),
            });

        const mensagem = await cadastrarAluno(aluno);

            formulario.reset();
            consultaAtual++;
            cepConsultado = "";
            feedbackCep.textContent = "";
            feedback.textContent = mensagem;

        }catch (erro) {
        feedback.textContent = erro.message;
        }finally {
            for (const grupo of grupos) {
                grupo.disabled = false;
            }

            salvando = false;
            botaoSalvar.disabled = false;
            botaoSalvar.textContent = "Salvar";
        }
    });
        if (typeof window.moment === "function") {
            botaoSalvar.disabled = false;
        }else {
            feedback.textContent = 
            "Não foi possivel carregar o Moment. Verifique a conexão e atualize a página"
        }

