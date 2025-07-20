const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

document.getElementById('searchBtn').addEventListener('click', function() {
  const city = document.getElementById('cityInput').value;
  getWeather(city);
});

function getWeather(city) {
  const weatherDiv = document.getElementById('weather');
  weatherDiv.innerHTML = 'Loading...';
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200) {
        weatherDiv.innerHTML = `<div class="error">City not found!</div>`;
        return;
      }
      weatherDiv.innerHTML = `
        <div class="weather-info">
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icon"/>
          <div>
            <strong>${data.name}, ${data.sys.country}</strong><br/>
            ${data.weather[0].description}<br/>
            Temp: ${data.main.temp}°C<br/>
            Humidity: ${data.main.humidity}%<br/>
            Wind: ${data.wind.speed} m/s
          </div>
        </div>
      `;
    })
    .catch(error => {
      weatherDiv.innerHTML = `<div class="error">Error fetching data!</div>`;
    });
}