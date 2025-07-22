const cardReceitas = document.getElementById("total-entradas");
const cardSaidas = document.getElementById("total-despesas");
const cardSaldo = document.getElementById("saldo");

const valorInserido = document.getElementById("valor");
const tipoDaTransacao = document.getElementById("forma-transacao");
const data = document.getElementById("data");
const formulario = document.querySelector("form");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    mostraResumo();
});

// ------------------------------------------------------------------
const menuDropdownBotoes = document.querySelector(".drop-menu-botoes");
const MenuSelectFilter = document.querySelector(".drop-menu-campo-filter");
const iconeAbreMenu = document.querySelector(".icone-seta");

const abreMenu = (menu) => {
    menu.classList.toggle("show");
    if (menu.classList.contains("show")) {
        iconeAbreMenu.classList.remove("fa-chevron-down");
        iconeAbreMenu.classList.add("fa-chevron-up");
    } else {
        iconeAbreMenu.classList.remove("fa-chevron-up");
        iconeAbreMenu.classList.add("fa-chevron-down");
    }
};
// --------------------------------------------------------------------
const fechaMenu = (menu) => {
    menu.classList.remove("show");
    iconeAbreMenu.classList.remove("fa-chevron-up");
    iconeAbreMenu.classList.add("fa-chevron-down");
};
// --------------------------------------------------------------------

const porCategoria = ` <label for="campo-filter">Categoria</label>
                        <select name="" id="categoria">
                            <option value="salario">Meu Salário</option>
                            <option value="freelancer">Freelancer</option>
                            <option value="renda-extra">Renda Extra</option>
                            <option value="outros">Outros</option>
                        </select>`;

const porData = ` <label>Selecione a data da transação</label><input type="date">`;

const campoFilter = document.querySelector(".campo-label");
const btnCategoria = document.getElementById("btn-categoria");

const filtra = (escolha) => {
    campoFilter.innerHTML = escolha;
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
        categoria.innerHTML = ` <option value="salario">Meu Salário</option>
                                <option value="freelancer">Freelancer</option>
                                <option value="renda-extra">Renda Extra</option>
                                <option value="outros">Outros</option>`;

        formaDeTransacao.innerHTML = ` <option value="pix">Pix</option>
                                <option value="dinheiro">Dinheiro</option>
                                <option value="outros">Outros</option>`;

        labelFormaDeTransacao.textContent = "Forma de Recebimento";
    } else {
        categoria.innerHTML = `
                                    <option value="moradia">Moradia</option>
                                    <option value="mercado">Mercado</option>
                                    <option value="saude">Saúde</option>
                                    <option value="educacao">Educação</option>
                                    <option value="transporte">Transporte</option>
                                    <option value="lazer">Lazer</option>
                                    <option value="outros">Outros</option>
                               `;

        formaDeTransacao.innerHTML = ` <option value="pix">Pix</option>
                                <option value="dinheiro">Dinheiro</option>
                                <option value="debito">Débito</option>
                                <option value="Credito">Crédito</option>
                                  <option value="boleto">Boleto</option>
                              
                                `;
        labelFormaDeTransacao.textContent = "Forma de Pagamento";
    }
}

const inputParaFiltar = document.getElementById("div-input-filter");
const filtrar = () => {
    inputParaFiltar.style.display = "flex";
};
