const nome = document.querySelector("#nome");
const email = document.querySelector("#email");
const numero = document.querySelector("#numero");
const formulario = document.querySelector("#formulario");
const contatos = document.querySelector("#contatos");

const listaContatos = JSON.parse(localStorage.getItem("lista")) || [];
let contador = 1;
if (listaContatos.length > 0) {
    contador = listaContatos[listaContatos.length - 1].id + 1;
}

function create_card(objeto_contato) {
    const novo_elemento = document.createElement("div");

    const elemento_nome = document.createElement("h2");
    elemento_nome.textContent = `Nome: ${objeto_contato.nome}`;

    const elemento_email = document.createElement("p");
    elemento_email.textContent = `Email: ${objeto_contato.email}`;

    const elemento_numero = document.createElement("p");
    elemento_numero.textContent = `Número: ${objeto_contato.numero}`;

    const elemento_div_botoes = document.createElement("div");
    elemento_div_botoes.classList.add("div_botoes");

    const elemento_editar = document.createElement("img");
    elemento_editar.classList.add("icon");
    elemento_editar.src = "./edit.png";

    elemento_editar.addEventListener("click", () => {
        localStorage.setItem("contato_edit", JSON.stringify(objeto_contato));
        window.location.href = "./edit.html";
    });

    const elemento_excluir = document.createElement("img");
    elemento_excluir.classList.add("icon");
    elemento_excluir.src = "./delete.png";

    elemento_excluir.addEventListener("click", () => {
        let listaContatos = JSON.parse(localStorage.getItem("lista")) || [];
        listaContatos = listaContatos.filter(contato_da_vez => objeto_contato.id !== contato_da_vez.id);
        localStorage.setItem("lista", JSON.stringify(listaContatos));
        contatos.removeChild(novo_elemento);
    });

    elemento_div_botoes.append(elemento_editar, elemento_excluir);
    novo_elemento.append(elemento_nome, elemento_email, elemento_numero, elemento_div_botoes);
    novo_elemento.classList.add("box");

    contatos.appendChild(novo_elemento);
}

function cadastrar_contato(e) {
    e.preventDefault();
    const objeto = {
        id: contador,
        nome: nome.value,
        numero: numero.value,
        email: email.value
    };
    contador++;

    create_card(objeto);

    const listaContatos = JSON.parse(localStorage.getItem("lista")) || [];
    listaContatos.push(objeto);

    localStorage.setItem("lista", JSON.stringify(listaContatos));

    nome.value = "";
    numero.value = "";
    email.value = "";
    nome.focus();
}

formulario.addEventListener("submit", cadastrar_contato);

function carregar_pagina() {
    const listaContatos = JSON.parse(localStorage.getItem("lista")) || [];
    listaContatos.forEach((contato_da_vez) => {
        create_card(contato_da_vez);
    });
}
carregar_pagina();