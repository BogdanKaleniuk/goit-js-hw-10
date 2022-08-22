import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

// input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

fetch('https://restcountries.com/v3.1/name/poland')
.then(response => {
    console.log(response.json());
    return response.json();
})
.then(name => {
    const markup = fetchCountries(poland);
    console.log(markup);
    console.log(name);
    countryInfo.innerHTML = markup;
})
.catch(error => {console.log(error);});



function renderCountryList(country) {
  const markUpCountryList = country
    .map(({ name, flags }) => {
      return `<li class="country-list__new-country">
        <img class="country-list__country-flag" src='${flags.svg}' width="150" alt='Flag of ${name.official}'>
        <h2 class="country-list__item--name">${name.official}</h2>
        </li>`;
    })
    .join('');
  countryList.insertAdjacentHTML('beforeend', markUpCountryList);
}

function renderCountryInfo([{ name, flags, capital, population, languages }]) {
  const markUpCountryInfo = `<div class="country-info__list">
            <div class="country-info__item">
              <img class="country-info__item--flag" src="${
                flags.svg
              }" width="150" alt="Flag of ${name.official}">
              <h2 class="country-info__item--name">${name.official}</h2>
            </div>
            <li class="country-info__item"><span class="country-info__item--categories">Capital: </span>${capital}</li>
            <li class="country-info__item"><span class="country-info__item--categories">Population: </span>${population}</li>
            <li class="country-info__item"><span class="country-info__item--categories">Languages: </span>${Object.values(
              languages
            ).join(', ')}</li>
        </div>`;

  countryInfo.insertAdjacentHTML('beforeend', markUpCountryInfo);
}
