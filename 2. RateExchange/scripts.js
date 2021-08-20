const currencyOne = document.getElementById('currency-one');
const amountOne = document.getElementById('amount-one');

const currencyTwo = document.getElementById('currency-two');
const amountTwo = document.getElementById('amount-two');

const currRate = document.getElementById('rate');

// fetch() : browser 내장 함수
// axios(): library, import 필요

function fetchRate() { // 정의
    // 전 세계의 환율  -> 어디선가 가져와야한다. // 환율 api 서비스 . 날씨 api 서비스
    // 받아온다.
    const currencyOne_value = currencyOne.value; // currentOne 의 value => select box 의 값에 따라 동적으로 변해요.
    const currencyTwo_value = currencyTwo.value; // KRW

    // 1 요청
    // Promise 객체 (by 비동기) // fetch( ~ ).then()
    fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne_value}`)
        .then(response => response.json())
        .then(data => {
                const rate = data.rates[currencyTwo_value]
                currRate.innerText = `1 ${currencyOne_value} = ${rate} ${currencyTwo_value}`
                amountTwo.value = (rate * amountOne.value).toFixed(2);
            }
        )
}

amountOne.addEventListener('input', fetchRate);
currencyOne.addEventListener('change', fetchRate);

fetchRate(); // 호출 // hoisting : 거중기,


// JSON : JavaScript Object Notation : 자바스크립트 객체 표기법
// 객체: object: 함수와 데이터의 집합을 말해요

// 환율 api 서버에서 json 데이터를 던져주었어요.
// request: https://api.exchangerate-api.com/v4/latest/usd
// response: JSON 데이터