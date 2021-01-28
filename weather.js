const API_KEY = "ec920d76414db6bac8f01c98a26b51fe";
const COORDS = 'coords';

const weather = document.querySelector(".js-weather");

function getWeather(lat, lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        ).then(function(response) {
            return response.json()
    }).then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;

        weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoord(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const coordsObj = {
        latitude,
        longitude
    };

    saveCoord(coordsObj);

    getWeather(latitude, longitude);
}

function handleGeoError() {
    
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);

    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);

        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();