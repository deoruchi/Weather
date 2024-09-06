import {
  convertUnixTime,
  convertToCel,
  createArray,
  generateDayTime,
} from "../module/helperFuncs.js";

const displayTime = document.getElementById("time");
let intervalId;
console.log(intervalId);
export function worldTime(timezone) {
  // Clear any existing interval
  if (intervalId) {
    clearInterval(intervalId);
  }

  // Calculate the offset in hours
  const timezoneOffsetHours = timezone / 3600;

  // Function to update the time
  function updateTime() {
    displayTime.innerText = moment()
      .utcOffset(timezoneOffsetHours)
      .format("HH:mm a");
  }

  // Initial call to display the time immediately
  updateTime();

  // Update the time every 2 seconds
  intervalId = setInterval(updateTime, 2000);
}

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
  const sunSetTime = convertUnixTime(
    todayData.city.sunset,
    todayData.city.timezone
  );
  sunset.innerText = sunSetTime;
  let sunrise = document.getElementById("sunrise");
  const sunRiseTime = convertUnixTime(
    todayData.city.sunrise,
    todayData.city.timezone
  );
  sunrise.innerText = sunRiseTime;
  // testConvert(todayData.city.sunset, todayData.city.timezone);
}

// Weather info
export function displayWeatherInfo(info) {
  let detailContainer = document.getElementById("weather-detail");
  const d_array = {};
  const detailArray = createArray(info, d_array);
  Object.entries(detailArray).map((items) => {
    let content;
    switch (items[0]) {
      case "Humidity":
        content = `${items[1]} %`;
        break;
      case "Wind":
        content = `${items[1]} m/s`;
        break;
      case "Visibility":
        content = `${items[1] / 1000} km `;
        break;
      case "Pressure":
        content = `${items[1]} hPa`;
        break;
    }
    detailContainer.innerHTML += `
      <div class="mini-detail mini-data-card">
        <p class="mini-title">${items[0]}</p>
        <div class="analytic-data">
          <span>${content}</span>
        </div>
      </div>
      `;
  });
}

// Tri-Hourly Weather
export function displayHourly(todayData) {
  console.log(todayData);
  let today_temp = todayData.today_temp;

  let hourMiniCards = document.getElementById("hour-mini-card");
  let container = document.getElementById("mini-card-container");

  // Get the current hour in the target timezone
  let currentHour = moment()
    .utcOffset(todayData.tz / 60)
    .format("HH");
  currentHour = parseInt(currentHour); // Convert to integer for comparison

  // Filter the temperature data to include only future times
  let filteredTemps = today_temp.filter((items) => {
    let time = parseInt(items.dt_txt.split(" ")[1].substring(0, 2));
    return time > currentHour;
  });
  console.log(filteredTemps);

  // Hide the container if no future times are found
  if (filteredTemps.length === 0) {
    container.style.display = "none";
  }
  let htmlContent = filteredTemps
    .map((timeLine) => {
      console.log(timeLine);
      container.style.display = "block";
      let time = parseInt(timeLine.dt_txt.split(" ")[1].substring(0, 2)); // Corrected substring for hour extraction

      let timeString = "";
      if (time >= 12) {
        let current = time - 12;
        timeString = current + "PM";
      } else {
        timeString = time + "AM";
      }

      let imageIcon = timeLine.weather[0].icon;
      let hTemp = convertToCel(timeLine.main.temp);

      return `
    <div class="h-card backround-style">
      <p>${timeString}</p>
      <img class="h-image image-shadow" src="https://openweathermap.org/img/wn/${imageIcon}@2x.png" />
      <p class="h-temp">${hTemp} \u00B0 C</p>
    </div>
  `;
    })
    .join("");
  hourMiniCards.innerHTML = htmlContent;
}

// 5-day weather

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
