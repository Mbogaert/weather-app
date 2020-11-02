// WHEN I search for a city
// THEN and that city is added to the search history

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// Need to color the 5-day forcast, make it disappear when not in use...

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
var icon1El = document.querySelector("#icon1");
var icon2El = document.querySelector("#icon2");
var icon3El = document.querySelector("#icon3");
var icon4El = document.querySelector("#icon4");
var icon5El = document.querySelector("#icon5");
var temp1El = document.querySelector("#temp1");
var temp2El = document.querySelector("#temp2");
var temp3El = document.querySelector("#temp3");
var temp4El = document.querySelector("#temp4");
var temp5El = document.querySelector("#temp5");
var humid1El = document.querySelector("#humidity1");
var humid2El = document.querySelector("#humidity2");
var humid3El = document.querySelector("#humidity3");
var humid4El = document.querySelector("#humidity4");
var humid5El = document.querySelector("#humidity5");

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
    todayIcon.src = "";

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
    icon1El.src = "";
    icon2El.src = "";
    icon3El.src = "";
    icon4El.src = "";
    icon5El.src = "";
    temp1El.textContent = "";
    temp2El.textContent = "";
    temp3El.textContent = "";
    temp4El.textContent = "";
    temp5El.textContent = "";
    humid1El.textContent = "";
    humid2El.textContent = "";
    humid3El.textContent = "";
    humid4El.textContent = "";
    humid5El.textContent = "";

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

    icon1El.src = "http://openweathermap.org/img/w/" + Weather5Days.list[4].weather[0].icon + ".png";
    icon2El.src = "http://openweathermap.org/img/w/" + Weather5Days.list[12].weather[0].icon + ".png";
    icon3El.src = "http://openweathermap.org/img/w/" + Weather5Days.list[20].weather[0].icon + ".png";
    icon4El.src = "http://openweathermap.org/img/w/" + Weather5Days.list[28].weather[0].icon + ".png";
    icon5El.src = "http://openweathermap.org/img/w/" + Weather5Days.list[36].weather[0].icon + ".png";
    
    temp1El.textContent = "Temp: " + Math.floor(Weather5Days.list[4].main.temp) + "° F";
    temp2El.textContent = "Temp: " + Math.floor(Weather5Days.list[12].main.temp) + "° F";
    temp3El.textContent = "Temp: " + Math.floor(Weather5Days.list[20].main.temp) + "° F";
    temp4El.textContent = "Temp: " + Math.floor(Weather5Days.list[28].main.temp) + "° F";
    temp5El.textContent = "Temp: " + Math.floor(Weather5Days.list[36].main.temp) + "° F";

    humid1El.textContent = "Humidity: " + Weather5Days.list[4].main.humidity + "%";
    humid2El.textContent = "Humidity: " + Weather5Days.list[12].main.humidity + "%";
    humid3El.textContent = "Humidity: " + Weather5Days.list[20].main.humidity + "%";
    humid4El.textContent = "Humidity: " + Weather5Days.list[28].main.humidity + "%";
    humid5El.textContent = "Humidity: " + Weather5Days.list[36].main.humidity + "%";
}

cityFormEl.addEventListener("submit", formSubmitHandler);