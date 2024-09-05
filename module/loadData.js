import {
  convertUnixTime,
  convertToCel,
  createArray,
  generateDayTime,
} from "../module/helperFuncs.js";

const displayTime = document.getElementById("time");
setInterval(() => {
  displayTime.innerText = moment().format("HH:mm a");
  // console.log(moment().format("HH"));
}, 2000);

export function displayPlace(place) {
  const displayPlace = document.getElementById("curr-place");
  displayPlace.innerText = place;
}

export function displayData(todayData) {
  let imageWeather = document.getElementById("main-w-icon");
  let imageIcon = todayData.list[0].weather[0].icon;
  imageWeather.src = `https://openweathermap.org/img/wn/${imageIcon}@2x.png`;
  let displayTemp = document.getElementById("main-temp");
  let celciusTemp = convertToCel(todayData.list[0].main.temp);
  displayTemp.innerText = `${celciusTemp}\u00B0 C`;

  let cloudStatus = document.getElementById("cloud-stat");
  cloudStatus.innerText = todayData.list[0].weather[0].description;
  let feelLike = document.getElementById("feel-like");
  feelLike.innerText = `${convertToCel(
    todayData.list[0].main.feels_like
  )}\u00B0 C`;
  let sunset = document.getElementById("sunset");
  const sunSetTime = convertUnixTime(todayData.city.sunset);
  sunset.innerText = sunSetTime;
  let sunrise = document.getElementById("sunrise");
  const sunRiseTime = convertUnixTime(todayData.city.sunrise);
  sunrise.innerText = sunRiseTime;
}

// Weather info
export function displayWeatherInfo(info) {
  let detailContainer = document.getElementById("weather-detail");
  const d_array = {};
  const detailArray = createArray(info, d_array);
  Object.entries(detailArray).map((items) => {
    detailContainer.innerHTML += `
      <div class="mini-detail mini-data-card">
        <p class="mini-title">${items[0]}</p>
        <div class="analytic-data">
          <span>${items[1]}</span>
        </div>
      </div>
      `;
  });
  detailArray;
}

// Tri-Hourly Weather
export function displayHourly(todayData) {
  let { day, today_temp } = todayData;
  let hourMiniCards = document.getElementById("hour-mini-card");
  let container = document.getElementById("mini-card-container");
  if (today_temp.length == 0) {
    //  todo: add loader
    container.style.display = "none";
  }
  let currentHour = parseInt(moment().format("HH"));
  today_temp
    .filter((items) => {
      let time = parseInt(items.dt_txt.split(" ")[1].substring(0, 3));
      return time > currentHour;
    })
    .map((timeLine) => {
      let time = parseInt(timeLine.dt_txt.split(" ")[1].substring(0, 3));
      // let currentHour = parseInt(moment().format("HH"))

      let timeString = "";
      if (time >= 12) {
        let current = time - 12;
        timeString = current + "PM";
      } else {
        timeString = time + "AM";
      }

      let imageIcon = timeLine.weather[0].icon;
      let hTemp = convertToCel(timeLine.main.temp);
      hourMiniCards.innerHTML += `
      <div class="h-card backround-style">
      <p>${timeString}</p>
        <img class="h-image image-shadow" src=https://openweathermap.org/img/wn/${imageIcon}@2x.png />
        <p class="h-temp">${hTemp} \u00B0 C</p>
     
      </div> 
    `;
    });
}

// Show days Wise data
let date = new Date();

export function displayDaysCard(data) {
  let cardHolder = document.getElementsByClassName("days-cards")[0];
  if (!data) {
    cardHolder.innerHTML += `
    <p> NO data Available </p>`;
  } else {
    data.forEach((info, key) => {
      // Use forEach instead of map to iterate over the array
      let { day, today_temp } = info;
      if (today_temp.length === 0) return;
      cardHolder.innerHTML += `
    <div class="cards fixed-width add-width">
      <div class="flex ownflex">
        <p><span id="day">${key > 0 ? generateDayTime(key) : "Today"}</span></p>
      </div>
      <div class="card-info">
        <div class="flex flex2">
          <!-- image src must be updated from the js  -->
          <img
            src="https://openweathermap.org/img/wn/${
              today_temp[0].weather[0].icon
            }@2x.png"
            alt="current weather icon"
            class="icon-image"
            id="main-w-icon"
          />
          <div>
            <p id="max-temp">${convertToCel(
              today_temp[0].main.temp_max
            )}\u00B0 C</p>
            <p id="min-temp">${convertToCel(
              today_temp[0].main.temp_min
            )}\u00B0 C</p>
          </div>
        </div>
        <span class="appear" id="weather-info-card"> ${
          today_temp[0].weather[0].description
        }</span>
      </div>
    </div>`;
    });
  }
}
