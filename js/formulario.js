const areaFormulario = document.getElementById("conteudo");

function salvarCadastro(formulario) {
    const dados = {};

    formulario.querySelectorAll("input").forEach(function(campo) {
        dados[campo.name] = campo.value;
    });

    return salvarDadosCadastro(dados);
}

function recuperarCadastro() {
    const formulario = document.getElementById("form-cadastro");

    if (!formulario) return;

    try {
        const dados = lerDadosCadastro();

        if (!dados) return;

        formulario.querySelectorAll("input").forEach(function(campo) {
            if (typeof dados[campo.name] === "string") {
                campo.value = dados[campo.name];
            }
        });

        document.getElementById("mensagem-cadastro").textContent =
            "Rascunho recuperado deste navegador.";
    } catch (erro) {
        document.getElementById("mensagem-cadastro").textContent =
            "Não foi possível recuperar o rascunho.";
    }
}

function validarCampo(campo) {
    campo.setCustomValidity("");

    if (campo.required && campo.value.trim() === "") {
        campo.setCustomValidity("Preencha este campo.");
    }

    const valido = campo.validity.valid;

    campo.classList.toggle("campo-erro", !valido);
    campo.setAttribute("aria-invalid", String(!valido));

    return valido;
}

areaFormulario.addEventListener("input", function(evento) {
    const campo = evento.target;

    if (campo.matches("#form-cadastro input")) {
        const valido = validarCampo(campo);
        const salvo = salvarCadastro(campo.form);
        const mensagem = document.getElementById("mensagem-cadastro");

        mensagem.textContent = valido
            ? "Dados em edição."
            : campo.validationMessage;

        if (!salvo) {
            mensagem.textContent +=
                " Não foi possível guardar o rascunho.";
        }
    }
});

areaFormulario.addEventListener("submit", function(evento) {
    if (evento.target.id !== "form-cadastro") return;

    evento.preventDefault();

    const formulario = evento.target;
    const mensagem = document.getElementById("mensagem-cadastro");

    formulario.querySelectorAll("input").forEach(function(campo) {
        validarCampo(campo);
    });

    const primeiroErro = formulario.querySelector("input:invalid");

    if (primeiroErro) {
        const etiqueta = formulario.querySelector(
            'label[for="' + primeiroErro.id + '"]'
        );

        mensagem.textContent =
            etiqueta.textContent + " " + primeiroErro.validationMessage;

        primeiroErro.focus();
        return;
    }

    if (salvarCadastro(formulario)) {
        mensagem.textContent =
            "Dados conferidos e guardados neste navegador. Sem envio ao servidor.";
    } else {
        mensagem.textContent =
            "Dados conferidos, mas não foi possível guardá-los neste navegador.";
    }
});