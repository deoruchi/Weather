import { getTheCordinates, getWeatherData } from "./weather_api.js";
import { dataFilter } from "./data_filter.js";
import {
  displayPlace,
  displayData,
  displayWeatherInfo,
  displayHourly,
  displayDaysCard,
  worldTime,
} from "./loadData.js";

import { changeBackground } from "./background.js";

const search_box = document.getElementById("search_box");
const searchIcon = document.getElementById("search_icon");
const search_button = document.getElementById("search_button");

function display(weather_info, timezone) {
  const { data } = weather_info;

  // Filter data once and reuse it
  const filtered_data = dataFilter(data);
  // Display city name
  displayPlace(data.city.name);
  // Log filtered data (for debugging, can be removed in production)
  console.log(data);

  // Display core weather data
  displayData(data);

  // Display today's weather info (first item in the list)
  const todayWeather = data.list[0];
  displayWeatherInfo(todayWeather);
  displayHourly(filtered_data[0]);

  // Display cards for upcoming days
  displayDaysCard(filtered_data);

  // Change background based on today's weather
  changeBackground(filtered_data[0]);
}

// Toggle button for search and search icon
searchIcon.addEventListener("click", () => {
  search_box.classList.add("show");
  searchIcon.classList.add("disappear");
});

search_button.addEventListener("click", async () => {
  search_box.classList.remove("show");
  searchIcon.classList.remove("disappear");
  let detailContainer = document.getElementById("weather-detail");
  detailContainer.innerHTML = "";
  let hourMiniCards = document.getElementById("hour-mini-card");
  hourMiniCards.innerHTML = "";
  let cardHolder = document.getElementById("cards-d");
  cardHolder.innerHTML = "";
  const place_name = document.getElementById("address").value;
  // console.log("place name", place_name);
  if (place_name === undefined || place_name === "") {
    alert(" Input is either empty or wrong place name inserted");
  }

  try {
    const weather_info = await getTheCordinates(place_name);
    console.log(weather_info);
    let timezone = weather_info.data.city.timezone;
    worldTime(weather_info.data.city.timezone);
    display(weather_info, timezone);
  } catch (error) {
    throw new Error(
      "An error occurred while fetching the data: " + error.message
    );
  }
});

(async function () {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      let lat = pos.coords.latitude;
      let lon = pos.coords.longitude;
      let weather_info = await getWeatherData(lat, lon);
      worldTime(weather_info.data.city.timezone);
      display(weather_info); //display all data

      // console.log("Geolocation", filtered_data, "placename", place_name);
    });
  } else {
    alert("Geolocation is not available");
    throw new Error("Geolocation is not available for this place");
  }
})();
