const BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies'

var dropdowns = document.querySelectorAll(".dropdown select")
var amount = document.querySelector('.amount input');
var btn = document.querySelector('button')
var fromCurr = document.querySelector('.from select')
var toCurr = document.querySelector('.to select')
var msg = document.querySelector('.msg')

for(var select of dropdowns){
    for(var code in countryList){
        var option = document.createElement("option");
        option.innerText = code
        option.value = code
        if(select.name == 'from' && code == 'USD'){
            option.selected = 'selected'
        }else if(select.name == 'to' && code == 'INR'){
            option.selected = 'selected'
        }
        select.append(option)
    }
    select.addEventListener('change', (evt) => {
        updateFlag(evt.target)
    })
}

function updateFlag(element){
    var currCode = element.value
    var code = countryList[currCode]
    var newSrc = `https://flagsapi.com/${code}/flat/64.png`
    var img = element.parentElement.querySelector('img')
    img.src = newSrc
}

window.addEventListener('load', () => {
    updateExchangeRate()
})

btn.addEventListener('click', (evt) => {
    evt.preventDefault()
    updateExchangeRate()
})

async function updateExchangeRate(){
    var amtVal = amount.value
    if(amtVal == '' || amtVal < 0){
        amtVal = 1
        amount.value = '1'
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`
    var response = await fetch(URL)
    var data = await response.json()
    var to = toCurr.value.toLowerCase()
    var from = fromCurr.value.toLowerCase()
    
    var finalAmount = amtVal * data[from][to]
    msg.innerText = `${amtVal} ${fromCurr.value}  =  ${finalAmount.toFixed(2)} ${toCurr.value}`
}