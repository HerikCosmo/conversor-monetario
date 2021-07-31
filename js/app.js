const input1 = document.querySelector('#teste')
const input2 = document.querySelector('#teste2')
const descricao = document.querySelector('#descricao')

const moedas = document.querySelectorAll(".moedas")

function convert(cotacao, desc){
    const moedas = desc.split('/')
    descricao.innerText = `1 ${moedas[0]} igual a ${cotacao} ${moedas[1]}`
    input1.addEventListener("keyup", () => {
        const valor1 = parseFloat(input1.value)
        if(isNaN(valor1)) input2.value = '0'
        else{
            const valor2 = parseFloat(cotacao)
            const convertido = (valor1 * valor2).toFixed(2)
            input2.value = convertido    
        }        
    })
}


function buscarMoeda(code = 'BRL', codein = 'USD'){
    if(code === codein) convert(1)
    else{
        fetch(`https://economia.awesomeapi.com.br/last/${code}-${codein}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            return {cotacao: data[`${code}${codein}`].ask, desc: data[`${code}${codein}`].name}
        })
        .then(obj => convert(obj.cotacao, obj.desc))
        .catch(e => {
            console.log(e)
            alert('Conversão não foi possível')
            buscarMoeda()
        })
    }
    
}

function inicia(){
    buscarMoeda()
    moedas.forEach(moeda => {
        moeda.addEventListener('change', () => {
            const moeda1 = moedas[0].value
            const moeda2 = moedas[1].value
            buscarMoeda(moeda1, moeda2)
        })
    })

}
inicia()


