# Mãos que Acolhem

Projeto acadêmico de front-end para uma ONG fictícia que arrecada alimentos para famílias da comunidade.

O site foi desenvolvido com HTML, CSS e JavaScript puro, sem frameworks.

## Como abrir

Site publicado:

https://gustavo-cloudsec.github.io/maos-que-acolhem/

Para abrir o código-fonte localmente, abra o arquivo `html/index.html` no navegador, mantendo a organização das pastas.

A versão atual permite navegar entre Início, Projetos e Cadastro sem recarregar a página inteira. O JavaScript troca o conteúdo usando os templates do HTML e os endereços `#inicio`, `#projetos` e `#cadastro`.

### Executar a versão de produção localmente

Com Node.js 24 e npm instalados, execute os comandos na pasta principal do projeto:

```bash
npm ci
npm run build
npx http-server dist -a 127.0.0.1 -p 8080 -c-1
```

Depois, abra:

http://127.0.0.1:8080/

Para encerrar o servidor, pressione Ctrl + C no terminal.

## Organização dos arquivos

| Arquivo | Finalidade |
| --- | --- |
| `html/index.html` | Página principal com os templates e a navegação atual. |
| `html/projetos.html` | Página separada de projetos, mantida da etapa anterior. |
| `html/cadastro.html` | Página separada de cadastro, mantida da etapa anterior. |
| `css/style.css` | Cores, layout, componentes, responsividade, foco visível e modo escuro. |
| `imagens/doacoes.jpg` | Imagem original, mantida como alternativa ao WebP. |
| `imagens/doacoes-320.webp` | Versão da imagem com 320 × 213 pixels. |
| `imagens/doacoes-600.webp` | Versão da imagem com 600 × 399 pixels. |
| `js/armazenamento.js` | Gravação e leitura do rascunho no navegador. |
| `js/formulario.js` | Validação, mensagens e recuperação do formulário. |
| `js/main.js` | Troca de conteúdo, controle dos menus e abertura do modal. |
| `build.cjs` | Geração da pasta dist com HTML, CSS e JavaScript minificados. |
| `package.json` | Dependências de desenvolvimento e comando de build. |
| `package-lock.json` | Registro das versões das dependências para instalação com npm ci. |
| `.github/workflows/deploy.yml` | Automação do build e da publicação no GitHub Pages. |
| `.gitignore` | Impede o versionamento das pastas node_modules e dist. |

A pasta `dist` é gerada pelo build. Ela contém o `index.html` na raiz e as pastas de CSS, JavaScript e imagens utilizadas na publicação.

As páginas separadas de projetos e cadastro permanecem no código-fonte como registro da etapa anterior. A versão publicada utiliza os templates de `html/index.html`.

## Funcionalidades

- Apresentação da ONG, do projeto e dos dados de contato.
- Menus para computador e celular.
- Janela de informações sobre o projeto.
- Cadastro simulado de voluntários.
- Validação de campos obrigatórios, e-mail e formatos numéricos.
- Gravação automática do rascunho no navegador.
- Modo escuro conforme a preferência do sistema ou navegador.
- Imagem com versões WebP selecionadas pelo navegador.
- Publicação automática após atualizações na main.

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

O armazenamento pertence à origem utilizada no navegador. Um rascunho salvo no servidor local não é transferido automaticamente para o site publicado.

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

## Build e minificação

O comando `npm run build` executa o arquivo `build.cjs`.

O processo utiliza:

- Terser para minificar o JavaScript.
- Clean CSS para minificar o CSS.
- HTML Minifier Terser para minificar o HTML.

O build ajusta os caminhos dos recursos para o `index.html` publicado na raiz da pasta dist e copia a pasta de imagens.

Os nomes globais das funções JavaScript são preservados para manter a comunicação entre os três scripts.

Na versão atual, o total dos arquivos HTML, CSS e JavaScript passou de 17.824 para 12.319 bytes, uma redução de 30,89%. Esse cálculo não inclui as imagens.

## Otimização da imagem

As versões WebP foram geradas com Sharp, usando qualidade 80 para equilibrar tamanho e qualidade visual.

| Imagem | Dimensões | Tamanho |
| --- | --- | --- |
| JPEG original | 600 × 399 | 63.461 bytes |
| WebP maior | 600 × 399 | 21.334 bytes |
| WebP menor | 320 × 213 | 9.868 bytes |

A versão WebP de 600 × 399 ficou 66,38% menor que o JPEG original.

O HTML utiliza picture, source, srcset e sizes para permitir que o navegador escolha a versão conforme o espaço disponível e a densidade de pixels da tela. O JPEG permanece como alternativa para navegadores sem suporte ao WebP.

Os atributos width e height reservam a proporção da imagem. O CSS mantém max-width: 100% e height: auto.

As imagens otimizadas estão versionadas no repositório. O build copia esses arquivos para dist, sem executar uma nova conversão.

### Comparação de carregamento local

Foram realizadas três medições antes e três depois da otimização, no painel Network do navegador, com Slow 4G, cache desativado e a mesma janela.

| Medida | Antes, com JPEG | Depois, com WebP |
| --- | --- | --- |
| Média do indicador Finish | 2,21 segundos | 1,97 segundos |
| Dados transferidos no carregamento | 77,6 kB | 35,7 kB |

A média do Finish diminuiu aproximadamente 10,7%, e os dados transferidos diminuíram aproximadamente 54%.

O indicador Finish corresponde ao término das requisições registradas no painel Network. Os resultados foram obtidos no servidor local com rede simulada e não garantem o mesmo tempo em todos os dispositivos ou conexões.

## Publicação

O site está hospedado no GitHub Pages:

https://gustavo-cloudsec.github.io/maos-que-acolhem/

Nas configurações do repositório, a origem de publicação foi definida como GitHub Actions.

O arquivo `.github/workflows/deploy.yml` executa automaticamente estas etapas quando a main recebe uma atualização:

1. Baixa o código do repositório.
2. Prepara o Node.js 24.
3. Instala as dependências com npm ci.
4. Executa npm run build.
5. Envia a pasta dist como artefato.
6. Publica o artefato no GitHub Pages.

A etapa deploy depende do sucesso da etapa build. O workflow também permite execução manual.

A primeira publicação foi acionada pelo merge do pull request #9, no commit d97fc82. As etapas build e deploy terminaram com sucesso.

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
| Build local | A pasta dist foi gerada com os arquivos minificados e os recursos necessários. |
| Servidor HTTP local | A versão de produção abriu e manteve a navegação, o modal e o formulário. |
| Imagem otimizada | O painel Network registrou o carregamento da versão WebP de 600 pixels. |
| Automação de publicação | As etapas build e deploy terminaram com sucesso no GitHub Actions. |
| Site publicado | Foram conferidos a imagem, o visual, a navegação, o modal, a validação e a recuperação do rascunho. |

## Limitações e verificações pendentes

- O pattern do CPF verifica o formato de 11 números, não os dígitos verificadores.
- O rascunho depende do armazenamento permitido pelo navegador.
- Os dados do cadastro ficam no navegador; não existe envio ao servidor.
- Ainda falta medir as combinações de contraste específicas do modo escuro.
- O teste com Narrador foi parcial; ainda falta ampliar a verificação para os demais conteúdos e componentes.
- A seleção da imagem de 320 pixels ainda precisa de uma verificação específica em diferentes telas e densidades de pixels.
- Os testes registrados foram manuais; não há uma suíte de testes automatizados.
- As melhorias realizadas não representam uma confirmação completa de conformidade com WCAG AA.

## Versionamento

Foi utilizado um fluxo de branches inspirado no GitFlow: a main mantém a versão publicada, a develop reúne as melhorias e as branches de trabalho separam as alterações.

A feature/acessibilidade foi utilizada para os ajustes de navegação e integrada à develop após os testes.

A feature/documentacao foi utilizada para criar este README. A documentação foi integrada à develop pelo pull request #2, relacionado à issue #1 e à milestone “Entrega da prática 4”. A issue foi encerrada.

A feature/rotulos-acessiveis foi utilizada para melhorar os rótulos do cadastro após o teste com Narrador. A alteração foi integrada à develop pelo pull request #3.

A feature/modo-escuro foi utilizada para adicionar o tema escuro. A alteração foi registrada no commit ce773cd e integrada à develop pelo pull request #4, vinculado à milestone “Entrega da prática 4”.

A documentação dos testes foi atualizada pelo pull request #5.

A feature/build-producao foi utilizada para criar o build e integrada à develop pelo pull request #6.

A feature/otimizacao-imagem foi utilizada para adicionar as versões WebP e integrada à develop pelo pull request #7.

A feature/deploy-producao foi utilizada para configurar o GitHub Actions e integrada à develop pelo pull request #8.

O pull request #9 integrou a develop à main e acionou a primeira publicação.

A branch docs/finalizar-readme foi criada para registrar os resultados do build, da otimização e da publicação.

Após os merges no GitHub, as branches locais foram sincronizadas com o repositório remoto. Foram utilizados comandos de atualização com --ff-only para evitar merges locais desnecessários.