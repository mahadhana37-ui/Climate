// Replace with your OpenWeatherMap API key
const apiKey = "YOUR_API_KEY_HERE";

const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");
const body = document.body;

async function getWeather() {
    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            displayWeather(data);
            changeBackground(data.weather[0].main);
        } else {
            weatherInfo.innerHTML = `<p>City not found!</p>`;
        }

    } catch (error) {
        weatherInfo.innerHTML = `<p>Error fetching weather data</p>`;
    }
}

function displayWeather(data) {
    weatherInfo.innerHTML = `
        <h2>${data.name}</h2>
        <h3>${data.main.temp}°C</h3>
        <p>${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function changeBackground(weatherType) {
    switch(weatherType) {
        case "Clear":
            body.style.background = "linear-gradient(135deg, #fceabb, #f8b500)";
            break;
        case "Clouds":
            body.style.background = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
            break;
        case "Rain":
            body.style.background = "linear-gradient(135deg, #4e54c8, #8f94fb)";
            break;
        case "Thunderstorm":
            body.style.background = "linear-gradient(135deg, #232526, #414345)";
            break;
        case "Snow":
            body.style.background = "linear-gradient(135deg, #e6dada, #274046)";
            break;
        default:
            body.style.background = "linear-gradient(135deg, #4facfe, #00f2fe)";
    }
}
