// Set variables for API key, search input form and button
const apiKey = "cf87b2e481d25b3bafe6411d8166d05a";
const apiUrl = "https://api.openweathermap.org/data/2.5";

const form = document.querySelector("#search-form");
const searchButton = document.querySelector("#search-button");

// Fetch weather data for city
function fetchWeather() {
    var myUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=cf87b2e481d25b3bafe6411d8166d05a";

    fetch(myUrl)
    .then((response) => response.json())
    .then((data) => console.log(data));
}
// Call function to fetch weather data and view response in console
fetchWeather();