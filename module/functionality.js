import { getTheCordinates, getWeatherData } from "./weather_data.js";

const search_box = document.getElementById("search_box");
const body = document.getElementsByTagName("body");
const place_text = document.getElementById("address");
const searchIcon = document.getElementById("search_icon");
const search_button = document.getElementById("search_button");
const header = document.getElementById("header");

//toggle button for search and search icon
searchIcon.addEventListener("click", () => {
  search_box.classList.add("show");
  searchIcon.classList.add("disappear");
});

search_button.addEventListener("click", async () => {
  search_box.classList.remove("show");
  searchIcon.classList.remove("disappear");

  //get the data for specific locations
  const [lat, lon] = await getTheCordinates(place_text?.value);
  // console.log(lat, lon);
  const data = await getWeatherData(lat, lon);
  // console.log(data);

  // todo : shift this info into cookies or session storage
  localStorage.setItem("data", JSON.stringify(data.data));
});
