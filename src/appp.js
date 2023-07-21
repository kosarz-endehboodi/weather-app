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

cityFormEl.addEventListener("submit", searchCity);

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

  windEl.innerText = response.data.wind.speed;
  humidityEl.innerText = response.data.main.humidity;
  descriptionEl.innerText = response.data.weather[0].description;
  cityEl.innerText = response.data.name;
  temperatureEl.innerText = Math.round(response.data.main.temp);
  dateEl.innerText = FormDate(response.data.dt * 1000);
  console.log(FormDate(response.data.dt * 1000));
  let iconIdpng = response.data.weather[0].icon;
  iconEl.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconIdpng}@2x.png`
  );
}

// function api key and url
function search(city) {
  //api key and url
  let apiKey = "c5135fc130d435646a416541ffe05185";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTempCity);
}
search("new york");

function searchCity(e) {
  e.preventDefault();
  let formContorol = document.getElementById("formContorol");
  let cityvalue = formContorol.value;
  search(cityvalue);
  // console.log(cityvalue);
}
