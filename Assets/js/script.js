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
var day1DateEl = document.querySelector("#date1");
var day2DateEl = document.querySelector("#date2");
var day3DateEl = document.querySelector("#date3");
var day4DateEl = document.querySelector("#date4");
var day5DateEl = document.querySelector("#date5");


var getCityWeather = function (city) {
    var apiCityUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;

    // fetch the weather api
    fetch(apiCityUrl).then(function (response) {
        response.json().then(function (data) {
            displayTodayTemp(data, city);
        });
    });
};

var getFiveDayWeather = function (city) {
    var api5DayUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;

    fetch(api5DayUrl).then(function (response5day) {
        response5day.json().then(function (data5day) {
            display5DayTemp(data5day, city);
        })
    })
}

// submit the button for the input of the city
var formSubmitHandler = function (event) {
    event.preventDefault();

    // get value from input element
    var city = cityInputEl.value.trim();

    if (city) {
        getCityWeather(city);
        getFiveDayWeather(city);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city");
    }
};

var displayTodayTemp = function (todayWeather) {

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

var display5DayTemp = function (Weather5Days) {
    // clear old content
    day1DateEl.textContent = "";
    day2DateEl.textContent = "";
    day3DateEl.textContent = "";
    day4DateEl.textContent = "";
    day5DateEl.textContent = "";

    var day1Data = Weather5Days.list[4].dt_txt;
    var formatDate1 = moment(day1Data).format("M/DD/YYYY");

    day1DateEl.textContent = formatDate1;

    var day2Data = Weather5Days.list[12].dt_txt;
    var formatDate2 = moment(day2Data).format("M/DD/YYYY");

    day2DateEl.textContent = formatDate2;

    var day3Data = Weather5Days.list[20].dt_txt;
    var formatDate3 = moment(day3Data).format("M/DD/YYYY");

    day3DateEl.textContent = formatDate3;

    var day4Data = Weather5Days.list[28].dt_txt;
    var formatDate4 = moment(day4Data).format("M/DD/YYYY");

    day4DateEl.textContent = formatDate4;

    var day5Data = Weather5Days.list[36].dt_txt;
    var formatDate5 = moment(day5Data).format("M/DD/YYYY");

    day5DateEl.textContent = formatDate5;
    

    // clear old content
    // todayCityEl.textContent = "";
    // todayTemp.textContent = "";
    // todayHumidity.textContent = "";
    // todayWind.textContent = "";
    // todayUV.textContent = "";
    // todayIcon.setAttribute = "";


    // calls the current day fuction
    // todayCityEl.innerHTML = "<h5>" + todayWeather.name + " (" + today + ")" + "</h5>";
    // todayIcon.src = "http://openweathermap.org/img/w/" + todayWeather.weather[0].icon + ".png";
    // todayTemp.textContent = "Temperature: " + Math.floor(todayWeather.main.temp) + "° F";
    // todayHumidity.textContent = "Humidity: " + todayWeather.main.humidity + "%";
    // todayWind.textContent = "Wind Speed: " + todayWeather.wind.speed + " MPH";
}

cityFormEl.addEventListener("submit", formSubmitHandler);