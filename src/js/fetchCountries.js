export function fetchCountries(name) {
  // const url = 'https:restcountries.com/v3.1/name/';
  // const filter = '?fields=name,capital,population,flags,languages';
  return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

