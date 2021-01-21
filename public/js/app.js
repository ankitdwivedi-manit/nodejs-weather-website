// const { response } = require("express");
console.log('client side javascript is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const message1 = document.querySelector('#message1');
const message2 = document.querySelector('#message2');




weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value;
    // console.log(search.value);
    message1.textContent = 'Loading....';
    message2.textContent = '';
    search.value = '';
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                message1.textContent = data.error;
                // console.log(data.error);
            }   
            else{
                // message2.textContent = data.place_name;
                message1.textContent = data.place_name;
                message2.textContent = `current weather is ${data.forecastData.temperature} degree celcius, it feels like ${data.forecastData.feelslike} degree celcius here.`;
                data.forecastData.temperature;
                console.log(data.place_name);
                console.log(data.forecastData);
            }
        })
    });
})
       