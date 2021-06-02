import './sass/main.scss';
import {refs} from './js/variables'; 
import countryCard from './templates/country-card.hbs';
import countryList from './templates/country-list.hbs'; 
// import API from './js/api-service.js'
// console.log(API)

import fetchCountries from './js/fetchCountries.js'

const debounce = require('lodash.debounce');

refs.input.addEventListener('input', debounce(onInputValue,500));

function onInputValue(event){
event.preventDefault();

const form = event.target;
const searchQuery = form.value.trim();

// API.fetchCountryBuName(searchQuery) 
//     .then(renderCountryCard)
//     .catch(onFetchError);

fetchCountries(searchQuery)
    .then(renderCountry)
    .catch(onFetchError);
}

//todo отдельная функция для fetch
// function fetchCountryBuName(inputName){
//     const url = `https://restcountries.eu/rest/v2/name/${inputName}`
//     return fetch (url).then(response=>{
//         return response.json();
// });
// }

// //todo отдельная функция для отрисовки разметки карточки стран 
function renderCountryCard(data){
    const doCountryCard = countryCard(data);
    refs.countryCard.innerHTML = doCountryCard;
}

// //todo отдельная функция для отрисовки разметки списка стран
function renderCountryList(data){
    const doCountryList = countryList(data);
    refs.listCountry.innerHTML = doCountryList;
}

function onFetchError(error){
    console.log(error)
}

function renderCountry(countries){
    if(countries.length===1){
        renderCountryCard(countries);
    }
    if(countries.length >=2 && countries.length<=10){
        renderCountryList(countries)
    }
    if(countries.length>10){
        alert('Седалайте валидный запрос')
    }
}