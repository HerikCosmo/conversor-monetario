const input1 = document.querySelector('#valor-1')
const input2 = document.querySelector('#valor-2')
const descricao = document.querySelector('#descricao')
const moedas = document.querySelectorAll(".moedas")
const select = document.querySelector("#moeda1")
const select2 = document.querySelector("#moeda2")

function buscarMoeda(code, codein){
    fetch(`https://economia.awesomeapi.com.br/last/${code}-${codein}`)
    .then(res => {
        if(!res.ok) throw Error(res.statusText)
        return res
    })
    .then(res => res.json())
    .then(data => {
        return {cotacao: data[`${code}${codein}`].ask, desc: data[`${code}${codein}`].name}
    })
    .then(obj => mostrar(obj.cotacao, obj.desc))
    .catch(e => {
        throw Error(e)
})
}

function mostrar(cotacao, desc){
    const nomesMoeda = desc.split('/')
    descricao.innerText = `1 ${nomesMoeda[0]} igual a ${cotacao} ${nomesMoeda[1]}`
    atualizaValor(cotacao)
}

function atualizaValor(cotacao){
    input1.addEventListener("keyup", () => {
        const valor1 = parseFloat(input1.value)
        if(isNaN(valor1)) input2.value = ''
        else{
            const valor2 = parseFloat(cotacao)
            const convertido = (valor1 * valor2).toFixed(2)
            input2.value = convertido    
        }        
    })
}

function capturaValor(){
    const moeda1 = moedas[0].value
    const moeda2 = moedas[1].value
    buscarMoeda(moeda1, moeda2)
}

function listarMoedas(){
    Object.values(data).forEach(moeda => {
        select.innerHTML += (moeda.name == 'USD') ? `<option value='${moeda.code}' selected>${moeda.name}</option>` : `<option value='${moeda.code}'>${moeda.name}</option>`
    })
}
function moedasDisponiveis(){
    const valor = select.options[select.selectedIndex].value
    select2.innerHTML = ''
    data[valor].combinations.forEach(comb => {
        select2.innerHTML += `<option value='${comb.codein}'>${comb.name}</option>`
    })
}

window.addEventListener('load', () => {
    buscarMoeda('USD', 'BRL')
    listarMoedas()
    moedasDisponiveis()

    select.addEventListener("change", () => moedasDisponiveis())
    moedas.forEach(moeda => moeda.addEventListener('change', () => capturaValor()))
})