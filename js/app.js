const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');
const update = document.querySelector('p');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

//fetch currency rates and update the dom


function calculate(){
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;


    fetch(`https://v6.exchangerate-api.com/v6/81dc5f64f35d6aa1d898e17f/latest/${currency_one}`)
    .then((res) =>res.json())
    .then((data) => {
        console.log(data);
        const rate = data.conversion_rates[currency_two];
        rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
        amountEl_two.value = (amountEl_one.value * rate).toFixed(2);

        const updateDate =  data.time_last_update_utc;
        const shortUpdate = updateDate.split(" ").slice(0, -1).join("  ")
        update.innerText = `Last update: ${shortUpdate}`;

    });
}

currencyEl_one.addEventListener('change',calculate);
currencyEl_two.addEventListener('change',calculate);
amountEl_one.addEventListener('input', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', ()=>{
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
})

