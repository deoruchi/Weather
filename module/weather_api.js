//geocoder api2 : returns weather and palce info
const API_key = "f2f72fac7629af54e5160590ee52c0c6"
async function getTheCordinates(place) {
  const geocode = `http://api.openweathermap.org/geo/1.0/direct?q=${place},{state%20code}&limit=1&appid=${API_key}`;

  try {
    const res = await fetch(geocode);
    const data = await res.json();
    console.log(data, data[0].lat);
    if (data[0] !== undefined) {
      // const place_name = await getPlace(result.lat, result.lng);
      const weather_info = await getWeatherData(data[0].lat, data[0].lon);
      // weather data & detailed place info
      console.log(weather_info);
      return weather_info;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
//api3 : openweather api returns weather data
async function getWeatherData(lat, lon) {
  const weather_api_url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`;
  const response = await axios.get(weather_api_url);
  if (response.status !== 200) console.error("Failed to Fetch the data");
  return response;
}
export { getTheCordinates, getWeatherData };
