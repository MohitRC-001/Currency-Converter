let rates;
(async()=>{
    let response = await fetch('https://latest.currency-api.pages.dev/v1/currencies/eur.json');
    let data = await response.json();
    rates = data["eur"];
})();


let dropdowns = document.querySelectorAll("select");
let btn = document.querySelector("#btn");
let amount = document.querySelector(".amount input");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector("#msg");
let interChange = document.querySelector(".dropdown i");

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement("option")
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && newOption.innerText === "USD"){
            newOption.selected = "selected";
        }else if(select.name === "to" && newOption.innerText === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption)
    }
    select.addEventListener('change',(e) => {
        updateFlag(e.target);
    })
}

let updateFlag = (element) => {
    let countrycode = countryList[element.value];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

let updateRate = (convertedRate, rateOfOne) => {
    amount.value = convertedRate;
    msg.innerText = `1 ${fromCurr.value.toUpperCase()} = ${rateOfOne} ${toCurr.value.toUpperCase()}`;
}

let calculate = (amt) => {
    let fromCurrRate = rates[fromCurr.value.toLowerCase()];
    let toCurrRate = rates[toCurr.value.toLowerCase()];
    let euros = amt/fromCurrRate;
    let convertedRate = (euros*toCurrRate).toFixed(2);
    let rateOfOne = (convertedRate/amt).toFixed(2);
    updateRate(convertedRate, rateOfOne);
}

btn.addEventListener('click',(e) => {
    e.preventDefault();
    let amt = amount.value;
    if(amt < 1){
        amount.value = "1";
        amt = amount.value;
    }
    calculate(amt);
})

interChange.addEventListener('click',() => {
    let fvalue = fromCurr.value;
    let tvalue = toCurr.value;
    // console.log(fvalue , tvalue);
    fromCurr.value = tvalue;
    updateFlag(fromCurr);
    toCurr.value = fvalue;
    updateFlag(toCurr);
});
