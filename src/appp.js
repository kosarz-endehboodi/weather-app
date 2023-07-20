//var
//api key and url
let apiKey = "c5135fc130d435646a416541ffe05185";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=new york&appid=${apiKey}&units=metric`;

//element
let temperatureEl = document.getElementById("temperature");
let cityEl = document.getElementById("cityName");
let descriptionEl = document.getElementById("description");
let humidityEl = document.getElementById("humidity");
let windEl = document.getElementById("wind");
let dateEl = document.getElementById("date");
//console.log(apiUrl);

function FormDate(timestamp) {
  //calculate the date
  let time = new Date(timestamp);
  let hour = time.getHours();
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let day = time.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return `${days[day]} ${hour}:${minutes}`;
}

function displayTempCity(response) {
  windEl.innerText = response.data.wind.speed;
  humidityEl.innerText = response.data.main.humidity;
  descriptionEl.innerText = response.data.weather[0].description;
  cityEl.innerText = response.data.name;
  temperatureEl.innerText = Math.round(response.data.main.temp);
  dateEl.innerText = FormDate(response.data.dt * 1000);
}

axios.get(apiUrl).then(displayTempCity);
