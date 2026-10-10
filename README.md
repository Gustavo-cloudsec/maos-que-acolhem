# Mãos que Acolhem

Projeto acadêmico de front-end para uma ONG fictícia que arrecada alimentos para famílias da comunidade.

O site foi desenvolvido com HTML, CSS e JavaScript puro, sem frameworks.

## Como abrir

Abra o arquivo `html/index.html` no navegador, mantendo a organização das pastas.

A versão atual permite navegar entre Início, Projetos e Cadastro sem recarregar a página inteira. O JavaScript troca o conteúdo usando os templates do HTML e os endereços `#inicio`, `#projetos` e `#cadastro`.

## Organização dos arquivos

| Arquivo | Finalidade |
| --- | --- |
| `html/index.html` | Página principal com os templates e a navegação atual. |
| `html/projetos.html` | Página separada de projetos, mantida da etapa anterior. |
| `html/cadastro.html` | Página separada de cadastro, mantida da etapa anterior. |
| `css/style.css` | Cores, layout, componentes, responsividade, foco visível e modo escuro. |
| `imagens/doacoes.jpg` | Imagem utilizada na apresentação da ONG. |
| `js/armazenamento.js` | Gravação e leitura do rascunho no navegador. |
| `js/formulario.js` | Validação, mensagens e recuperação do formulário. |
| `js/main.js` | Troca de conteúdo, controle dos menus e abertura do modal. |

## Funcionalidades

- Apresentação da ONG, do projeto e dos dados de contato.
- Menus para computador e celular.
- Janela de informações sobre o projeto.
- Cadastro simulado de voluntários.
- Validação de campos obrigatórios, e-mail e formatos numéricos.
- Gravação automática do rascunho no navegador.
- Modo escuro conforme a preferência do sistema ou navegador.

## Funções JavaScript

| Função | Entrada | Resultado |
| --- | --- | --- |
| `salvarDadosCadastro(dados)` | Objeto com os dados. | Converte para JSON e grava no localStorage. Retorna true ou false conforme o sucesso da gravação. |
| `lerDadosCadastro()` | Sem parâmetros. | Lê e converte o JSON. Retorna um objeto ou null quando não há dados ou o conteúdo convertido não é um objeto válido. Erros de leitura ou conversão são tratados por recuperarCadastro. |
| `salvarCadastro(formulario)` | Elemento do formulário. | Reúne os valores dos inputs pelo atributo name e retorna o resultado de salvarDadosCadastro. |
| `recuperarCadastro()` | Sem parâmetros. | Preenche o formulário com o rascunho. Trata erros de leitura e conversão e mostra uma mensagem. Não retorna um valor explícito. |
| `validarCampo(campo)` | Input a verificar. | Verifica a validade, atualiza a classe campo-erro e o atributo aria-invalid. Retorna true ou false. |
| `mostrarPagina(moverFoco = false)` | Indicação de mover o foco. | Exibe o template, recupera o cadastro e fecha os menus. Quando solicitado, move o foco para o conteúdo. Não retorna um valor explícito. |

## Como os arquivos se comunicam

Os scripts são carregados com defer, nesta ordem: armazenamento.js, formulario.js e main.js.

As funções estão disponíveis no escopo global dos scripts. Não foram usados import e export.

Durante a digitação, formulario.js chama validarCampo e salvarCadastro. A função salvarCadastro reúne os valores e chama salvarDadosCadastro, definida em armazenamento.js.

Ao trocar de página, main.js chama mostrarPagina. Depois de inserir o template, essa função chama recuperarCadastro, definida em formulario.js. Ela usa lerDadosCadastro para recuperar o rascunho.

Os eventos input e submit são tratados no elemento conteudo. Assim, continuam funcionando quando o formulário é recriado pela navegação.

## Validação e armazenamento

O formulário usa required, type e pattern. O atributo novalidate permite que o JavaScript controle as mensagens de envio, mas a validade dos campos continua sendo consultada pelo código.

O envio é interrompido quando existe um campo inválido, e o foco vai para o primeiro erro.

O rascunho usa a chave `maosQueAcolhemCadastro` no localStorage. Durante a edição, também são salvos valores incompletos para permitir continuar depois.

O cadastro é uma simulação: não envia dados ao servidor. Para testar, devem ser usados dados fictícios.

## Acessibilidade

- HTML semântico e hierarquia de títulos.
- Imagem com descrição no atributo alt.
- Labels associados aos inputs.
- Fieldsets com legendas para agrupar os campos.
- Mensagens de formulário com role="status".
- Indicação de campos inválidos com aria-invalid.
- Foco visível na navegação pelo teclado.
- Foco no conteúdo após trocar de página.
- Botão do modal com aria-haspopup e aria-controls.
- Modal identificado pelo título usando aria-labelledby.
- Respeito à preferência por movimento reduzido.
- Ajuste dos rótulos de CPF, telefone e CEP após o teste com leitor de tela.

### Modo escuro

O CSS utiliza a regra `prefers-color-scheme: dark` para aplicar o tema escuro conforme a preferência do sistema ou navegador.

Foram ajustadas as cores do fundo, dos textos, dos links, dos campos, das mensagens de erro e dos indicadores de foco. A propriedade color-scheme também informa o tema aos controles nativos do navegador.

O modo claro foi mantido. Os dois temas foram conferidos pela simulação da preferência de cores no painel Rendering das ferramentas do navegador.

### Contraste medido no modo claro

As seguintes combinações foram verificadas no WebAIM Contrast Checker:

| Elemento | Texto | Fundo | Razão de contraste |
| --- | --- | --- | --- |
| Título no cabeçalho | #FFFFFF | #164267 | 10,45:1 |
| Texto “Participar” no menu | #164267 | #DCEEF8 | 8,77:1 |
| Etiqueta “Projeto em andamento” | #FFFFFF | #24704D | 6:1 |

As três combinações atendem ao mínimo de 4,5:1 para texto normal no critério de contraste WCAG AA.

Essas medições se referem aos elementos listados e não representam uma avaliação completa da acessibilidade do site.

## Testes realizados nesta etapa

Os testes foram realizados manualmente.

| Teste | Resultado observado |
| --- | --- |
| Navegação entre Início, Projetos e Cadastro | O conteúdo foi trocado sem recarregar a página inteira. |
| Menu pelo teclado | Os links puderam ser acessados com Tab e Enter. |
| Foco após a navegação | O foco foi direcionado para o conteúdo principal. |
| Modal do projeto | Abriu pelo botão e fechou pelo botão Fechar e pela tecla Esc. |
| Retorno do foco após fechar o modal | O foco retornou ao botão Saiba mais. |
| Formulário pelo teclado | Foi possível percorrer os campos com Tab e Shift + Tab. |
| Envio com campo obrigatório vazio | O envio foi interrompido, a mensagem foi exibida e o primeiro campo inválido recebeu foco. |
| Recuperação do rascunho | Os valores salvos foram recuperados ao voltar ao cadastro. |
| Leitor de tela Narrador | Foi conferida a leitura dos rótulos e do aviso de campo obrigatório no cadastro. |
| Ajuste dos rótulos numéricos | Os rótulos foram reformulados após o Narrador interpretar a pontuação anterior como “cara triste”. |
| Reorganização do CSS | A aparência e o funcionamento foram mantidos. |
| Modo escuro | Foi exibido nas áreas Início, Projetos e Cadastro. |
| Funções no modo escuro | O modal e o aviso de campo obrigatório continuaram funcionando. |
| Retorno ao modo claro | As cores anteriores voltaram após alterar a preferência simulada. |

## Limitações e verificações pendentes

- O pattern do CPF verifica o formato de 11 números, não os dígitos verificadores.
- O rascunho depende do armazenamento permitido pelo navegador.
- A abertura direta por file:// ainda precisa ser comparada com a execução por um servidor HTTP local.
- Ainda falta medir as combinações de contraste específicas do modo escuro.
- O teste com Narrador foi parcial; ainda falta ampliar a verificação para os demais conteúdos e componentes.
- Ainda falta concluir a preparação e a publicação da versão de produção.
- As melhorias realizadas não representam uma confirmação completa de conformidade com WCAG AA.

## Versionamento

A main mantém a versão de referência. A develop reúne as melhorias.

A feature/acessibilidade foi utilizada para os ajustes de navegação e integrada à develop após os testes.

A feature/documentacao foi utilizada para criar este README. A documentação foi integrada à develop pelo pull request #2, relacionado à issue #1 e à milestone “Entrega da prática 4”. A issue foi encerrada.

A feature/rotulos-acessiveis foi utilizada para melhorar os rótulos do cadastro após o teste com Narrador. A alteração foi integrada à develop pelo pull request #3.

A feature/modo-escuro foi utilizada para adicionar o tema escuro. A alteração foi registrada no commit ce773cd e integrada à develop pelo pull request #4, vinculado à milestone “Entrega da prática 4”.

Após os merges feitos pelo GitHub, a branch develop local foi atualizada com git pull --ff-only origin develop.