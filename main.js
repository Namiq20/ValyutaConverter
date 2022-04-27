const input = document.querySelector('.fromValue');
const leftConverter = document.querySelector('.leftConverter');
const rightConverter = document.querySelector('.rightConverter');
const buttons = document.querySelectorAll('.btn');
const buttons2 = document.querySelectorAll('.btn2');
const toValue = document.querySelector('.toValue');
let from = 'RUB';
let to = 'USD';

// get data from fetch
const getBreweryData = async () => {
    const response = await fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`);
    const data = await response.json();
  
    return data;
}


// change valyuta message
const changeMessage=(data)=>{
    input.addEventListener('keyup', (e) => {
        input.value = e.target.value;
        if (input.value.includes(',')) {
            let point = input.value.indexOf(',');
            input.value = input.value.slice(0, point) + '.';
        }
        toValue.innerHTML = input.value * data.rates[to]
        if (toValue.innerHTML == 'NaN') {
            toValue.innerHTML = '';
        }
    })
    leftConverter.innerHTML = `1 ${from} = ` + Object.values(data.rates)[0] + ` ${to}`;
}

getBreweryData().then(res=>changeMessage(res))
fetch(`https://api.exchangerate.host/latest?base=${to}&symbols=${from}`)
    .then(res => res.json())
    .then(data => exc2.innerHTML = `1 ${to} = ` + data.rates[from] + ` ${from}`)

// function2
const myFunc=()=>{
    fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`)
                .then(res => res.json())
                .then(data => {
                    input.addEventListener('keyup', () => {
                        toValue.innerHTML = input.value * data.rates[to]
                    })
                    toValue.innerHTML = input.value * data.rates[to]
                    leftConverter.innerHTML = `1 ${from} = ` + data.rates[to] + ` ${to}`
                })
            fetch(`https://api.exchangerate.host/latest?base=${to}&symbols=${from}`)
                .then(res => res.json())
                .then(data => {
                    rightConverter.innerHTML = `1 ${to} = ` + data.rates[from] + ` ${from}`
                })
}

buttons.forEach(item=>{
    item.addEventListener('click',(e)=>{
        from = e.target.innerHTML;
        myFunc();
    })
})

buttons2.forEach(item=>{
    item.addEventListener('click',(e)=>{
        to = e.target.innerHTML;
        myFunc();
    })
})