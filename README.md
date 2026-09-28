# AVA Educa

Projeto avaliativo do Módulo 1 do SCTEC: protótipo de um Ambiente Virtual de Aprendizagem para consultar cursos e cadastrar alunos pela equipe pedagógica.

## Funcionalidades implementadas

- **RF01 — Login:** redirecionamento da página inicial para o login, validação de e-mail e senha, feedback de erro e armazenamento do usuário sem a senha na `sessionStorage`. A recuperação de senha exibe um aviso de funcionalidade em construção.
- **RF02 — Cabeçalho:** nome do sistema e do usuário nas páginas de dashboard e cadastro.
- **RF03 — Menu:** navegação para Dashboard e Cadastro de Alunos, opção Cursos desabilitada e saída que remove o usuário da sessão.
- **RF04 e RF07 — Dashboard e cursos:** consulta dos cursos pelo e-mail do professor e exibição de cards com nome, data inicial e data final. Há uma mensagem quando o usuário não possui cursos.
- **RF05 — Formulário:** cadastro com dados pessoais e endereço, validações e consulta de CEP pelo ViaCEP.
- **RF06 — Cadastro:** criação de identificador numérico e inclusão do aluno na listagem em memória, com retorno de sucesso ou erro por Promise.
- **RF08 — Autenticação:** consulta à listagem local de usuários, com retorno por Promise.
- **RF09 — Responsividade:** estilos com Flexbox, Grid, larguras fluidas e media queries. Abaixo de 768px, o menu fica acima do conteúdo; a partir de 768px, o formulário utiliza duas colunas.
- **RF11 — Classe:** a classe `Aluno` inicializa as propriedades pessoais e de endereço pelo constructor.
- **RF12 — Módulos:** funções de autenticação, cursos, cadastro, auxiliares, classe e listagens compartilhadas utilizam `export` e `import`.

A existência dos estilos responsivos não substitui a verificação visual nas larguras indicadas no roteiro de testes.

## Tecnologias

HTML5, CSS3 e JavaScript puro, sem framework ou etapa de build. O projeto utiliza módulos JavaScript, Promises, `async`/`await`, `sessionStorage`, Moment.js 2.30.1 para datas e `fetch` para consultar o ViaCEP.

## Estrutura do projeto

```text
ava-educa/
├── controller/
│   ├── cadastroAlunoController.js
│   ├── dashboardController.js
│   └── loginController.js
├── css/
│   └── layout.css
├── dados/
│   ├── listagem-alunos.js
│   ├── listagem-cursos.js
│   └── listagem-usuarios.js
├── js/
│   ├── app.js
│   ├── cabecalho.js
│   ├── cardCurso.js
│   ├── dashboard.js
│   ├── datas.js
│   ├── formularioAluno.js
│   └── menu.js
├── models/
│   ├── Aluno.js
│   ├── alunos.js
│   ├── auth.js
│   └── cursos.js
├── views/
│   ├── cadastro-alunos.html
│   ├── dashboard.html
│   └── login.html
├── index.html
└── README.md
```

- `views/`: estrutura das telas.
- `controller/`: eventos dos formulários e conexão entre interface e regras do sistema.
- `models/`: classe Aluno e funções de autenticação, consulta e cadastro.
- `dados/`: arrays com dados de demonstração.
- `js/`: redirecionamento inicial, cabeçalho, menu e auxiliares de datas, cards, carregamento de cursos e consulta de CEP.
- `css/`: estilos compartilhados e regras responsivas.

## Como executar

1. Abra a pasta do projeto no VS Code.
2. Instale a extensão Live Server, caso necessário.
3. Clique com o botão direito em `index.html` e selecione **Open with Live Server**.
4. O navegador abrirá a tela de login. Entre com um usuário de demonstração.

Não é necessário instalar pacotes com npm. Use um servidor estático local, pois os módulos JavaScript precisam ser servidos por HTTP. A consulta ao ViaCEP e o carregamento do Moment.js pelo CDN dependem de internet.

## Usuários de demonstração

As credenciais abaixo são dados fictícios incluídos no protótipo.

| Usuário | E-mail | Senha | Resultado no dashboard |
| --- | --- | --- | --- |
| Ana Carolina Silva | ana.silva@edutech.com | 123456 | 6 cursos |
| Carlos Eduardo Santos | carlos.santos@edutech.com | 654321 | 2 cursos |
| Mariana Oliveira Costa | mariana.costa@edutech.com | edu2026 | Mensagem de ausência de cursos |

## Regras do cadastro

- Nome obrigatório, entre 4 e 80 caracteres.
- Gênero, nascimento, CPF, telefone e e-mail obrigatórios.
- Nascimento informado em `DD/MM/YYYY`, validado estritamente pelo Moment.js: posterior a 01/01/1990 e anterior ao dia atual. O objeto recebe a data em `YYYY-MM-DD`.
- CPF com 11 números ou no formato `000.000.000-00`. A validação atual verifica o formato, sem calcular dígitos verificadores.
- Telefone com DDD e 10 ou 11 números; e-mail validado pelo campo HTML.
- Endereço opcional. Quando informado, o CEP deve ter oito números, com hífen opcional. A consulta preenche cidade, estado, logradouro e bairro e informa falhas de conexão ou CEP inexistente.
- Após a validação, o controller cria uma instância de `Aluno` e chama `cadastrarAluno(aluno)`. Em caso de sucesso, limpa o formulário e apresenta a mensagem retornada.

## Limitações do protótipo

O login é uma simulação no navegador, sem autenticação de servidor. Não há backend nem banco de dados.

Os novos alunos ficam apenas no array em memória: recarregar a página descarta os cadastros adicionados. O JavaScript não grava alterações no arquivo de listagem. A `sessionStorage` guarda somente os dados do usuário logado, não os cadastros.

Ainda não há tela de listagem de alunos, recuperação de senha ou área de gestão de cursos ativa.

## Roteiro de testes manuais

1. Abra o index e confirme o redirecionamento para o login.
2. Teste credenciais incorretas e confira o feedback; teste o link de recuperação de senha.
3. Entre com cada usuário e confira os resultados da tabela de demonstração, o nome no cabeçalho e as datas dos cards.
4. Navegue entre dashboard e cadastro; confirme que Cursos está desabilitado e Sair retorna ao login.
5. No cadastro, teste campos obrigatórios vazios, nome curto, CPF e telefone malformados e e-mail inválido.
6. Teste nascimento impossível, 01/01/1990, data atual e data futura: todos devem ser rejeitados. Teste uma data permitida, como 15/05/2000.
7. Teste CEP vazio, malformado, inexistente e válido, além de falha de conexão.
8. Salve um cadastro válido e confira a mensagem de sucesso e a limpeza do formulário.
9. No modo responsivo do DevTools, verifique login, dashboard e cadastro nas larguras de **375, 767, 768 e 1366px**. Confira campos, botões, cards, navegação e ausência de cortes ou rolagem horizontal.

Este roteiro descreve verificações a executar; não representa uma certificação de que todos os cenários foram testados.

## Fluxo de trabalho com Git

Crie branches de funcionalidade a partir da `develop` atualizada. Abra cada Pull Request com a branch da funcionalidade como origem e **develop como destino**. Revise as alterações antes do merge.

A sugestão de comparação do GitHub não significa que um novo Pull Request já foi criado. Confira sempre a branch de destino. A integração de `develop` para `main` fica para a entrega final.

## Planejamento e próximos passos

As atividades estão organizadas no [Trello do projeto AVA Educa](https://trello.com/b/SrUBtQl3/ava-educa-projeto-avaliativo-m%C3%B3dulo-1).

Para a entrega, concluir a revisão dos requisitos e os testes, acrescentar comentários explicativos aos trechos importantes e preparar a documentação consolidada e o roteiro do vídeo de sete minutos.

Possíveis evoluções futuras: persistência com backend e banco de dados, autenticação de servidor, listagem e pesquisa de alunos e ativação da gestão de cursos.
