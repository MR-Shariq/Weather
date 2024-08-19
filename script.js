async function getWeather() {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const city = document.getElementById('city').value;
    const weatherResult = document.getElementById('weather-result');

    if (city === '') {
        weatherResult.innerHTML = 'Please enter a city name.';
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === '404') {
            weatherResult.innerHTML = 'City not found. Please try again.';
            return;
        }

        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        weatherResult.innerHTML = `
            <h2>${city}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Weather: ${weatherDescription}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
        `;
    } catch (error) {
        weatherResult.innerHTML = 'Error fetching weather data. Please try again later.';
    }
}
