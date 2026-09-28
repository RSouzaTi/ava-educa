import { campo, valor, limparEndereco, consultarCep, estadoCep } from "../js/formularioAluno.js";
import { Aluno } from "../models/Aluno.js";
import { cadastrarAluno } from "../models/alunos.js";

const formulario = document.querySelector("#form-aluno");
const feedback = document.querySelector("#feedback-aluno");
const feedbackCep = document.querySelector("#feedback-cep");
const botaoSalvar = document.querySelector("#botao-salvar");
const campCep = document.querySelector("#cep");


let salvando = false;

    campCep.addEventListener("input", () => {
    estadoCep.consultaAtual++;
    estadoCep.cepConsultado = "";
    feedbackCep.textContent = "";
    limparEndereco(formulario);
 });

    campCep.addEventListener("blur", () => {
    consultarCep(formulario, feedbackCep);
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

    if (valor(formulario, "nome").length < 4 || valor(formulario, "nome").length > 80) {
        feedback.textContent = "O nome deve ter entre 4 e 80 caracteres.";
        campo(formulario, "nome").focus();
        return;
    }

    const nascimento = window.moment(
        valor(formulario, "dataNascimento"),
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

        campo(formulario, "dataNascimento").focus();
        return;

    }

        // validação de formato; não calcula os digitos verificadores.
        if (!/^(?:\d{11}|\d{3}\.\d{3}\.\d{3}-\d{2})$/.test(valor(formulario, "cpf"))) {
            feedback.textContent = 
            "informe o CPF com 11 número ou no formato 000.000.000-00.";

            campo(formulario, "cpf").focus();
            return
        }
        
        const telefone = valor(formulario, "telefone");
        const numerosTelefone = telefone.replace(/\D/g, "");
        
        if (
             !/^[\d()\s-]+$/.test(telefone) ||
             !/^\d{10,11}$/.test(numerosTelefone)
        ) {
            feedback.textContent = "Informe o telefone com DDD e 10 ou 11 número.";
            campo(formulario, "telefone").focus();
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
            const cepValido = await consultarCep(formulario, feedbackCep);

            if (!cepValido) {
                feedback.textContent = "resolva a consulta do CEP antes de salvar.";
                return;
            }

            const aluno = new Aluno({
                nome: valor(formulario, "nome"),
                genero: valor(formulario, "genero"),
                dataNascimento: nascimento.format("YYYY-MM-DD"),
                cpf: valor(formulario, "cpf"),
                telefone: valor(formulario, "telefone"),
                email: valor(formulario, "email"),
                cep: valor(formulario, "cep"),
                cidade: valor(formulario, "cidade"),
                estado: valor(formulario, "estado"),
                logradouro: valor(formulario, "logradouro"),
                numero: valor(formulario, "numero"),
                complemento: valor(formulario, "complemento"),
                bairro: valor(formulario, "bairro"),
            });

        const mensagem = await cadastrarAluno(aluno);

            formulario.reset();
            estadoCep.consultaAtual++;
            estadoCep.cepConsultado = "";
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
