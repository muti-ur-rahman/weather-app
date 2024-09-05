document.getElementById("searchButton").addEventListener("click", function () {
    const city = document.getElementById("cityInput").value.trim();
    const apiKey = "d9033f89eddfccdbc8aaf358c2720361";
    const weatherDisplay = document.getElementById("weatherDisplay");
  
    if (city) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      )
        .then((response) => {
          if (response.status === 403) {
            throw new Error("403 Forbidden: Invalid API key or access denied.");
          } else if (response.status === 404) {
            throw new Error("Enter City name again.");
          } else if (!response.ok) {
            throw new Error(`Unexpected error: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const temp = data.main.temp;
          const weather = data.weather[0].description;
          const weatherIconCode = data.weather[0].icon;
          const windSpeed = data.wind.speed;
          const humidity = data.main.humidity;
          const visibility = data.visibility / 1000; // Convert to km
  
          // Map OpenWeather weather conditions to Material Icons
          const iconMap = {
            "01d": "wb_sunny", // Clear sky day
            "01n": "nightlight_round", // Clear sky night
            "02d": "partly_cloudy_day", // Few clouds day
            "02n": "nights_stay", // Few clouds night
            "03d": "cloud", // Scattered clouds
            "03n": "cloud", // Scattered clouds
            "04d": "cloudy", // Broken clouds
            "04n": "cloudy", // Broken clouds
            "09d": "grain", // Shower rain
            "09n": "grain", // Shower rain
            "10d": "umbrella", // Rain day
            "10n": "umbrella", // Rain night
            "11d": "thunderstorm", // Thunderstorm
            "11n": "thunderstorm", // Thunderstorm
            "13d": "ac_unit", // Snow
            "13n": "ac_unit", // Snow
            "50d": "foggy", // Mist
            "50n": "foggy" // Mist
          };
  
          const materialIcon = iconMap[weatherIconCode] || "wb_sunny"; // Fallback icon
          document.getElementById("cityName").textContent = data.name;
          document.getElementById(
            "date"
          ).textContent = new Date().toLocaleDateString();
          document.getElementById("temperature").textContent = `${temp}°C`;
          document.getElementById("weatherDescription").textContent = weather;
          document.getElementById("weatherIcon").textContent = materialIcon;
          document.getElementById("windSpeed").textContent = `${windSpeed} km/h`;
          document.getElementById("humidity").textContent = `${humidity}%`;
          document.getElementById("visibility").textContent = `${visibility} km`;
  
          // Apply the border class to the parent div
          document.querySelector(".w-info").classList.add("with-border");
  
          weatherDisplay.innerHTML = ""; // Clear previous messages
        })
        .catch((error) => {
          weatherDisplay.innerHTML =
            ` 🚫 An error occurred while fetching weather data: ${error.message}`;
          console.error(error);
        });
    } else {
      weatherDisplay.innerHTML = `Please enter a city name.`;
    }
  });
  
  // Add Enter key as a submit trigger
  document
    .getElementById("cityInput")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent default form submission if within a form element
        document.getElementById("searchButton").click(); // Trigger the click event
      }
    });
  