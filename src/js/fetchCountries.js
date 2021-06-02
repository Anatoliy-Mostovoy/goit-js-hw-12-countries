const BASE_URL = 'https://restcountries.eu/rest/v2'

export default function fetchCountries(inputName){
    return fetch (`${BASE_URL}/name/${inputName}`).then(response=>{
        return response.json();
});
}

