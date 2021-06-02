import './sass/main.scss';
import {refs} from './js/variables'; 
import countryCard from './templates/country-card.hbs';
import countryList from './templates/country-list.hbs'; 
// import API from './js/api-service.js'
// console.log(API)

import fetchCountries from './js/fetchCountries.js'
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, error, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';

defaultModules.set(PNotifyMobile, {});

// alert({
//   text: 'Notice me, senpai!'
// });

const debounce = require('lodash.debounce');

refs.input.addEventListener('input', debounce(onInputValue,500));

function onInputValue(event){
event.preventDefault();


const form = event.target;
const searchQuery = form.value.trim();
if(searchQuery === ''){
    return alert({
        title: 'Хм...',
        text: 'Дружок-пирожок, так мы ничего не найдем!',
        delay: 1500
      });;
}
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
    // alert('Такой страны нет в природе')
    error({
        title: "Error:",
        text: "No country with this name!"
    });
}

function renderCountry(countries){
    if(countries.length===1){
        renderCountryCard(countries);
        refs.listCountry.innerHTML = '';
    }
    if(countries.length >=2 && countries.length<=10){
        renderCountryList(countries)
        refs.countryCard.innerHTML = '';
    }
    if(countries.length>10){
        // alert('Сделайте валидный запрос')
        error({
            title: "Ой-ой, сильно много стран!",
            text: "Введи боллее валидный запрос!",
            delay: 1500
        });
    }
}   