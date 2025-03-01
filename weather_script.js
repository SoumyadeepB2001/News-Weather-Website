document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".submit").addEventListener("click", () => {
    const input = document.querySelector(".city").value.trim();
    const unit = document.querySelector(".unit").value;

    if (!input) {
      alert("Please enter a city name!");
      return;
    }

    // Call the PHP backend instead of OpenWeather API directly
    fetch(`get_weather.php?city=${encodeURIComponent(input)}&unit=${unit}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found! Please enter a valid city.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }

        console.log("API Response:", data); // Debugging log

        document.querySelector("#city_name").innerText = `${data.name}, ${data.sys.country}`;
        document.querySelector("#desc").innerText = `Description: ${data.weather[0].description}`;
        document.querySelector("#temp").innerText = `Temperature: ${data.main.temp}°${unit === "metric" ? "C" : "F"}`;
        document.querySelector("#feels_like").innerText = `Feels Like: ${data.main.feels_like}°${unit === "metric" ? "C" : "F"}`;
        document.querySelector("#min_temp").innerText = `Min Temperature: ${data.main.temp_min}°${unit === "metric" ? "C" : "F"}`;
        document.querySelector("#max_temp").innerText = `Max Temperature: ${data.main.temp_max}°${unit === "metric" ? "C" : "F"}`;
        document.querySelector("#humidity").innerText = `Humidity: ${data.main.humidity}%`;
        document.querySelector("#pressure").innerText = `Pressure: ${data.main.pressure} hPa`;
        document.querySelector("#wind_speed").innerText = `Wind Speed: ${data.wind.speed}${unit === "metric" ? " m/s" : " mph"}`;
        document.querySelector("#wind_deg").innerText = `Wind Direction: ${data.wind.deg}°`;
        document.querySelector("#clouds").innerText = `Cloudiness: ${data.clouds.all}%`;
        document.querySelector("#visibility").innerText = `Visibility: ${data.visibility} meters`;
        document.querySelector("#longitude").innerText = `Longitude: ${data.coord.lon}`;
        document.querySelector("#latitude").innerText = `Latitude: ${data.coord.lat}`;
        document.querySelector("#icon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        document.querySelector(".weather-card").style.display = "block"; 
      })
      .catch((error) => {
        alert(error.message);
      });
  });
});
