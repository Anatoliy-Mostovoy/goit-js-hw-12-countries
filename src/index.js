import './sass/main.scss';
import {refs} from './js/variables'; 
import countryCard from './templates/country-card.hbs'; 
// import API from './js/api-service.js'
// console.log(API)
import fetchCountries from './js/fetchCountries.js'
// console.log(fetchCountries)
refs.input.addEventListener('input', onInputValue);

function onInputValue(event){
event.preventDefault();

const form = event.currentTarget;
console.log(form.value)
const searchQuery = form.value;

// API.fetchCountryBuName(searchQuery) 
//     .then(renderCountryCard)
//     .catch(onFetchError);

fetchCountries(searchQuery)
    .then(renderCountryCard)
    .catch(onFetchError);
}



//todo отдельная функция для fetch
// function fetchCountryBuName(inputName){
//     const url = `https://restcountries.eu/rest/v2/name/${inputName}`
//     return fetch (url).then(response=>{
//         return response.json();
// });
// }
//todo отдельная функция для отрисовки разметки по данным 
function renderCountryCard(country){
    const doCountryCard = countryCard(country);
    refs.countryCard.innerHTML = doCountryCard;
}

function onFetchError(error){
    alert('Нет такой страны')
}