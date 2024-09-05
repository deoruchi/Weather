export function changeBackground(weatherInfo) {
  const hours = new Date().getHours(); // Get the current hour
  const weatherCondition = weatherInfo.weather[0].main.toLowerCase(); // Get the main weather condition

  let timeOfDay;

  // Determine time of day
  if (hours >= 5 && hours < 12) {
    timeOfDay = "morning";
  } else if (hours >= 12 && hours < 17) {
    timeOfDay = "afternoon";
  } else if (hours >= 17 && hours < 20) {
    timeOfDay = "evening";
  } else {
    timeOfDay = "night";
  }

  // Mapping of time and weather to background images
  const backgroundMapping = {
    morning: {
      clear: "url('./images/morning-sunny.jpg')",
      rain: "url('./images/rainy-morning.jpg')",
      clouds: "url('./images/morning-cloud.jpg')",
      snow: "url('./images/morning-snow.jpg')",
    },
    afternoon: {
      clear: "url('./images/afternoon-sunny.jpg')",
      rain: "url('./images/rainy-afternoon.jpg')",
      clouds: "url('./images/morning-cloud.jpg')",
      snow: "url('./images/cold-afternoon.jpg')",
    },
    evening: {
      clear: "url('./images/clear-evening.jpg')",
      rain: "url('./images/rainy-evening.jpg')",
      clouds: "url('./images/cloud-evening.jpg')",
      snow: "url('./images/cold-evening.jpg')",
    },
    night: {
      clear: "url('./images/winter-night.jpg')",
      rain: "url('./images/night.jpg')",
      clouds: "url('./images/night.jpg')",
      snow: "url('./images/winter-night.jpg')",
    },
  };

  // Set default background in case of an unmapped condition
  let backgroundImage = "url('./images/afternoon-sunny.jpg')";

  // Get the appropriate background image
  if (
    backgroundMapping[timeOfDay] &&
    backgroundMapping[timeOfDay][weatherCondition]
  ) {
    backgroundImage = backgroundMapping[timeOfDay][weatherCondition];
  }

  // Update the background image
  document.body.style.backgroundImage = backgroundImage;
}
