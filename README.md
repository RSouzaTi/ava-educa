# AVA-EDUCA$

Projeto avaliativo do Módulo 1 do SCTEC: protótipo estático de um Ambiente Virtual de Aprendizagem para centralizar cursos e o cadastro de alunos pela equipe pedagógica.

## Problema e solução proposta

A proposta é reunir informações de cursos e alunos em uma interface única, facilitando o trabalho da equipe pedagógica. O sistema deverá oferecer acesso por login, um dashboard com os cursos do usuário e uma área de cadastro e listagem de alunos.

## Estado atual

O projeto está em fase inicial. Existem um `index.html` com a estrutura HTML básica, ainda sem conteúdo ou comportamento, e as pastas vazias `controller/`, `dados/`, `models/` e `views/`.

As funcionalidades abaixo são requisitos planejados e ainda não estão implementadas. Não há backend, banco de dados, dependências instaladas ou scripts de build.

## Técnicas e tecnologias

- **HTML5:** estrutura das páginas; o arquivo inicial já está criado.
- **CSS3 e JavaScript puro:** previstos para estilos, responsividade, interações e regras do protótipo.
- **Módulos JavaScript (`export` e `import`), classe `Aluno` e Promises:** previstos para organizar e manipular os dados.
- **`sessionStorage`:** previsto para guardar o usuário autenticado na sessão.
- **Moment.js:** previsto para trabalhar com datas no formato `DD/MM/YYYY`.
- **ViaCEP e `fetch`:** previstos para consultar o endereço a partir do CEP.
- **MVC (Model–View–Controller):** organização autorizada para o projeto, ainda a ser implementada.

O escopo utiliza HTML, CSS e JavaScript puro, sem Angular, React, Vue, TypeScript ou bundlers. O login será uma simulação com dados locais, sem autenticação de servidor.

## Estrutura atual

```text
ava-educa/
├── controller/    # Vazia; reservada para os controladores
├── dados/         # Vazia; reservada para as listagens locais
├── models/        # Vazia; reservada para os modelos
├── views/         # Vazia; reservada para as telas
├── index.html     # Estrutura HTML inicial, sem conteúdo
└── README.md
```  

Pastas vazias não são versionadas pelo Git e podem não aparecer em um clone até receberem arquivos.

### Organização proposta

A separação MVC deverá distribuir os modelos e serviços locais (`Aluno.js`, `auth.js`, `cursos.js` e `alunos.js`) em `models/`, os controladores de login, dashboard e alunos na camada de controle, e as páginas e scripts de interface em `views/`. A pasta `dados/` deverá conter as listagens locais.

A proposta também prevê `css/`, `assets/` e `js/app.js`, que ainda não existem. Foi discutido o nome `controllers/` para a camada de controle; a pasta criada atualmente se chama `controller/`. Essa organização é um plano, não uma implementação concluída.

## Funcionalidades planejadas

- **Entrada e login:** redirecionar `index.html` para a tela de login por meio de `js/app.js`. A função `login(usuario, senha)` deverá retornar uma Promise, validar uma listagem local e guardar o usuário em `sessionStorage`.
- **Navegação:** apresentar cabeçalho com o nome do sistema e o usuário, além das opções Dashboard, Cursos (desabilitada), Cadastro de Alunos e Sair.
- **Dashboard:** exibir cards dos cursos vinculados ao usuário, obtidos por `listarCursos(usuario)`, com retorno em Promise.
- **Cadastro de alunos:** utilizar a classe `Aluno` e a função `cadastrarAluno(aluno)`, com retorno em Promise, criação de ID único e inserção em um array.
- **Formulário:** incluir nome com 4 a 80 caracteres, gênero, nascimento, CPF, telefone, email e endereço. A data de nascimento deverá ser estritamente posterior a 01/01/1990 e anterior à data atual.
- **Datas e endereço:** trabalhar com datas no formato `DD/MM/YYYY` usando Moment.js e consultar o ViaCEP com `fetch`.
- **Listagem:** apresentar os alunos em uma tabela, conforme os requisitos técnicos.
- **Responsividade:** adaptar a interface para diferentes tamanhos de tela.

Os alunos cadastrados serão mantidos apenas em memória: os novos registros serão perdidos ao recarregar a página. O armazenamento do usuário em `sessionStorage` não representa persistência dos cadastros.

## Como executar localmente

Não é necessário instalar pacotes com npm. Para servir os arquivos pelo VS Code:

1. Abra a pasta `ava-educa` no VS Code.
2. Instale a extensão **Live Server**, caso ainda não esteja disponível.
3. Clique com o botão direito em `index.html` e selecione **Open with Live Server**.
4. Acesse o endereço local aberto pelo navegador.

Neste estágio, a página ficará em branco, pois o HTML ainda não tem conteúdo. O login e as demais telas estarão disponíveis após sua implementação. Não há credenciais de demonstração definidas nos arquivos atuais.

Use um servidor estático local durante o desenvolvimento para permitir o carregamento dos módulos JavaScript previstos. A consulta ao ViaCEP dependerá de conexão com a internet quando for implementada.

## Fluxo de trabalho com Git

As branches de funcionalidades devem partir de `develop`, e seus pull requests devem ter `develop` como destino. Exemplo para uma nova funcionalidade, com as alterações anteriores já organizadas:

```bash
git switch develop
git switch -c feature/nome-da-funcionalidade
```

A funcionalidade de login utiliza a branch `feature/login`. Se ela já existir, use `git switch feature/login` para acessá-la, sem recriá-la.

Após a revisão de cada funcionalidade, integre o respectivo pull request em `develop` e preserve as branches. Ao concluir o projeto, abra o pull request final de `develop` para `main`.

## Planejamento

As atividades estão organizadas no [Trello do projeto AVA-EDUCA](https://trello.com/b/SrUBtQl3/ava-educa-projeto-avaliativo-m%C3%B3dulo-1).

## Melhorias futuras

Após atender ao escopo avaliativo, possíveis evoluções incluem:

- Persistência dos cadastros com backend e banco de dados.
- Autenticação de servidor e controle de permissões.
- Ativação da área de Cursos e ampliação da gestão de alunos.
- Filtros e busca nas listagens.
- Aprimoramentos de acessibilidade e testes automatizados das regras de validação.

