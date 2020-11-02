// GIVEN a weather dashboard with form inputs

// attach the weather api

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

var city = "Tucson";
var apiKey = "63e409062f46109940a91678faa9c0ee";

var getCityWeather = function() {
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey).then(function(response) {
        response.json().then(function(data) {
        console.log(data);
    });
    });
};

getCityWeather();

// var cityInputEl = document.querySelector("#city-input");

// var getCityHandler = function(event) {
//     event.preventDefault();

//     var cityName = 
// }