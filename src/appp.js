//var

//element
let temperatureEl = document.getElementById("temperature");
let cityEl = document.getElementById("cityName");
let descriptionEl = document.getElementById("description");
let humidityEl = document.getElementById("humidity");
let windEl = document.getElementById("wind");
let dateEl = document.getElementById("date");
let iconEl = document.getElementById("icon");
//console.log(apiUrl);
//city form
let cityFormEl = document.getElementById("searchForm");
//fahrenhit
let celsiusTemperature = null;
let fahrenhit = document.getElementById("Fahrenhit");
let celsius = document.getElementById("celsius");

//event
cityFormEl.addEventListener("submit", searchCity);
fahrenhit.addEventListener("click", showFahrenhitTemp);
celsius.addEventListener("click", showCelsiusTemp);

function FormDate(timestamp) {
  //calculate the date
  let time = new Date(timestamp);
  let hours = time.getHours();
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let day = time.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return `${days[day]} ${hours}:${minutes}`;
}

function displayTempCity(response) {
  // console.log(response.data);
  celsiusTemperature = Math.round(response.data.main.temp);
  windEl.innerText = response.data.wind.speed;
  humidityEl.innerText = response.data.main.humidity;
  descriptionEl.innerText = response.data.weather[0].description;
  cityEl.innerText = response.data.name;
  temperatureEl.innerText = Math.round(response.data.main.temp);
  dateEl.innerText = FormDate(response.data.dt * 1000);
  // console.log(FormDate(response.data.dt * 1000));
  let iconIdpng = response.data.weather[0].icon;
  iconEl.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconIdpng}@2x.png`
  );

  getForcast(response.data.coord);
}

// function api key and url
function search(city) {
  //api key and url
  let apiKey = "c5135fc130d435646a416541ffe05185";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTempCity);
}
search("new york");
//run when submit form
function searchCity(e) {
  e.preventDefault();
  let formContorol = document.getElementById("formContorol");
  let cityvalue = formContorol.value;
  search(cityvalue);

  // console.log(cityvalue);
}

//fahrenhit
function showFahrenhitTemp(e) {
  e.preventDefault();
  //remove active celsius
  celsius.classList.remove("active");
  fahrenhit.classList.add("active");
  let fahrenhittemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureEl.innerText = Math.round(fahrenhittemp);
}

function showCelsiusTemp(e) {
  e.preventDefault();
  fahrenhit.classList.remove("active");
  celsius.classList.add("active");
  temperatureEl.innerText = celsiusTemperature;
}

//forcast
function forcast(response) {
  //console.log(response.data.daily);
  let forcast = response.data.daily;
  let forcastEl = document.getElementById("weatherForcast");
  //let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri"];
  let forcasthtml = "";

  forcast.forEach(function (forcastday, i = 1) {
    if (i < 6) {
      forcasthtml += ` 
  <div class="col-2">
    <div class="weatherForcastDate">${formatDayForcast(forcastday.dt)}</div>
    <img id="forcastImg" src="https://openweathermap.org/img/wn/${
      forcastday.weather[0].icon
    }@2x.png" alt="" />
    <div class="weatherForcastTemp">
      <span id="maxTemp">
      ${Math.round(
        forcastday.temp.max
      )}°/</span> <span id="minTemp"> ${Math.round(forcastday.temp.min)}°</span>
    </div>
  </div>
`;
    }
  });

  forcastEl.innerHTML = forcasthtml;
  // forcastEl.appendChild
}

function getForcast(coordinates) {
  console.log(coordinates);
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(forcast);
}

function formatDayForcast(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[day];
}
