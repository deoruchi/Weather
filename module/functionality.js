import { getTheCordinates, getWeatherData } from "./weather_api.js";
import { dataFilter } from "./data_filter.js";
import {
  displayPlace,
  displayData,
  displayWeatherInfo,
  displayHourly,
  displayDaysCard,
} from "./loadData.js";

import { changeBackground } from "./background.js";

const search_box = document.getElementById("search_box");
const searchIcon = document.getElementById("search_icon");
const search_button = document.getElementById("search_button");

function display(weather_info) {
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
  changeBackground(todayWeather);
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
  const place_name = document.getElementById("address");
  // let value = ;
  console.log(place_name.value);
  if (place_name.value === undefined) {
    console.error("Provided with undefined or empty value");
    return;
  }
  try {
    const weather_info = await getTheCordinates(place_name?.value);
    console.log(weather_info);
    display(weather_info);
  } catch (error) {
    console.error("An error occurred while fetching the data:", error);
  }
});

(async function () {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      let lat = pos.coords.latitude;
      let lon = pos.coords.longitude;
      let weather_info = await getWeatherData(lat, lon);
      display(weather_info); //display all data

      // console.log("Geolocation", filtered_data, "placename", place_name);
    });
  } else {
    alert("Geolocation is not available");
  }
})();
