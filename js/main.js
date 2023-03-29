// captura o formulario
const form = document.getElementById("formulario");
// captura a lista
const lista = document.getElementById("lista-itens");
// cria o array vazio
const items = JSON.parse(localStorage.getItem("items")) || [];
// captura nome
const nome = document.getElementById("nomeItem");

// cria os elementos pelo localStorage
items.forEach((elemento) => {
    criaItem(elemento);
});


// onde monto o evento ao clicar
form.addEventListener("submit", (evento) => {
    // previne comportamento de resetar padrão dos formulários
    evento.preventDefault();
    // captura o nome do formulário
    const nome = evento.target.elements["nomeItem"];
    // captura a quantidade do formulário
    const quantidade = evento.target.elements["quantidadeItem"];
    // captura o tipo
    const tipo = evento.target.elements["item-tipo"];

    // crio o objeto do item
    const item = {
        "nome": nome.value,
        "quantidade": quantidade.value,
        "tipo": tipo.value
    }
    // verifica se existe
    const existe = items.find(elemento => elemento.nome == item.nome)
    if (existe) {
        item.id = existe.id;

        alteraQuantidade(item)

        items[items.findIndex(elemento => elemento.id === existe.id)] = item;
        
    } else {
        item.id = items[items.length -1] ? (items[items.length-1]).id +1 : 0;

        criaItem(item);
        items.push(item);
    }
    // coloca o item no local storage
    localStorage.setItem("items", JSON.stringify(items))
    // reseta o formulário
    nome.value = "";
    quantidade.value = "";
})

// função que cria o item
function criaItem(item) {

    // cria onde o item fica
    const novoItem = document.createElement("li");
    novoItem.classList.add("lista-item");
    // cria local do nome do item
    const nomeItem = document.createElement("span");
    nomeItem.classList.add("item-texto");
    nomeItem.innerHTML = item.nome;
    // cria local da quantidade do item
    const quantidadeItem = document.createElement("strong");
    quantidadeItem.dataset.id = item.id;
    quantidadeItem.classList.add("lista-quantidade");
    quantidadeItem.innerHTML = item.quantidade;
    // cria o tipo do item
    const tipoItem = document.createElement("span");
    tipoItem.classList.add("tipo-lista")
    tipoItem.innerHTML = item.tipo;



    // adiciona os dados do item
    novoItem.appendChild(nomeItem);
    novoItem.appendChild(quantidadeItem);
    novoItem.appendChild(tipoItem);
    novoItem.appendChild(criaBotao(item.id));
    lista.appendChild(novoItem);

}
// função para alterar a quantidade caso o item já exista
function alteraQuantidade(item) {
    document.querySelector("[data-id='" + item.id + "'").innerHTML = item.quantidade;
}
// função que cria o botão de deletar
function criaBotao(id) {
    const botaoDeleta = document.createElement("button");
    botaoDeleta.classList.add("botaoDeleta");
    botaoDeleta.innerHTML = "X";
    // chama a função que deleta
    botaoDeleta.addEventListener("click", function () {
        deletaElemento(this.parentNode, id);
    })

    return botaoDeleta;
}
// função que deleta o item
function deletaElemento(tag, id) {
    tag.remove();

    items.splice(items.findIndex(elemento => elemento.id === id), 1);

    localStorage.setItem("items", JSON.stringify(items))

}
// funçãoi que cria o tipo
function criaTipo () {

    const tipo = document.createElement("")
}
// botão que limpa a lista e o localstorage
const botaoLimpaLista = document.getElementById("apagaLista");
botaoLimpaLista.addEventListener("click", apagaLista)
// função que apaga a lista
function apagaLista() {
    localStorage.clear();
    location.reload();

}

