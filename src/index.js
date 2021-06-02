import './sass/main.scss';
import { refs } from './js/variables';
import countryCard from './templates/country-card.hbs';
import countryList from './templates/country-list.hbs';
// import API from './js/api-service.js'
// console.log(API)

import fetchCountries from './js/fetchCountries.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, error, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';

defaultModules.set(PNotifyMobile, {});

const debounce = require('lodash.debounce');

refs.input.addEventListener('input', debounce(onInputValue, 500));

function onInputValue(event) {
  event.preventDefault();

  const form = event.target;
  const searchQuery = form.value.trim();
  if (searchQuery === '') {
    return alert({
      title: 'Хм...',
      text: 'Дружок-пирожок, так мы ничего не найдем!',
      delay: 1000,
    });
  }

  fetchCountries(searchQuery)
    .then(renderCountry)
    .catch(error => console.log(error));
}

// //todo отдельная функция для отрисовки разметки карточки стран
function renderCountryCard(data) {
  const doCountryCard = countryCard(data);
  refs.countryCard.innerHTML = doCountryCard;
}

// //todo отдельная функция для отрисовки разметки списка стран
function renderCountryList(data) {
  const doCountryList = countryList(data);
  refs.listCountry.innerHTML = doCountryList;
}

function renderCountry(countries) {
  if (countries.status === 404) {
    //   return response.json();
    // } else {
    error({
      title: 'ОШИБКА!',
      text: 'ТАКОЙ СТРАНЫ НЕТ!',
      delay: 1500,
    });
  }

  if (countries.length === 1) {
    renderCountryCard(countries);
    refs.listCountry.innerHTML = '';
  }
  if (countries.length >= 2 && countries.length <= 10) {
    renderCountryList(countries);
    refs.countryCard.innerHTML = '';
  }
  if (countries.length > 10) {
    error({
      title: 'Ой-ой, сильно много стран!',
      text: 'Введи боллее валидный запрос!',
      delay: 1500,
    });
  }
}
