import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

// fetch('https://restcountries.com/v3.1/name/poland')
// .then(response => {
//     console.log(response.json());
//     return response.json();
// })
// .then(name => {
//     const markup = fetchCountries(poland);
//     console.log(markup);
//     console.log(name);
//     countryInfo.innerHTML = markup;
// })
// .catch(error => {console.log(error);});

function onInputSearch(e) {
  
  e.preventDefault();
  // const form = e.currentTarget()
  // console.log(form.element);
  
  const inputCountry = input.value.trim();
  if (inputCountry === '') {
    return;
  }
  else if (inputCountry === 'russ') {
        rusError();
        renderRussiaInfo();
        
      }
  // console.log(input.value.trim);

fetchCountries(inputCountry) 
  // return fetch('https://restcountries.com/v3.1/name/poland')
.then(country => {
    // console.log(response.json());
    // return response.json();
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
      if (country.length === 1) {
        renderCountryInfo(country);
         } 
      else if (country.length <= 2 && country.length <= 10) {
        renderCountryList(country);
      } 
      else if (country.length > 10) {
        tooManyMathes();
      }
      // else if (country.name.common === russia) {
      //   rusError();
      //   renderRussiaInfo();
      // }
      
      console.log(country);
})
 .catch(onFetchError);
}

function rusError(error) {
  Notiflix.Notify.failure('This is not a country, but a piece of shit');
}
function onFetchError(error) {
  Notiflix.Notify.warning('Oops, there is no country with that name');
}
function tooManyMathes() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}
// .then(name => {
//     const markup = fetchCountries(poland);
//     console.log(markup);
//     console.log(name);
//     countryInfo.innerHTML = markup;
// })
// .catch(error => {console.log(error);});
// }}



function renderCountryList(country) {
  const markUpCountryList = country
    .map(({ name, flags }) => {
      return `<li class="country-list">
        <img class="country-list__country-flag" src='${flags.svg}' width="150" alt='Flag of ${name.official}'>
        <h2 class="country-list__item--name">${name.official}</h2>
        </li>`;
    })
    .join('');
  countryList.insertAdjacentHTML('beforeend', markUpCountryList);
}

function renderCountryInfo([{ name, flags, capital, population, languages }]) {
  const markUpCountryInfo = `<div class="country-list">
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

function renderRussiaInfo() {
  const markUpCountryInfo = `<div >
            <div>
              <h2>rassion boloteshion</h2>
            </div>
            <li ><span >Capital: </span>Болото</li>
        </div>`;

  countryInfo.insertAdjacentHTML('beforeend', markUpCountryInfo);
}
