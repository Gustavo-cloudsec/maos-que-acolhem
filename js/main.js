const conteudo = document.getElementById("conteudo");

function mostrarPagina(moverFoco = false) {
    const pagina = window.location.hash.slice(1) || "inicio";
    const paginas = ["inicio", "projetos", "cadastro"];
    const paginaValida = paginas.includes(pagina) ? pagina : "inicio";
    const modelo = document.getElementById(paginaValida);

    conteudo.replaceChildren(modelo.content.cloneNode(true));

    recuperarCadastro();

    document.querySelectorAll("nav details").forEach(function(menu) {
        menu.open = false;
    });

    if (moverFoco) {
        conteudo.focus();
    }
}

window.addEventListener("hashchange", function() {
    mostrarPagina(true);
});

conteudo.addEventListener("click", function(evento) {
    if (evento.target.closest(".abrir-modal")) {
        document.getElementById("modal-projeto").showModal();
    }
});

mostrarPagina();