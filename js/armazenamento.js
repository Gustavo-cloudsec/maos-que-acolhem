const chaveCadastro = "maosQueAcolhemCadastro";

function salvarDadosCadastro(dados) {
    try {
        localStorage.setItem(chaveCadastro, JSON.stringify(dados));
        return true;
    } catch (erro) {
        return false;
    }
}

function lerDadosCadastro() {
    const textoSalvo = localStorage.getItem(chaveCadastro);

    if (!textoSalvo) {
        return null;
    }

    const dados = JSON.parse(textoSalvo);

    if (!dados || typeof dados !== "object" || Array.isArray(dados)) {
        return null;
    }

    return dados;
}