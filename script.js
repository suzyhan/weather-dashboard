// Set variables for API key, search input form and button
const apiKey = "cf87b2e481d25b3bafe6411d8166d05a";
const apiUrl = "https://api.openweathermap.org/data/2.5";

const form = document.querySelector("#search-form");
const searchButton = document.querySelector("#search-button");

form.addEventListener("submit", citySearch);
searchButton.addEventListener("click", citySearch);

// Fetch weather data for city
function fetchWeather() {
    var myUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=cf87b2e481d25b3bafe6411d8166d05a";

    fetch(myUrl)
    .then((response) => response.json())
    .then((data) => console.log(data));
}
// Call function to fetch weather data and view response in console
fetchWeather();

// Function for city search when input form is submitted
function citySearch(event) {
    event.preventDefault();
    
    const input = document.querySelector("#search-input");
    const cityName = input.value.trim();
    
    if (cityName.length > 0) {
        getCoordinates(cityName);
        input.value = "";
    }
}

// Function to add previously search cities from local Storage to display on the search history
function loadCityHistory() {
    let cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];
    let searchHistory = document.querySelector("#search-history");
    let searchHistoryList = "";

    for (let i = 0; i < cityHistory.length; i++) {
        const city = cityHistory[i];
        // Add previously search cities as buttons
        searchHistoryList += `<button class="btn btn-secondary text-center mb-3" onclick="searchCity('${city}')">${city}</button>`;
    }
    searchHistory.innerHTML = searchHistoryList;
}
// Call function to display city search history
loadCityHistory();

// Function to get the geographical coordinates of the city from API request
function getCoordinates(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    $.ajax({
      method: "GET",
      url: url,
    }).then(function (response) {
      if (response.cod === 200) {
        const lat = response.coord.lat;
        const lon = response.coord.lon;
        getWeatherData(lat, lon, city);
      } else {
        console.log("City not found");
      }
    });
  }

// Function to get the city name
function searchCity(cityName) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  $.ajax({
    method: "GET",
    url: url,
  })
  .then(function (response) {
     // Checks co 200 OK success status response for successful request
    if (response.cod == 200) {
      // Geographical coordinates (latitude, longitude) of city searched
      const lat = response.coord.lat;
      const lon = response.coord.lon;
      getWeatherData(lat, lon, cityName);
    } else {
      console.log("City not found");
    }
  });
}

// Function that retrieves the data for weather using latitude and lonitude coordinates
function getWeatherData(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  $.ajax({
    method: "GET",
    url: url,
  }).then(function (response) {
    if (response.cod == 200) {
      updateCityWeather(response);
      loadCityHistory();
    } else {
      console.log("Data unavailable");
    }
  });
}

// Function to update and display the current weather of city searched
function updateCityWeather(data) {
    console.log(data);
    const cityName = data.city.name;
    // Get the current date
    const date = new Date();
    const iconUrl = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
    // Converts temperature to Fahrenheit
    const temp = ((data.list[0].main.temp - 273.15) * 1.80 + 32).toFixed(2);
    const humidity = data.list[0].main.humidity;
    // Converts wind speed to MPH
    const windSpeed = (data.list[0].wind.speed * 2.23694).toFixed(2);

    const todayForecast = document.querySelector("#today");

    todayForecast.innerHTML = `
        <div class="w-100 border p-3">
          <h2>${cityName} (${date.toLocaleDateString()})</h2>
          <img src = "${iconUrl}" alt = "${cityName}">
          <p>Temperature: ${temp} &#8457;</p>
          <p>Wind: ${windSpeed} MPH </p>
          <p>Humidity: ${humidity} %</p>
        </div>
      `;
}