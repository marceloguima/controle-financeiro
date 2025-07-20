const cardReceitas = document.getElementById("total-entradas");
const cardSaidas = document.getElementById("total-despesas");
const cardSaldo = document.getElementById("saldo");
const categoria = document.getElementById("categoria");

const valorInserido = document.getElementById("valor");
const tipoDaTransacao = document.getElementById("forma-transacao");
const data = document.getElementById("data");
const formulario = document.querySelector("form");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    mostraDadosInseridos();
});

let totalReceitas = 0;
let totaldespesas = 0;
let saldoAtual = 0;

const mostraDadosInseridos = () => {
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
    if (valorDigitado === "") {
        valorInserido.classList.add("valor-active");
        setTimeout(() => {
            valorInserido.classList.remove("valor-active");
        }, 1500);
        return;
    }

    if (tipoTransacaoEscolhida === "entrada") {
        totalReceitas += valorDigitado;
        cardReceitas.textContent = `R$ ${totalReceitas}`;

        saldoAtual = totalReceitas;

        cardSaldo.textContent = `R$ ${saldoAtual}`;
    } else {
       
        totaldespesas += valorDigitado;
        cardSaidas.textContent = `R$ ${totaldespesas}`;
        saldoAtual -= valorDigitado;
        cardSaldo.textContent = `R$ ${saldoAtual}`;
    }
};

function trocaOpcoesSelect() {
    categoria.innerHTML = "";

    categoria.innerHTML = `
                                <option value="moradia">Moradia</option>
                                <option value="mercado">Mercado</option>
                                <option value="saude">Saúde</option>
                                <option value="educacao">Educação</option>
                                <option value="transporte">Transporte</option>
                                <option value="lazer">Lazer</option>
                                <option value="outros">Outros</option>
                           `;
}
