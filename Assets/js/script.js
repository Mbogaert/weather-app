// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe 

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var apiKey = "63e409062f46109940a91678faa9c0ee";
var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city-input");
var todayCityEl = document.querySelector("#city-output");
var todayTemp = document.querySelector("#temp");
var todayHumidity = document.querySelector("#humidity");
var todayWind = document.querySelector("#wind");
var todayUV = document.querySelector("#uv");
var todayIcon = document.querySelector("#icon");


var getCityWeather = function (city) {
    var apiCityUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

    // fetch the weather api
    fetch(apiCityUrl).then(function (response) {
        response.json().then(function (data) {
            displayTodayTemp(data, city);
        });
    });
};

// submit the button for the input of the city
var formSubmitHandler = function (event) {
    event.preventDefault();

    // get value from input element
    var city = cityInputEl.value.trim();

    if (city) {
        getCityWeather(city);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city");
    }
};

var displayTodayTemp = function (todayWeather) {
    console.log(todayWeather);

    // clear old content
    todayCityEl.textContent = "";
    todayTemp.textContent = "";
    todayHumidity.textContent = "";
    todayWind.textContent = "";
    todayUV.textContent = "";
    todayIcon.setAttribute = "";

    // todays date is called
    var today = moment().format("M/DD/YYYY");


    // calls the current day fuction
    todayCityEl.innerHTML = "<h5>" + todayWeather.name + " (" + today + ")" + "</h5>";
    todayIcon.src = "http://openweathermap.org/img/w/" + todayWeather.weather[0].icon + ".png";
    todayTemp.textContent = "Temperature: " + Math.floor(todayWeather.main.temp) + "° F";
    todayHumidity.textContent = "Humidity: " + todayWeather.main.humidity + "%";
    todayWind.textContent = "Wind Speed: " + todayWeather.wind.speed + " MPH";

    var lat = todayWeather.coord.lat;
    var lon = todayWeather.coord.lon;
    console.log("lat", lat);
    console.log("lon", lon);

    // uv index get - need to make the color smaller still 
    var apiUVUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

    fetch(apiUVUrl).then(function (response) {
        response.json().then(function (data) {
            todayUV.textContent = "UV Index: " + data.value;
            var uvValue = data.value;

            if (uvValue <= 3) {
                todayUV.classList.remove("moderate", "high", "very-high", "extreme");
                todayUV.classList.add("low");
            } else if (uvValue > 3 && uvValue <= 6) {
                todayUV.classList.remove("low", "high", "very-high", "extreme");
                todayUV.classList.add("moderate");
            } else if (uvValue > 8 && uvValue <= 8) {
                todayUV.classList.remove("low", "moderate", "very-high", "extreme");;
                todayUV.classList.add("high");
            } else if (uvValue > 11 && uvValue <= 11) {
                todayUV.classList.remove("low", "high", "moderate", "extreme");;
                todayUV.classList.add("very-high");
            } else {
                todayUV.classList.remove("low", "high", "very-high", "moderate");;
                todayUV.classList.add("extreme");
            }
        });
    });

};

cityFormEl.addEventListener("submit", formSubmitHandler);