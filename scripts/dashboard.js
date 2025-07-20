const valorEntradaRadio = document.getElementById("tipo-entrdada")
const valorSaidaRadio  = document.getElementById("tipo-saida")
const valorInserido = document.getElementById("valor")
const categoria = document.getElementById("categoria")
const tipoDaTransacao = document.getElementById("forma-transacao")
const data = document.getElementById("data")
const formulario = document.querySelector("form")

formulario.addEventListener("submit" , (evento) =>{
    evento.preventDefault()
   mostraDadosInseridos()
    
})

const mostraDadosInseridos = () => {
const valorDigitado = valorInserido.value.trim()
if(valorDigitado === ""){
   valorInserido.classList.add("valor-active")
   setTimeout(()=>{
    valorInserido.classList.remove("valor-active")
   }, 1500)
}


    
}
