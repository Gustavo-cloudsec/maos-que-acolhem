const fs = require("node:fs");
const path = require("node:path");
const CleanCSS = require("clean-css");
const { minify: minificarJS } = require("terser");
const { minify: minificarHTML } = require("html-minifier-terser");

const raiz = __dirname;
const destino = path.join(raiz, "dist");
const resultados = [];

function lerArquivo(arquivo) {
    return fs.readFileSync(path.join(raiz, arquivo), "utf8");
}

function gravarArquivo(origem, saida, original, otimizado) {
    const caminho = path.join(destino, saida);

    fs.mkdirSync(path.dirname(caminho), { recursive: true });
    fs.writeFileSync(caminho, otimizado, "utf8");

    const antes = Buffer.byteLength(original, "utf8");
    const depois = Buffer.byteLength(otimizado, "utf8");

    resultados.push({
        arquivo: origem,
        antes,
        depois,
        reducao: ((1 - depois / antes) * 100).toFixed(2) + "%"
    });
}

async function gerarBuild() {
    // A pasta dist contém somente arquivos gerados pelo build.
    fs.rmSync(destino, { recursive: true, force: true });
    fs.mkdirSync(destino, { recursive: true });

    const cssOriginal = lerArquivo("css/style.css");
    const css = new CleanCSS({ level: 1 }).minify(cssOriginal);

    if (css.errors.length > 0) {
        throw new Error(css.errors.join("\n"));
    }

    css.warnings.forEach(function(aviso) {
        console.warn("Aviso CSS:", aviso);
    });

    gravarArquivo(
        "css/style.css",
        "css/style.css",
        cssOriginal,
        css.styles
    );

    const scripts = [
        "js/armazenamento.js",
        "js/formulario.js",
        "js/main.js"
    ];

    for (const arquivo of scripts) {
        const original = lerArquivo(arquivo);

        // Mantém os nomes usados entre os três scripts.
        const resultado = await minificarJS(original, {
            compress: true,
            mangle: false,
            toplevel: false
        });

        gravarArquivo(arquivo, arquivo, original, resultado.code);
    }

    const htmlOriginal = lerArquivo("html/index.html");

    // Na versão publicada, index.html fica na raiz de dist.
    const htmlComCaminhos = htmlOriginal
        .replaceAll("../css/", "./css/")
        .replaceAll("../js/", "./js/")
        .replaceAll("../imagens/", "./imagens/");

    const html = await minificarHTML(htmlComCaminhos, {
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeComments: true,
        removeOptionalTags: false
    });

    gravarArquivo(
        "html/index.html",
        "index.html",
        htmlOriginal,
        html
    );

    fs.cpSync(
        path.join(raiz, "imagens"),
        path.join(destino, "imagens"),
        { recursive: true }
    );

    console.table(resultados);

    const antes = resultados.reduce((total, item) => total + item.antes, 0);
    const depois = resultados.reduce((total, item) => total + item.depois, 0);
    const reducao = ((1 - depois / antes) * 100).toFixed(2);

    console.log(`Total HTML, CSS e JS: ${antes} → ${depois} bytes`);
    console.log(`Redução total: ${reducao}%`);
    console.log("Build gerado na pasta dist. Imagens copiadas sem compressão.");
}

gerarBuild().catch(function(erro) {
    console.error("Falha no build:", erro.message);
    process.exitCode = 1;
});