let now = new Date();

let date = now.getDate();
let year = now.getFullYear();
let hours = now.getHours();
let minutes = now.getMinutes();

let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];

let showDate = document.querySelector("#date");
if (minutes < 10) {
  showDate.innerHTML = `${day}, ${month} ${date}, ${year} at ${hours}:0${minutes}`;
} else {
  showDate.innerHTML = `${day}, ${month} ${date}, ${year} at ${hours}:${minutes}`;
}

function fahrenheit() {
  let tempNowF = document.querySelector("#tempToday");
  let fahrConvert = (celciusValue * 9) / 5 + 32;
  tempNowF.innerHTML = Math.round(fahrConvert);
}
let fahrenheitButton = document.querySelector("#fahr");
fahrenheitButton.addEventListener("click", fahrenheit);

function celcius() {
  let tempNowC = document.querySelector("#tempToday");
  tempNowC.innerHTML = Math.round(celciusValue);
}
let celciusButton = document.querySelector("#cel");
celciusButton.addEventListener("click", celcius);

function formatHours(timestamp){
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10){
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function dayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index <5; index++){
  forecast = response.data.list[index];
  forecastElement.innerHTML += `
  <div class="col-2 insideForecast">
  <p>${formatHours(forecast.dt * 1000)}</p>
  <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" class="card-img-top"><br />
  <div class="weatherForecastTemp">
  <strong>${Math.round(forecast.main.temp_max)}°C Max</strong> | ${Math.round(forecast.main.temp_min)}°C Min
  </div>
  </div>
  `;
  }
}

function apiInput(city) {
  let apiKey = "8239c94054675b27ae1319054495506d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(whatTemp);
  axios.get(apiUrl).then(windData);
  axios.get(apiUrl).then(humidityData);
  axios.get(apiUrl).then(feelsLikeData);
  axios.get(apiUrl).then(emoji);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(dayForecast);
}

let celciusValue = null;

function newCity(event) {
  event.preventDefault();
  let nowCity = document.querySelector("#city-input");
  let changedCity = document.querySelector("#currentCity");
  changedCity.innerHTML =
    nowCity.value.charAt(0).toUpperCase() + nowCity.value.slice(1);
  nowCity.value = nowCity.value.toLowerCase();
  nowCity.value =
    nowCity.value.charAt(0).toUpperCase() + nowCity.value.slice(1);
  apiInput(nowCity.value);
}
let newCityButton = document.querySelector("#searchCity");
newCityButton.addEventListener("submit", newCity);

function whatTemp(response) {
  celciusValue = response.data.main.temp;

  let temperature = Math.round(celciusValue);
  let temp = document.querySelector("#tempToday");
  temp.innerHTML = `${temperature}`;
}

function windData(response) {
  let newWind = Math.round(response.data.wind.speed);
  let win = document.querySelector("#wind");
  win.innerHTML = `${newWind}`;
}

function humidityData(response) {
  let newHumidity = Math.round(response.data.main.humidity);
  let hum = document.querySelector("#humidity");
  hum.innerHTML = `${newHumidity}`;
}

function feelsLikeData(response) {
  let feels = Math.round(response.data.main.feels_like);
  let fl = document.querySelector("#feelsLike");
  fl.innerHTML = `${feels}`;
}

function emoji(response){
  let emojiNow = response.data.weather[0].icon;
  let emoJi = document.querySelector("#icon");
  emoJi.setAttribute("src", `http://openweathermap.org/img/wn/${emojiNow}@2x.png`);
}

apiInput("Seoul");

function currentLocation(response) {
  let currentLocation = response.data.name;
  let changedCity = document.querySelector("#currentCity");
  changedCity.innerHTML = currentLocation;
}

function apiInputPT(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "8239c94054675b27ae1319054495506d";
  let apiUrlPT = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrlPT).then(whatTemp);
  axios.get(apiUrlPT).then(windData);
  axios.get(apiUrlPT).then(humidityData);
  axios.get(apiUrlPT).then(feelsLikeData);
  axios.get(apiUrlPT).then(currentLocation);
  axios.get(apiUrlPT).then(emoji);

  apiUrlPT = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlPT).then(dayForecast);
}
function currentLoc(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(apiInputPT);
}
let currentLocButton = document.querySelector("#current-location");
currentLocButton.addEventListener("click", currentLoc);


