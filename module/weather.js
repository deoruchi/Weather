var geocoder;

const add = document.getElementById("address");

let lat = 0;
let lon = 0;
//geocoding
async function getTheCoordinates(place) {
  const key = "AIzaSyD6wYGSGM2vUm2yKgv9CWB1Nx_81SZrthk";
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    place
  )}&key=${key}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log(data);
    if (data.status == "OK" && data.results !== undefined) {
      const result = data.results[0].geometry?.location;
      // lat = result.lat;
      // lon = result.lng;
      return [result.lat, result.lng];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
function codeAddress() {
  const address = add.value;
  console.log(address);
  const [lat, lon] = getTheCoordinates(address);
}
//get the current user location
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((pos) => {
    console.log(pos.coords.latitude, pos.coords.longitude);
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;

    getWeatherData(lat, lon);
  });
} else {
  console.alert("geolocation IS NOT available");
}

let date = new Date();
console.log();
//get the weather data
let weather_data_filler = {
  "dt": date.getDate(),
  "main": {},
  "weather": [],
  "clouds": {},
  "wind": {},
  "visibility": "",
  "rain": {},
};
// const API_key = "f2f72fac7629af54e5160590ee52c0c6";
// export async function getWeatherData(lat, lon) {
//   const weather_api_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`;

//   const response = await axios.get(weather_api_url);
//   console.log(response);

//   if (response.status !== 200) console.error("Failed to Fetch the data");

// }
export default { getTheCoordinates };
