//calling weather API
//weatherAPI 
//TODO: CORS Issue and API key security(prevenet users know my key)
//using free plan: 1000 calls each months, current weather and 3 days forecast from current date
// app.js

document.getElementById("weatherForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents the form from refreshing the page
    
    //get input values from HTML form
    const location = document.getElementById("destination").value;
    const days = document.getElementById("days").value;

    // API URL with parameters
    const apiKey = "41821dd55b504430a98225825240411";
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=${days}`;

    // Fetch data from the API
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayForecast(data);
        })
        .catch(error => {
            document.getElementById("forecastResults").innerHTML = `<p>${error.message}</p>`;
        });
});

function displayForecast(data) {
    const forecastDiv = document.getElementById("forecastResults");
    forecastDiv.innerHTML = ""; // Clear previous results

    const locationInfo = `<h2>Weather Forecast for ${data.location.name}, ${data.location.country}</h2>`;
    forecastDiv.insertAdjacentHTML("beforeend", locationInfo);

    data.forecast.forecastday.forEach(day => {
        const dayInfo = `
            <div>
                <h3>${day.date}</h3>
                <p>Max Temperature: ${day.day.maxtemp_c}°C</p>
                <p>Min Temperature: ${day.day.mintemp_c}°C</p>
                <p>Condition: ${day.day.condition.text}</p>
                <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
            </div>
        `;
        forecastDiv.insertAdjacentHTML("beforeend", dayInfo);
    });
}

