export function displayWeatherData(weatherData) {
    const widget = document.getElementById('weather-widget');
    
    widget.innerHTML = ''; 

    if (!weatherData) {
        widget.innerHTML = `<h2>Clima en Elysium Planitia</h2><p>No se pudieron cargar los datos.</p>`;
        return;
    }

    const avgTempCelsius = Math.round(weatherData.avgTemp);

  
    const content = `
        <h2>Clima en Elysium Planitia</h2>
        <p class="sol-date">Sol ${weatherData.sol}</p>
        <p class="temperature">${avgTempCelsius}°C</p>
        <p class="description">Temperatura Promedio</p>
    `;

    widget.innerHTML = content;
}