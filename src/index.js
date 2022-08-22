import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

fetch('https://restcountries.com/v3.1/name/poland')
.then(response => {
    // console.log(response.json());
    return response.json();
})
.then(name => {
    console.log(name);
})
.catch(error => {console.log(error);});

function renderCountryInfo([{ name, flags, capital, population, languages }]) {

}
