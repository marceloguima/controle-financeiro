const cardReceitas = document.getElementById("total-entradas");
const cardSaidas = document.getElementById("total-despesas");
const cardSaldo = document.getElementById("saldo");

const valorInserido = document.getElementById("valor");

const formulario = document.querySelector("form");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    mostraResumo();
});

// ------------------------------------------------------------------
const btnVerTransacoes = document.querySelector(".dropdown-btn");
const menuDropdownBotoes = document.querySelector(".drop-menu-botoes");
const iconeAbreMenu = document.querySelector(".icone-seta");
const overlay = document.querySelector(".overlay-dropdown");

// --------------------------------------------------------------------

const btnFiltraData = document.getElementById("btn-filtra-por-data");
const btnFiltraCategoria = document.getElementById("btn-filtra-por-categoria");
const containerParaFiltrar = document.querySelector(".drop-menu-campo-filter");

const verTransacoes = () => {
    menuDropdownBotoes.classList.add("show");
    overlay.classList.add("active");
};

const fechaMenu = () => {
    menuDropdownBotoes.classList.remove("show");
    overlay.classList.remove("active");
};

// evento para filtrar por data
btnFiltraData.addEventListener("click", () => {
    filtraPorData();
});

function filtraPorData() {
    containerParaFiltrar.innerHTML = ` 
    <div id="container-campo-filter">
    <div class="campo-label">
    <label>Selecione a data da transação</label
    ><input type="date" />
    </div>
    <button class="botao-azul filter">Buscar</button> 
    </div>
    <button  onclick="fechaCampoFiltro()"
    class="btn-opcoes fechar">
    Fechar
    </button>
    `;
    fechaMenu();
    abreCampoFilter();
}

btnFiltraCategoria.addEventListener("click", () => {
    filtraPorCategoria();
});

const filtraPorCategoria = () => {
    containerParaFiltrar.innerHTML = ` <div id="container-campo-filter"> 
    <div class="campo-label">
    <label for="campo-filter">Categoria</label>
    <select name="" id="categoria">
    <option value="salario">Meu Salário</option>
    <option value="freelancer">Freelancer</option>
    <option value="renda-extra">Renda Extra</option>
    <option value="Moradia">Moradia</option>
    <option value="Mercado">Mercado</option>
    <option value="Saude">Saúde</option>
    <option value="Educacao">Educação</option>
    <option value="Transporte">Transporte</option>
    <option value="Lazer">Lazer</option>                                
    <option value="outros">Outros</option>
    </select>
    </div>
    <button class="botao-azul filter">Buscar</button>
    </div>
    <button  onclick="fechaCampoFiltro()"
    class="btn-opcoes fechar">
    Fechar
    </button>`;
    fechaMenu();
    abreCampoFilter();
};

const abreCampoFilter = () => {
    containerParaFiltrar.classList.add("show");
    overlay.classList.add("active");
    btnVerTransacoes.disabled = true;
};

const fechaCampoFiltro = () => {
    containerParaFiltrar.classList.remove("show");
    overlay.classList.remove("active");
    btnVerTransacoes.disabled = false;
};

const limpaCampo = () => {
    valorInserido.value = "";
};

let totalReceitas = 0;
let totaldespesas = 0;

const mostraResumo = () => {
    const valorDigitado = parseFloat(valorInserido.value.trim());
    const valorRadio = document.querySelector(
        'input[name="transacao"]:checked'
    );
    const tipoTransacaoEscolhida = valorRadio.value;

    if (isNaN(valorDigitado) || valorDigitado <= 0) {
        valorInserido.classList.add("valor-active");
        setTimeout(() => {
            valorInserido.classList.remove("valor-active");
        }, 1500);
        return;
    }

    if (tipoTransacaoEscolhida === "entrada") {
        totalReceitas += valorDigitado;
    } else {
        totaldespesas += valorDigitado;
    }
    atualizaResumo();
    criaTransacao();
    limpaCampo();
};

const atualizaResumo = () => {
    const saldoAtual = totalReceitas - totaldespesas;
    cardReceitas.textContent = `R$ ${totalReceitas.toFixed(2)}`;
    cardSaidas.textContent = `R$ ${totaldespesas.toFixed(2)}`;
    cardSaldo.textContent = `R$ ${saldoAtual.toFixed(2)}`;
};

const categoria = document.getElementById("categoria");
const formaDeTransacao = document.getElementById("forma-transacao");

const radioEntrada = document.getElementById("tipo-entrada");
const radioSaida = document.getElementById("tipo-saida");
const labelFormaDeTransacao = document.getElementById("label-forma-transacao");

radioEntrada.addEventListener("change", () => trocaOpcoesSelect("entrada"));
radioSaida.addEventListener("change", () => trocaOpcoesSelect("saida"));

function trocaOpcoesSelect(tipo) {
    categoria.innerHTML = "";

    if (tipo === "entrada") {
        categoria.innerHTML = ` <option value="Salário">Meu Salário</option>
                                <option value="Freelancer">Freelancer</option>
                                <option value="Renda-Extra">Renda Extra</option>
                                <option value="Outros">Outros</option>`;

        formaDeTransacao.innerHTML = ` <option value="Pix">Pix</option>
                                <option value="Dinheiro">Dinheiro</option>
                                <option value="Outros">Outros</option>`;

        labelFormaDeTransacao.textContent = "Forma de Recebimento";
    } else {
        categoria.innerHTML = `
                                    <option value="Moradia">Moradia</option>
                                    <option value="Mercado">Mercado</option>
                                    <option value="Saude">Saúde</option>
                                    <option value="Educacao">Educação</option>
                                    <option value="Transporte">Transporte</option>
                                    <option value="Lazer">Lazer</option>
                                    <option value="Outros">Outros</option>
                               `;

        formaDeTransacao.innerHTML = ` <option value="Pix">Pix</option>
                                <option value="Dinheiro">Dinheiro</option>
                                <option value="Debito">Débito</option>
                                <option value="Credito">Crédito</option>
                                  <option value="Boleto">Boleto</option>
                              
                                `;
        labelFormaDeTransacao.textContent = "Forma de Pagamento";
    }
}


const formaDaTransacao = document.getElementById("forma-transacao");
const data = document.getElementById("data");
const transacao = document.querySelector(".container-transacao");

const criaTransacao = () => {
    const valorDigitado = parseFloat(valorInserido.value.trim());
    const formaSelecionda = formaDaTransacao.value;
    const diaDaTransacao = data.value;
    const categoriaDaTransacao = categoria.value;
    const valorRadio = document.querySelector(
        'input[name="transacao"]:checked'
    ).value;


    // condição para o ícone, se for entrada, arrow up (seta pra cima)
    //  se for saída, arrow down (seta pra baixo) 
    let icon = "";

    if (valorRadio === "entrada") {
        icon = `<svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        class="bi bi-arrow-up-circle-fill arrow-up"
        viewBox="0 0 16 16"
        >
        <path
        d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"
        />
        </svg>`;
    } else {
        icon = ` <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        class="bi bi-arrow-down-circle-fill arrow-down"
        viewBox="0 0 16 16"
        >
        <path
        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z"
        />
        </svg>`;
    }

    // criando a transação de fato
    transacao.innerHTML += ` <div class="transacao" data-valor=${valorDigitado} data-tipo${valorRadio}>
    <div class="div-icon-categoria">
    ${icon}
    <h4>${categoriaDaTransacao}</h4>
    </div>
    <p class="forma-transacao">${formaSelecionda}</p>
    <p class="data-transacao">${diaDaTransacao}</p>
    <p class="valor-transacao"> R$ ${valorDigitado}</p>
    <button class="btn-excluir-transacao"><i class="fa-solid fa-trash"></i> Excluir</button>
    </div>
    
    `;
};

// apagar transação--------------------
document.addEventListener("click", (e) => {
    const elementoClicado = e.target;
    const elementoParaApagar = elementoClicado.closest("div");

    const valor = parseFloat(elementoParaApagar.dataset.valor)
    const tipo = elementoParaApagar.dataset.tipo

    //   if (tipo === "entrada") {
    //         totalReceitas -= valor;
    //     } else {
    //         totaldespesas -= valor;
    //     }

        

    if (elementoClicado.classList.contains("btn-excluir-transacao")) {
        elementoParaApagar.remove();
    }
   
});

const mensagemSemTransacao = document.querySelector(".mensagem-campo-transacao");



