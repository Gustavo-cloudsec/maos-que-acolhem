\# Mãos que Acolhem



Projeto acadêmico de front-end para uma ONG fictícia que arrecada alimentos para famílias da comunidade.



O site foi desenvolvido com HTML, CSS e JavaScript puro, sem frameworks.



\## Como abrir



Abra o arquivo `html/index.html` no navegador, mantendo a organização das pastas.



A versão atual permite navegar entre Início, Projetos e Cadastro sem recarregar a página inteira. O JavaScript troca o conteúdo usando os templates do HTML e os endereços `#inicio`, `#projetos` e `#cadastro`.



\## Organização dos arquivos



| Arquivo | Finalidade |

| --- | --- |

| `html/index.html` | Página principal com os templates e a navegação atual. |

| `html/projetos.html` | Página separada de projetos, mantida da etapa anterior. |

| `html/cadastro.html` | Página separada de cadastro, mantida da etapa anterior. |

| `css/style.css` | Cores, layout, componentes, responsividade e foco visível. |

| `imagens/doacoes.jpg` | Imagem utilizada na apresentação da ONG. |

| `js/armazenamento.js` | Gravação e leitura do rascunho no navegador. |

| `js/formulario.js` | Validação, mensagens e recuperação do formulário. |

| `js/main.js` | Troca de conteúdo, controle dos menus e abertura do modal. |



\## Funcionalidades



\- Apresentação da ONG, do projeto e dos dados de contato.

\- Menus para computador e celular.

\- Janela de informações sobre o projeto.

\- Cadastro simulado de voluntários.

\- Validação de campos obrigatórios, e-mail e formatos numéricos.

\- Gravação automática do rascunho no navegador.



\## Funções JavaScript



| Função | Entrada | Resultado |

| --- | --- | --- |

| `salvarDadosCadastro(dados)` | Objeto com os dados. | Converte para JSON e grava no localStorage. Retorna true ou false conforme o sucesso da gravação. |

| `lerDadosCadastro()` | Sem parâmetros. | Lê e converte o JSON. Retorna um objeto ou null quando não há dados ou o conteúdo convertido não é um objeto válido. |

| `salvarCadastro(formulario)` | Elemento do formulário. | Reúne os valores dos inputs pelo atributo name e retorna o resultado de salvarDadosCadastro. |

| `recuperarCadastro()` | Sem parâmetros. | Preenche o formulário com o rascunho. Trata erros de leitura e conversão e mostra uma mensagem. Não retorna um valor explícito. |

| `validarCampo(campo)` | Input a verificar. | Verifica a validade, atualiza a classe campo-erro e o atributo aria-invalid. Retorna true ou false. |

| `mostrarPagina(moverFoco = false)` | Indicação de mover o foco. | Exibe o template, recupera o cadastro e fecha os menus. Quando solicitado, move o foco para o conteúdo. Não retorna um valor explícito. |



\## Como os arquivos se comunicam



Os scripts são carregados com defer, nesta ordem: armazenamento.js, formulario.js e main.js.



As funções estão disponíveis no escopo global dos scripts. Não foram usados import e export.



Durante a digitação, formulario.js chama validarCampo e salvarCadastro. A função salvarCadastro reúne os valores e chama salvarDadosCadastro, definida em armazenamento.js.



Ao trocar de página, main.js chama mostrarPagina. Depois de inserir o template, essa função chama recuperarCadastro, definida em formulario.js. Ela usa lerDadosCadastro para recuperar o rascunho.



Os eventos input e submit são tratados no elemento conteudo. Assim, continuam funcionando quando o formulário é recriado pela navegação.



\## Validação e armazenamento



O formulário usa required, type e pattern. O atributo novalidate permite que o JavaScript controle as mensagens de envio, mas a validade dos campos continua sendo consultada pelo código.



O envio é interrompido quando existe um campo inválido, e o foco vai para o primeiro erro.



O rascunho usa a chave `maosQueAcolhemCadastro` no localStorage. Durante a edição, também são salvos valores incompletos para permitir continuar depois.



O cadastro é uma simulação: não envia dados ao servidor. Para testar, devem ser usados dados fictícios.



\## Acessibilidade



\- HTML semântico e hierarquia de títulos.

\- Imagem com descrição no atributo alt.

\- Labels associados aos inputs.

\- Fieldsets com legendas para agrupar os campos.

\- Mensagens de formulário com role="status".

\- Indicação de campos inválidos com aria-invalid.

\- Foco visível na navegação pelo teclado.

\- Foco no conteúdo após trocar de página.

\- Respeito à preferência por movimento reduzido.



\## Testes realizados nesta etapa



Foram conferidos manualmente:



\- Navegação entre Início, Projetos e Cadastro.

\- Abertura e fechamento do modal, incluindo a tecla Esc.

\- Recuperação do rascunho ao voltar ao cadastro.

\- Navegação com Tab, Shift + Tab e Enter.

\- Manutenção da aparência após reorganizar o CSS.



\## Limitações e verificações pendentes



\- O pattern do CPF verifica o formato de 11 números, não os dígitos verificadores.

\- O rascunho depende do armazenamento permitido pelo navegador.

\- A abertura direta por file:// ainda precisa ser comparada com a execução por um servidor HTTP local.

\- Ainda falta concluir as verificações de contraste e leitor de tela.

\- As melhorias realizadas não representam uma confirmação completa de conformidade com WCAG AA.



\## Versionamento



A main mantém a versão de referência. A develop reúne as melhorias.



A feature/acessibilidade foi utilizada para os ajustes de navegação e integrada à develop após os testes.



A feature/documentacao foi criada para este README, relacionado à issue #1 e à milestone "Entrega da prática 4". A integração da documentação será feita por pull request.

