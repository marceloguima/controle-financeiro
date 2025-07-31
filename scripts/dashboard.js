// Referências aos elementos de resumo financeiro (cards)
const cardReceitas = document.getElementById("total-entradas");
const cardSaidas = document.getElementById("total-despesas");
const cardSaldo = document.getElementById("saldo");

let listaDeTransacoes = [];

// Input de valor da transação
const valorInserido = document.getElementById("valor");

// Referência ao formulário de cadastro
const formulario = document.querySelector("form");

// Evento de envio do formulário
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault(); // evita recarregamento da página
    mostraResumo(); // processa os dados da transação
});

// Dropdown e overlay
const btnVerTransacoes = document.querySelector(".dropdown-btn");
const menuDropdownBotoes = document.querySelector(".drop-menu-botoes");
const iconeAbreMenu = document.querySelector(".icone-seta");
const overlay = document.querySelector(".overlay-dropdown");

// Botões de filtro
const btnFiltraData = document.getElementById("btn-filtra-por-data");
const btnFiltraCategoria = document.getElementById("btn-filtra-por-categoria");
const containerParaFiltrar = document.querySelector(".drop-menu-campo-filter");

// Abre menu dropdown
const abreDropOpcoes = () => {
    menuDropdownBotoes.classList.add("show");
    overlay.classList.add("active");
};

// Fecha menu dropdown
const fechaMenu = () => {
    menuDropdownBotoes.classList.remove("show");
    overlay.classList.remove("active");
};

function filtraPorData() {
    containerParaFiltrar.innerHTML = `
    <div id="container-campo-filter">
        <div class="campo-label">
            <label id="label-personalizada">Selecione a data da transação</label>
            <input type="date" id="dataAFiltrar"/>
        </div>
        <button class="botao-azul filter"  onclick="mostraTransacoesFiltradas()";">Buscar</button> 
    </div>
    <button onclick="fechaCampoFiltro()" class="btn-opcoes fechar">Fechar</button>`;
    fechaMenu();
    abreCampoFilter();
}

// Filtro por data escutando o botão
btnFiltraData.addEventListener("click", () => {
    filtraPorData();
});

// Filtro por categoria escutando o botão
btnFiltraCategoria.addEventListener("click", () => {
    filtraPorCategoria();
});

const filtraPorCategoria = () => {
    containerParaFiltrar.innerHTML = `
    <div id="container-campo-filter"> 
        <div class="campo-label">
            <label for="categoria">Categoria</label>
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
    <button onclick="fechaCampoFiltro()" class="btn-opcoes fechar">Fechar</button>`;
    // fechaMenu();
    abreCampoFilter();
};

// Abre área de filtro
const abreCampoFilter = () => {
    containerParaFiltrar.classList.add("show");
    overlay.classList.add("active");
    btnVerTransacoes.disabled = true;
};

// Fecha área de filtro
const fechaCampoFiltro = () => {
    containerParaFiltrar.classList.remove("show");
};

const transacoesFiltradas = document.querySelector(".filtradas");
// aplica um overlay, aplica uma classe para mostrar
//  o campo, desativa o botão de ver transações e chama a função para fechar o campo de filtro
const mostraTransacoesFiltradas = ()=>{
    const dataParaFiltrar = document.getElementById("dataAFiltrar");
    const dataSelecionada = dataParaFiltrar.value;

    // aqui acesso a label para aplicar cor vermelha caso o usuário não coloque a data
const labelPersonalizada = document.getElementById("label-personalizada")
    if (!dataSelecionada) {
        labelPersonalizada.style.color = "red"
        labelPersonalizada.style.fontSize = "1rem"
        labelPersonalizada.style.fontWeight = "500"
        setTimeout(()=>{
             labelPersonalizada.style.color = ""
        labelPersonalizada.style.fontSize = ""
        labelPersonalizada.style.fontWeight = ""
        },1500 )
        return;
    }

    // filtrar
    const resultados = listaDeTransacoes.filter(
        (transacao) => transacao.data === dataSelecionada
    );

    overlay.classList.add("active");
    transacoesFiltradas.classList.add("active");
    btnVerTransacoes.disabled = true;

    console.log(resultados);
    fechaCampoFiltro();
    exibeResuldadosFiltrados(resultados)
}

const exibeResuldadosFiltrados = (listaDeResultados) => {
    const modalFiltradas = document.querySelector(".lista");
    const msgSemTransacao = document.querySelector(".msg-sem-transacao");
    // limpar para caso haja algo
    modalFiltradas.innerHTML = "";

    // se não tiver tiver transação pra data buscada em 4 segundos o modal fecha
    if (listaDeResultados.length === 0) {
        msgSemTransacao.textContent = "Nenhuma transação encontrada";
        setTimeout(()=>{
            FecharTransacoesFiltradas()
        },4000)
    } else {
        
        listaDeResultados.forEach((transacao) => {
            const itemLi = ` <li class="transacao-filtrada">
            <div class="div-icon-categoria filtrada">
            <i class="fa-solid ${
                transacao.tipo === "entrada"
                ? "fa-circle-up arrow-up"
                : "fa-circle-down arrow-down"
            }"></i>
            <h4>${transacao.categoria}</h4>
            </div>
            <div class="forma-valor">
            <p class="tipo-transacao-filtrada">${
                transacao.forma
            }</p>
            <p class="valor-transacao-filtrada">${transacao.valor.toLocaleString(
                "pt-br",
                { style: "currency", currency: "BRL" }
            )}</p>
            </div>
            <div class="dia-transacao"> 
            <p>Dia</p>
            <p class="data-transacao-filtrada">${formatarDataParaExibicao(
                transacao.data
            )}</p>
            </div>
            </li>`;

            msgSemTransacao.textContent = `Suas transações do dia ${formatarDataParaExibicao(transacao.data)}`;

            modalFiltradas.innerHTML += itemLi;
        });
    }


};

// tira o overlay, remove a classe para sumir as transções e reativa o botão ver transações
const FecharTransacoesFiltradas = () => {
    transacoesFiltradas.classList.remove("active");
    overlay.classList.remove("active");
    btnVerTransacoes.disabled = false;
};

// Limpa campo de valor
const limpaCampo = () => {
    valorInserido.value = "";
};

// Totais acumulados
let totalReceitas = 0;
let totaldespesas = 0;

// Processa transação ao submeter
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

// Atualiza os cards de resumo
const atualizaResumo = () => {
    const saldoAtual = totalReceitas - totaldespesas;

    cardReceitas.textContent = totalReceitas.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
    });
    cardSaidas.textContent = totaldespesas.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
    });
    cardSaldo.textContent = saldoAtual.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
    });
};

// Referências de elementos do formulário
const categoria = document.getElementById("categoria");
const formaDeTransacao = document.getElementById("forma-transacao");
const radioEntrada = document.getElementById("tipo-entrada");
const radioSaida = document.getElementById("tipo-saida");
const labelFormaDeTransacao = document.getElementById("label-forma-transacao");

// Troca opções de acordo com o tipo (entrada/saída)
radioEntrada.addEventListener("change", () => trocaOpcoesSelect("entrada"));
radioSaida.addEventListener("change", () => trocaOpcoesSelect("saida"));

function trocaOpcoesSelect(tipo) {
    categoria.innerHTML = "";

    if (tipo === "entrada") {
        categoria.innerHTML = `
            <option value="Salário">Meu Salário</option>
            <option value="Freelancer">Freelancer</option>
            <option value="Renda-Extra">Renda Extra</option>
            <option value="Outros">Outros</option>`;

        formaDeTransacao.innerHTML = `
            <option value="Pix">Pix</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Outros">Outros</option>`;

        labelFormaDeTransacao.textContent = "Forma de Recebimento";
    } else {
        categoria.innerHTML = `
            <option value="Moradia">Moradia</option>
            <option value="Mercado">Mercado</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Saude">Saúde</option>
            <option value="Educacao">Educação</option>
            <option value="Transporte">Transporte</option>
            <option value="Lazer">Lazer</option>
            <option value="Outros">Outros</option>`;

        formaDeTransacao.innerHTML = `
            <option value="Pix">Pix</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Debito">Débito</option>
            <option value="Credito">Crédito</option>
            <option value="Boleto">Boleto</option>`;

        labelFormaDeTransacao.textContent = "Forma de Pagamento";
    }
}

// Configurações para a data padrão no input
const formaDaTransacao = document.getElementById("forma-transacao");
const containerTransacao = document.querySelector(".container-transacao");
const data = document.getElementById("data");

const definirDataAtualComoPadrao = () => {
    const hoje = new Date();
    hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset());
    const dataFormatadaParaInput = hoje.toISOString().split("T")[0];
    data.value = dataFormatadaParaInput;
};

definirDataAtualComoPadrao();

// Utilitário para formatar data (de ISO para BR)
const formatarDataParaExibicao = (dataISO) => {
    if (!dataISO) return "";
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
};

// Cria objeto de transação, adiciona na lista, salva e exibe
const criaTransacao = () => {
    const valorDigitado = parseFloat(valorInserido.value.trim());
    const formaSelecionda = formaDaTransacao.value;
    const diaDaTransacao = data.value;
    const categoriaDaTransacao = categoria.value;
    const valorRadio = document.querySelector(
        'input[name="transacao"]:checked'
    ).value;

    const novaTransacao = {
        valor: valorDigitado,
        forma: formaSelecionda,
        data: diaDaTransacao,
        categoria: categoriaDaTransacao,
        tipo: valorRadio,
    };

    listaDeTransacoes.push(novaTransacao);
    salvarTransacaoNoStorage();
    mensagemSemTransacao();
    renderizarTransacao(novaTransacao);
};

// Salva transações no localStorage
const salvarTransacaoNoStorage = () => {
    localStorage.setItem("transacoes", JSON.stringify(listaDeTransacoes));
};

// Carrega dados do localStorage ao abrir a página
const carregarTransacoesDoStorage = () => {
    const dados = localStorage.getItem("transacoes");

    if (dados) {
        listaDeTransacoes = JSON.parse(dados);
        listaDeTransacoes.forEach((transacao) => {
            renderizarTransacao(transacao);
            if (transacao.tipo === "entrada") {
                totalReceitas += transacao.valor;
            } else {
                totaldespesas += transacao.valor;
            }
        });

        mensagemSemTransacao();
        atualizaResumo();
    }
};

// Mostra mensagem se não houver transações
const mensagemSemTransacao = () => {
    const campoMensagem = document.querySelector(".mensagem-campo-transacao");
    campoMensagem.textContent =
        listaDeTransacoes.length === 0 ? "Nenhuma transação no momento" : "";
};

// Insere visualmente a transação no DOM
const renderizarTransacao = (transacao) => {
    const dataFormatada = formatarDataParaExibicao(transacao.data);

    const icon =
        transacao.tipo === "entrada"
            ? `<i class="fa-solid fa-circle-arrow-up arrow-up"></i>`
            : `<i class="fa-solid fa-circle-arrow-down arrow-down"></i>`;

    containerTransacao.innerHTML += `
    <div class="transacao" data-valor="${transacao.valor}" data-tipo="${
        transacao.tipo
    }">
        <div class="div-icon-categoria">
            ${icon}
            <h4>${transacao.categoria}</h4>
        </div>
        <p class="forma-transacao">${transacao.forma}</p>
        <p class="data-transacao">${dataFormatada}</p>
        <p class="valor-transacao">${transacao.valor.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
        })}</p>
        <button class="btn-excluir-transacao"><i class="fa-solid fa-trash"></i> Excluir</button>
        <button class="btn-excluir-transacao mobile"><i class="fa-solid fa-trash"></i></button>

    </div>`;
};

// Evento para excluir transação
document.addEventListener("click", (e) => {
    const elementoClicado = e.target.closest(".btn-excluir-transacao");

    if (elementoClicado) {
        const transacaoParaApagar = elementoClicado.closest(".transacao");

        const valor = parseFloat(transacaoParaApagar.dataset.valor);
        const tipo = transacaoParaApagar.dataset.tipo;

        listaDeTransacoes = listaDeTransacoes.filter(
            (t) => !(t.valor === valor && t.tipo === tipo)
        );

        salvarTransacaoNoStorage();

        if (tipo === "entrada") {
            totalReceitas -= valor;
        } else {
            totaldespesas -= valor;
        }

        atualizaResumo();
        transacaoParaApagar.remove();
        mensagemSemTransacao();
    }
});

// Inicializa carregando as transações salvas
carregarTransacoesDoStorage();
