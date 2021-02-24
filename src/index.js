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
  tempNowF.innerHTML = "19.4";
}
let fahrenheitButton = document.querySelector("#fahr");
fahrenheitButton.addEventListener("click", fahrenheit);

function celcius() {
  let tempNowC = document.querySelector("#tempToday");
  tempNowC.innerHTML = "-7";
}
let celciusButton = document.querySelector("#cel");
celciusButton.addEventListener("click", celcius);

function apiInput(city) {
  let apiKey = "8239c94054675b27ae1319054495506d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(whatTemp);
  axios.get(apiUrl).then(windData);
  axios.get(apiUrl).then(humidityData);
  axios.get(apiUrl).then(feelsLikeData);
  axios.get(apiUrl).then(emoji);
}

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
  let temperature = Math.round(response.data.main.temp);
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
}
function currentLoc(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(apiInputPT);
}
let currentLocButton = document.querySelector("#current-location");
currentLocButton.addEventListener("click", currentLoc);


