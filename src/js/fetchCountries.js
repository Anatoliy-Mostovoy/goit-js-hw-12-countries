const BASE_URL = 'https://restcountries.eu/rest/v2'

export default function fetchCountries(inputName){
    return fetch (`${BASE_URL}/name/${inputName}`)
    .then(response=>{
        // return response.json();
        if (response.ok) {
            return response.json();
            } else {
                alert("Ошибка HTTP: " + response.status);
            }
});
}

