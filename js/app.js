const inputs = document.querySelectorAll('.inputs')
const descricao = document.querySelector('#descricao')
const moedas = document.querySelectorAll(".moedas")
const [select, select2] = moedas

window.addEventListener('load', () => {
    buscarMoeda('USD', 'BRL')
    listarMoedas()
    moedasDisponiveis()

    select.addEventListener("change", () => moedasDisponiveis())
    moedas.forEach(moeda => moeda.addEventListener('change', () => capturaValor()))
})

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
    .catch(e => { throw Error(e) })
}

function mostrar(cotacao, desc){
    const nomesMoeda = desc.split('/')
    descricao.innerText = `1 ${nomesMoeda[0]} igual a ${cotacao} ${nomesMoeda[1]}`
    atualizaValor(cotacao, inputs[0], inputs[1])
    inputs[0].addEventListener("keyup", () => atualizaValor(cotacao, inputs[0], inputs[1]))
    inputs[1].addEventListener("keyup", () => atualizaValor(cotacao, inputs[1], inputs[0], true))
}

function atualizaValor(cotacao, i1, i2, invertido = false){
        const valor1 = parseFloat(i1.value)
        if(isNaN(valor1)) i2.value = ''
        else{
            const valor2 = parseFloat(cotacao)
            i2.value = !invertido ? (valor1 * valor2).toFixed(2) : (valor1 / valor2).toFixed(2)
        }        
}

function capturaValor(){
    const moeda1 = select.value
    const moeda2 = select2.value
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
