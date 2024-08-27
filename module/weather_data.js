// const geocoder;
const place_text = document.getElementById("address");
async function getTheCordinates(place) {
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
      return [result.lat, result.lng];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

//get the current user location
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((pos) => {
    console.log(pos.coords.latitude, pos.coords.longitude);
    let lat = pos.coords.latitude;
    let lon = pos.coords.longitude;
  });
} else {
  console.alert("geolocation IS NOT available");
}

const API_key = "f2f72fac7629af54e5160590ee52c0c6";
async function getWeatherData(lat, lon) {
  const weather_api_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`;

  const response = await axios.get(weather_api_url);
  console.log(response);

  if (response.status !== 200) console.error("Failed to Fetch the data");
  return response;
}
export { getTheCordinates, getWeatherData };
