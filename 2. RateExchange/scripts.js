const currencyOne = document.getElementById('currency-one');
const amountOne = document.getElementById('amount-one');

const currencyTwo = document.getElementById('currency-two');
const amountTwo = document.getElementById('amount-two');

const currRate = document.getElementById('rate');

function fetchRate() {
    const currencyOne_value = currencyOne.value;
    const currencyTwo_value = currencyTwo.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne_value}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[currencyTwo_value];
            currRate.innerText = `1 ${currencyOne_value} = ${rate} ${currencyTwo_value}`
            amountTwo.value = (rate * amountOne.value).toFixed(2);
        });
};


currencyOne.addEventListener('change', fetchRate)
amountOne.addEventListener('input', fetchRate)
currencyTwo.addEventListener('change', fetchRate)
amountTwo.addEventListener('input', fetchRate)




fetchRate();