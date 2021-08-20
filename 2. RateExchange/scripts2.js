const currencyOne = document.getElementById('currency-one');
const amountOne = document.getElementById('amount-one');

const currencyTwo = document.getElementById('currency-two');
const amountTwo = document.getElementById('amount-two');

const currRate = document.getElementById('rate');

// fetch() : browser 내장 함수
// axios(): library, import 필요

function fetchRate() { // 정의
    const currencyOne_value = currencyOne.value; // currentOne 의 value => select box 의 값에 따라 동적으로 변해요.
    const currencyTwo_value = currencyTwo.value; // KRW
    fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne_value}`)
        .then(response => response.json())
        .then(data => {
                const rate = data.rates[currencyTwo_value]
                currRate.innerText = `1 ${currencyOne_value} = ${rate} ${currencyTwo_value}`
                amountTwo.value = (rate * amountOne.value).toFixed(2);
            }
        )
}
// function initFetch(){ // 일반 함수 선언법 <-> 화살표 함수 선언법
const initFetch = () => { // 초기 fetch
    const currencyOne_value = "USD"; // 미리 값을 설정해주었다.
    const currencyTwo_value = currencyTwo.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne_value}`)
        .then(res => res.json())
        .then(data => {
            const dataObj = data.rates // object객체 {}, 배열X
            // dataObj.map(data => console.log(data)); // ["USD", "KRW"]
            // 객체에는 .map() , .forEach() 함수를 쓸 수 없다.

            for (let item in dataObj) {
                // console.log('item', item)
                const optionTag = document.createElement('option')
                // <option value="USD" >AED</option>
                optionTag.setAttribute("value", item)
                optionTag.append(item)
                currencyOne.append(optionTag)
            }

        })
}

amountOne.addEventListener('input', fetchRate);
currencyOne.addEventListener('change', fetchRate);
currencyTwo.addEventListener('change', fetchRate)

// fetchRate();
initFetch(); // script 파일이 처음 실행될 때, initFetch() 함수를 호출하겠다. (호출=실행)

